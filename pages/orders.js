import Head from 'next/head';
import { useSession } from 'next-auth/react';

import Order from '@/components/product/Order';

export default function Orders({ orders }) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <div className="p-10 bg-white">
        <h1 className="text-3xl pb-5 border-b">Your Orders</h1>
        <h2 className="my-4">
          {session
            ? `${orders.length} Order(s)`
            : 'Please sign in to see your orders'}
        </h2>
        <div className="space-y-4">
          {orders?.map(({ id, amount, amountShipping, items, timestamp }) => (
            <Order
              key={id}
              id={id}
              amount={amount}
              amountShipping={amountShipping}
              items={items}
              timestamp={timestamp}
            />
          ))}
        </div>
      </div>
    </>
  );
}

import { getServerSession } from 'next-auth';
import Stripe from 'stripe';
import moment from 'moment';

import { authOptions } from './api/auth/[...nextauth]';
import db from '@/firebase';

export async function getServerSideProps(context) {
  // Get user login credentials
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) return { props: {} };

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Get order list from firebase
  const orderList = await db
    .collection(`users/${session.user.email}/orders`)
    .orderBy('timestamp', 'desc')
    .get();

  // Combine with Stripe line items
  const orders = await Promise.all(
    orderList.docs.map(async (order) => {
      return {
        id: order.id,
        amount: order.data().amount,
        amountShipping: order.data().amount_shipping,
        timestamp: moment(order.data().timestamp.toDate()).unix(),
        items: (
          await stripe.checkout.sessions.listLineItems(order.id, {
            // Expand the product field to get product info
            expand: ['data.price.product'],
            limit: 100,
          })
        ).data,
      };
    })
  );

  // Return session to prevent auth glitch
  return { props: { orders, session } };
}
