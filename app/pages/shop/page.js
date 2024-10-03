import React from 'react'; 
import Image from 'next/image'; 
import Link from 'next/link';

function Shop() {
  return (
    <div className='grid grid-cols-3 h-[100vh]'>
      <ShoesDisplay/>
      <ShoesDisplay/>
      <ShoesDisplay/>
    </div>
  )
}

function ShoesDisplay(){
  return(
    <Link href={"/pages/shop/10"}>
        <div className='grid grid-rows-[50px_1fr_100px] border-r border-lightgray border-b-2 px-3'>
          <div className='white-space'></div>
          <div className='shoes-img-ctn'>
            <p className='font-Tiposka text-green text-[40px]'>01</p>
            <Image src="/images/shoes_perspective.png" alt="shoes-img" layout="responsive" width={100} height={100}/>
          </div>
          <div className='shoes-desc-ctn font-Tiposka text-xs text-lightgray flex items-center'>
            <div className='flex justify-between w-full'>
            <p>German army trainers</p>
            <p>290 EUR</p>
            </div>
          </div>
        </div>
    </Link>
  )
}

export default Shop; 