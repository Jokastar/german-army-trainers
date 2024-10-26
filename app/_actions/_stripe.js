'use server';

import Stripe from 'stripe';

// Initialize the Stripe instance with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession({ line_items, customer, address }) {
  try {
    // Create metadata with customer and address information, and serialize product IDs
    const metadata = {
      customer_email: customer.email,
      customer_first_name: customer.first_name,
      customer_last_name: customer.last_name,
      customer_phone_number: customer.phone_number,
      street: address.street,
      city: address.city,
      postcode: address.postcode,
      country: address.country,
      products: JSON.stringify(
        line_items.reduce((acc, item) => {
          acc[item.name] = item.id.toString();
          return acc;
        }, {})
      ),
    };

    // Convert cart items into the format Stripe expects
    const lineItems = line_items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe uses cents
      },
      quantity: item.quantity,
    }));

    // Create the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: lineItems,
      mode: 'payment',
      metadata, // Add customer and address details as metadata
      return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/pages/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return { clientSecret: session.client_secret }; // Return session data to the client
  } catch (err) {
    throw new Error(`Error creating checkout session: ${err.message}`);
  }
}

export async function retrieveCheckoutSession(session_id) {
  try {
    // Retrieve the session from Stripe and expand the line_items
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items.data.price.product'],
    });

    // Extract customer details from metadata
    const customer_email = session.metadata.customer_email;
    const customer_first_name = session.metadata.customer_first_name;
    const customer_last_name = session.metadata.customer_last_name;
    const payment_date = new Date(session.created * 1000); // Convert Unix timestamp to JS date

    // Parse product IDs from metadata's serialized JSON
    const productIds = JSON.parse(session.metadata.products);

    // Map session line items to extract details and retrieve product ID from metadata
    const items = session.line_items.data.map((item) => ({
      name: item.description,
      quantity: item.quantity,
      price: item.price.unit_amount / 100,
      currency: item.price.currency,
      product_id: productIds[item.description],
    }));

    // Retrieve the address from the session metadata
    const address = {
      street: session.metadata.street,
      city: session.metadata.city,
      postcode: session.metadata.postcode,
      country: session.metadata.country,
    };

    // Convert total amount to euros
    const total_amount = session.amount_total / 100;

    console.log("Session data", JSON.stringify(items), JSON.stringify(address));

    // Return necessary details including the customer's name, email, payment date, address, and total amount
    return {
      status: session.status,
      customer_email,
      customer_first_name, // Add customer's first name
      customer_last_name,  // Add customer's last name
      items,
      payment_date,
      address,
      total_amount,
    };
  } catch (err) {
    throw new Error(err.message || 'Failed to retrieve the session.');
  }
}
