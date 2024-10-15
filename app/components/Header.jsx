"use client"; 
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Cart from './Cart'; 
import { createClient } from '@/utils/supabase/client';

function Header() {
  const supabase = createClient(); 
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  // Fetch user data when the component mounts
  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true); 
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);  // Update the user state with fetched data
      setIsLoading(false)
    };
    getUser();  // Invoke the function to fetch user info
  }, [supabase]);

  // Logout function
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.log("logout error:", error);
    } else {
      setUser(null); // Clear user state after successful logout
    }
  };

  return (
    <header className='flex justify-between text-white font-TestSohneMonoBuch uppercase text-xs fixed top-0 left-0 right-0 z-10'>
      <div className='header-left w-[150px] flex justify-between'>
        <Link href="/pages/aboutus">about us</Link>
        <Link href="/pages/shop">shop</Link>
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
        {user ? (
          <div className="cursor-pointer" onClick={logout}>
            Logout
          </div>
        ) : (
          <Link href="/pages/login">Login</Link>
        )}
        <Cart />
      </div>
    </header>
  );
}

export default Header;
