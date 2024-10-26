
  'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { retrieveCheckoutSession } from '@/app/_actions/_stripe';
import { getProductById } from '@/app/_actions/_product';
import { createPurchase } from '@/app/_actions/_purchase';
import { createAddress } from '@/app/_actions/_address';
import { getUser } from '@/app/_actions/_authentication';

export default function SuccessPage() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [products, setProducts] = useState([]);
  const [paymentDate, setPaymentDate] = useState('');
  const [total, setTotal] = useState(0); // Store the total from Stripe
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchSessionAndUserDetails = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get('session_id');

      try {
        // Retrieve the checkout session details from Stripe
        const sessionData = await retrieveCheckoutSession(sessionId);
        setStatus(sessionData.status);
        setCustomerEmail(sessionData.customer_email);
        setPaymentDate(sessionData.payment_date);
        setTotal(sessionData.total_amount);
        setCustomerName(`${sessionData.customer_first_name} ${sessionData.customer_last_name}`);
        
        // Set the address information from Stripe
        setAddress(sessionData.address);

        //getUser id
        const {user, error} = await getUser(); 
        if(error){
          console.log("getUser error " + error)
        }
        // Fetch product details based on IDs
        const fetchedProducts = await Promise.all(
          sessionData.items.map(async (item) => {
            const product = await getProductById(item.product_id);
            return { 
              ...product.data, 
              quantity: item.quantity, 
              price: item.price,
              thumbsnailUrl: product.data.thumbsnailUrl 
            };
          })
        );
        setProducts(fetchedProducts);

        // Create the user's address in Supabase
        const addressFormData = {
          street: sessionData.address.street,
          city: sessionData.address.city,
          postcode: sessionData.address.postcode,
          country: sessionData.address.country,
          user_id: user?.id, // Use customer ID from Stripe metadata, if available
        };

        createAddress(addressFormData)
  .then(({ data: addressData, error: addressError }) => {
    if (addressError) {
      console.log("Error creating address:", addressError);
      return;
    }

    // Log the address data and proceed with creating the purchase
    console.log("addressData " + addressData);
    const addressId = addressData.id;
    const purchasedProduct = fetchedProducts.map(product => ({
      product_id: product.id,
      quantity: product.quantity
    })) 

    // Create purchase in Supabase with the total amount from Stripe
    if(addressId){
      return createPurchase({
      user_id: user?.id,
      delivery_address_id: addressId,
      total: sessionData.total_amount,
      products: purchasedProduct,
    });
  }
  })
  .then(({ error: purchaseError }) => {
    if (purchaseError) {
      console.log(JSON.stringify(purchaseError));
    } else {
      console.log("Purchase successfully created.");
    }
  })
  .catch(error => {
    console.error("An error occurred:", error);
  });

      } catch (error) {
        console.error('Error fetching session details:', error);
      }
    };

    fetchSessionAndUserDetails();
  }, []);

  if (status === 'open') {
    return router.push('/');
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          Thank you for your purchase! A confirmation email has been sent to {customerEmail}.
          <br />
          Payment date: {new Date(paymentDate).toLocaleString()}
        </p>

        {address && (
          <>
            <h3>Shipping Address:</h3>
            <p>{customerName}</p>
            <p>{address.street}, {address.city}, {address.postcode}, {address.country}</p>
          </>
        )}

        <h3>Purchased Products:</h3>
        <ul>
          {products.map((product, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              {product.thumbsnailUrl && (
                <img 
                  src={product.thumbsnailUrl} 
                  alt={product.name} 
                  style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} 
                />
              )}
              <span>{product.name} - {product.quantity} x {product.price} {product.currency}</span>
            </li>
          ))}
        </ul>

        <h3>Total Amount Paid: {total} EUR</h3>

        <button onClick={() => router.push('/')}>Go back to homepage</button>
      </section>
    );
  }

  return null;
}
