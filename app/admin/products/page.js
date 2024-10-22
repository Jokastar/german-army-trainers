import React from 'react'
import { createClient } from '@/utils/supabase/server';
import ProductsTable from '@/app/components/ProductsTable';

async function Products() {
  const supabase = createClient(); 
  const {data:products, error} = await supabase.from("Products").select(); 

  if(error){
    return (
        <div className='text-red-500 h-[100vh]'>{JSON.stringify(error)}</div>
    )
  }
  return (
    <div className='h-[100vh]'>
    <h1>Products</h1>
        {products?.lenght <  1 ?  <p>No Products available</p> : <ProductsTable initialProducts={products}/>}
    </div>
  )
}

export default Products; 