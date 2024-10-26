"use client"; 

import React from 'react'; 
import { useState } from 'react';
import { useCart } from '../context/cartContext';
import ProductCard from './ProductCard';
import Link from 'next/link';

function Cart() {

  const [isOpen, setIsOpen] = useState(false); 
  const {cart, clearCart, getTotal} = useCart(); 

  const openCart = () =>{
    setIsOpen(true); 
  };

  const closeCart = () =>{
    setIsOpen(false); 
  }; 


  return (
    <>
        <div onClick={openCart} className='cursor-pointer'>Cart</div>
        <div className={`cart-menu absolute w-[40vw] h-[100vh] top-0 right-0 bg-black ${!isOpen ? "hidden" : ""}`}>
            <div className='cart-header flex justify-between'>
                <p>Cart</p>
                <div onClick={closeCart} className='cursor-pointer'>X</div>
            </div>
            <div className='h-full w-full flex flex-col'>
            {cart.length > 0 ? cart.map((data)=>(          
  <ProductCard product={data} key={data.id}/>
   
)) : <div className='items-center justify-between'><p>No product</p></div>
}
{cart.length > 0 && <div onClick={clearCart} className='text-red-600 w-full cursor-pointer'>Clear cart</div>}
{cart.length > 0 && <Link href={"/pages/checkout"} className='text-white cursor-pointer'>Go checkout</Link>}
{cart.length > 0 && 
<div className='flex justify-between'>
  <p className='uppercase'>Total</p>
  <p className='uppercase'>{getTotal() + " EUR"}</p>
</div>
}

            </div>
        </div>
    </>
  )
}

export default Cart;
