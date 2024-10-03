"use client"; 

import React from 'react'; 
import { useState } from 'react';

function Cart() {

  const [isOpen, setIsOpen] = useState(false); 

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
        </div>
    </>
  )
}

export default Cart