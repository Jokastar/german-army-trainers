import React from 'react'; 
import Image from 'next/image';

function OrderCard({imgUrl, alt, name, price, qte, size}) {
  return (
        <div className='border border-lightgray w-full grid grid-cols-[1fr_3fr] p-5'>
                <div className='product-img-ctn h-[90px] w-[60px]'>
                    <Image src={imgUrl} alt={alt} width={100} height={100} className="w-full h-full object-cover"/>
                </div>
                <div className='product-desc flex flex-col justify-between'>
                    <div className='flex justify-between'>
                        <p>German Army Trainers Bubble Pink</p>
                        <p>290 EUR</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Size 41</p>
                        <p>Quantity 2</p>
                    </div>
                </div>
            </div>
  )
}

export default OrderCard; 