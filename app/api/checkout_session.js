// pages/api/checkout_sessions.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { cartItems, customerInfo } = req.body;

      // Format the cart items for Stripe checkout
      const lineItems = cartItems.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Stripe expects the price in cents
        },
        quantity: item.quantity,
      }));

      // Create Stripe Checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        customer_email: customerInfo.email, // Use the customer info
        mode: 'payment',
        success_url: `${req.headers.origin}/pages/payment/success`,
        cancel_url: `${req.headers.origin}/pages/payment/cancel`,
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
