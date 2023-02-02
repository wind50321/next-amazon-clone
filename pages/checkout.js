import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';

import {
  selectItems,
  selectTotalQuantity,
  selectTotalPrice,
} from '@/store/basketSlice';
import CheckoutProduct from '@/components/product/CheckoutProduct';
import formatCurrency from '@/utilities/formatCurrency';

export default function Checkout() {
  const { data: session } = useSession();

  const items = useSelector(selectItems);
  const hasItems = items.length > 0;
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);

  async function checkoutHandler() {
    const { data } = await axios.post('/api/checkout-session', {
      items,
      email: session.user.email,
    });

    location.assign(data.url);
  }

  return (
    <div className="flex gap-5 flex-col lg:flex-row">
      {/* Left */}
      <div className="flex-grow">
        {/* Advert */}
        <Image
          className="mx-auto"
          sizes="100vw"
          width={1020}
          height={258}
          src="/images/advert-2.png"
          alt="advert"
        />

        {/* Basket */}
        <div className="p-5 bg-white shadow-md">
          <h1 className="my-5 text-3xl">
            {hasItems ? 'Shopping Basket' : 'Shopping Basket is empty.'}
          </h1>
          {hasItems && <hr className="my-8" />}
          <div className="flex flex-col space-y-14">
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                rating={item.rating}
                hasPrime={item.hasPrime}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="px-5 py-10 bg-white shadow-md">
        {/* Subtotal */}
        <h2 className="whitespace-nowrap">
          Subtotal ({totalQuantity} items): {/* Total Price */}
          <span className="ml-1 font-bold">{formatCurrency(totalPrice)}</span>
        </h2>

        {hasItems && (
          <button
            role="link"
            disabled={!session}
            onClick={checkoutHandler}
            className="button w-full mt-2"
          >
            {session ? 'Proceed to checkout' : 'Sign in to checkout'}
          </button>
        )}
      </div>
    </div>
  );
}
