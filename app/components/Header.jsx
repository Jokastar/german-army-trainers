import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Cart from './Cart'; 

function Header() {
  return (
    <header className='flex justify-between text-white font-TestSohneMonoBuch uppercase text-xs fixed top-0 left-0 right-0 z-10'>
        <div className='header-left w-[150px] flex justify-between'>
            <Link href={"/pages/aboutus"}>about us</Link>
            <Link href={"/pages/shop"}>shop</Link>
        </div>
        <Link href="/">
        <Image
          src="/images/brand-logo.svg"
          alt="brand-logo"
          width={30}
          height={30}
        />
    </Link>
        <div className='header-right w-[150px] flex justify-between'>
            <Link href={"/pages/login"}>login</Link>
            <Cart/>
        </div>
    </header>
  )
}

export default Header