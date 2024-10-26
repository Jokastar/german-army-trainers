'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema } from '@/app/schemas/checkoutFormSchema';
import FormInput from '@/app/components/FormInput';
import DoubleFormInput from '@/app/components/DoubleFormInput';
import { useCart } from '@/app/context/cartContext';
import CheckoutProductCard from '@/app/components/CheckoutProductCard';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { createCheckoutSession } from '@/app/_actions/_stripe'; // Import your server action

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function Checkout() {
  const [page, setPage] = useState(1); // Page state to manage form and Stripe checkout
  const [clientSecret, setClientSecret] = useState(null); // Store the client secret for Stripe Embedded Checkout
  const { cart, getTotal } = useCart(); // Use the cart from context
  const router = useRouter();

  // Hook form setup with zod schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutFormSchema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Combine address and cart data for Stripe session creation
      const line_items = cart.map((item) => ({
        id: item.id,            // The product ID
        name: item.name,        // Product name
        quantity: item.quantity, // Product quantity
        price: item.price,      // Product price
      }));

      // Create the checkout session with form and cart data
      const { clientSecret } = await createCheckoutSession({
        line_items,
        customer: {
          email: data.email,
          first_name: data.firstname,
          last_name: data.lastname,
          phone_number: data.telephone,
        },
        address: {
          street: data.street,
          city: data.city,
          postcode: data.postcode,
          country: data.country,
        }
      });

      setClientSecret(clientSecret);
      setPage(2); // Switch to the Stripe checkout page
    } catch (error) {
      console.error("Error during Stripe checkout:", error);
    }
  };

  const fetchClientSecret = useCallback(async () => {
    return clientSecret;
  }, [clientSecret]);

  const options = { fetchClientSecret };

  return (
    <div className='grid grid-cols-2 min-h-[100vh]'>
      {page === 1 ? (
        // Page 1: Checkout Form
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='checkout-form flex flex-col px-16 pb-16 gap-8'
        >
          <div className='white-space h-[100px]'></div>

          <div className='contact flex flex-col gap-4'>
            <div className='form-title flex justify-between w-full'>
              <h2 className='uppercase'>Checkout</h2>
              <div className='text-xs cursor-pointer' onClick={() => router.back()}>
                Back
              </div>
            </div>

            <h2 className='uppercase'>Contact</h2>
            <FormInput label="email" register={register} errors={errors} />
            <DoubleFormInput labelOne="firstname" labelTwo="lastname" register={register} errors={errors} />
            <FormInput label="telephone" register={register} errors={errors} />
          </div>

          <div className='address flex flex-col gap-4'>
            <h2 className='uppercase'>Address</h2>
            <FormInput label="street" register={register} errors={errors} />
            <DoubleFormInput labelOne="city" labelTwo="postcode" register={register} errors={errors} />
            <FormInput label="country" register={register} errors={errors} />
          </div>

          <button className='h-[35px] uppercase bg-green text-white w-full text-md' type='submit'>
            Proceed to Payment
          </button>
        </form>
      ) : (
        // Page 2: Embedded Stripe Checkout
        <div className='checkout-form flex flex-col px-16 pb-16 gap-8'>
          <div className='white-space h-[100px]'></div>
          <button
            className='text-xs cursor-pointer text-blue-500'
            onClick={() => setPage(1)}
          >
            Go Back
          </button>

          {clientSecret && (
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </div>
      )}

      {/* Right section with order summary */} 
      <div className='order-resume w-full h-full bg-black flex flex-col gap-4 px-16'>
        <div className='white-space h-[100px]'></div>
        <h2 className='uppercase'>Order</h2>

        {/* Display each product using CheckoutProductCard */} 
        <div className='product-list flex flex-col gap-4'>
          {cart.map((product) => (
            <CheckoutProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Total Section */} 
        <div className='total flex justify-between mt-4'>
          <p className='uppercase'>Total</p>
          <p>{getTotal() + " EUR"}</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;



