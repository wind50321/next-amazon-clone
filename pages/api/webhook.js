import { FieldValue } from 'firebase-admin/firestore';
import { buffer } from 'micro';
import Stripe from 'stripe';

import db from '@/firebase';

async function fullfillOrder(session) {
  try {
    await db.doc(`users/${session.metadata.email}/orders/${session.id}`).set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      timestamp: FieldValue.serverTimestamp(),
    });

    console.log('Success! Order sent to database.');
  } catch (err) {
    console.log('Failed to send order to database.', err.message);
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    // Verify the event came from Stripe
    let event;
    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      console.log('Signature verification failed.', err.message);
      return response.status(400);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      fullfillOrder(session);
      return res.status(200);
    }
  }
}

export const config = {
  api: { bodyParser: false, externalResolver: true },
};
