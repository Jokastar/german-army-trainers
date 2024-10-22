import React from 'react'; 
import Image from 'next/image'; 
import Link from 'next/link';
import { fetchProducts } from '@/app/_actions/_product';

async function Shop() {
  const {data, error} = await fetchProducts(); 
  if(error){
    return(
      <div className='min-h-[100vh] flex items-center justify-center'>
        <p className='font-Tiposka text-lightgray text-xl'>No product available</p>
      </div>
    )
  }
  return (
    <div className='grid grid-cols-3 min-h-[100vh]'>
      {data.map(data => (<ShoesDisplay product={data} key={data.id}/>))}
    </div>
  )
}

function ShoesDisplay({product}){
  return(
    <Link href={"/pages/shop/" + product.id}>
        <div className='grid grid-rows-[50px_1fr_100px] border-r border-lightgray border-b-2 px-3'>
          <div className='white-space'></div>
          <div className='shoes-img-ctn'>
            <p className='font-Tiposka text-green text-[40px]'>{"0"+product.id}</p>
            <Image src={JSON.parse(product.thumbsnailUrl)[0]} alt={product.name} layout="responsive" width={100} height={100}/>
          </div>
          <div className='shoes-desc-ctn font-Tiposka text-xs text-lightgray flex items-center'>
            <div className='flex justify-between w-full'>
            <p>{product.name}</p>
            <p>{product.price  + " EUR"}</p>
            </div>
          </div>
          <p className='font-Tiposka text-xs '>{product.color}</p>
        </div>
    </Link>
  )
}

export default Shop; 