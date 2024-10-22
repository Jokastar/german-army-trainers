import Link from 'next/link'
import React from 'react'

function AdminDashboard() {
  return (
    <>
    <div className='flex justify-center gap-5 h-[100vh]'>
        <Link href={"/admin/customers"}>
        <div className=' bg-black text-white p-4'>
            <p>Customers</p>
        </div>
        </Link>
        <Link href={"/admin/products"}>
        <div className=' bg-black text-white p-4'>
            <p>Products</p>
        </div>
        </Link>
        <Link href={"/admin/purchases"}>
        <div className=' bg-black text-white p-4'>
            <p>Purchases</p>
        </div>
        </Link>
    </div>
    </>
  )
}

export default AdminDashboard