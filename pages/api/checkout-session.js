import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { items, email } = req.body;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const transformedItems = items.map((item) => ({
      price_data: {
        currency: 'gbp',
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.image],
        },
      },
      quantity: item.quantity,
    }));

    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        shipping_options: [{ shipping_rate: 'shr_1MUvlvBE51devKJhcthdjoAs' }],
        shipping_address_collection: {
          allowed_countries: ['GB', 'US', 'CA'],
        },
        line_items: transformedItems,
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: { email },
      });

      res.status(200).json({ url: session.url });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}
