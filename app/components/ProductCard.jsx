"use client"

import Image from 'next/image'; 
import { useCart } from '../context/cartContext';
function ProductCard({product}) {
  const {removeFromCart} = useCart(); 
  return (
    <>
    <div className='flex gap-2 w-full'>
        <div className='img-ctn w-[80px] h-[80px]'>
            <Image src={product.thumbsnailUrl} width={100} height={100} alt={product.name} className='object-cover'/>
        </div>
        <div className='product-desc-ctn flex flex-col gap-4 text-white w-full'>
            <div className='flex justify-between w-full'>
                <div className='product-name-and-color'>
                    <p>{product.name}</p>
                    <p>{product.color}</p>
                </div>
                <p>{product.price + " EUR"}</p>
            </div>
            <div className='flex justify-between'>
                <p>{"Size: " + product.size}</p>
                <p>{"Quantity: " + product.quantity}</p>
            </div>
        </div>
    </div>
    <div className='text-red-600 cursor-pointer' onClick={()=>removeFromCart(product.id)}>remove</div>
    </>
  )
}

export default ProductCard; 