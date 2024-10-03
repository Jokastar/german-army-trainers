import React from 'react'
import Link from 'next/link'; 

function SignIn() {
  return (
    <div className='flex justify-center items-center w-[100vw] h-[100vh]'>
        <div className='login-form flex flex-col w-[500px] text-lightgray text-sm gap-6'>
          
          <h2 className='uppercase text-md'>Sign In</h2>

          <div className='email-input w-full flex flex-col gap-2'>
            <label htmlFor='email'>Email</label>
            <input name='email' id='email' className='w-full border-b border-lightgray bg-transparent outline-none'></input>
          </div>

          <div className='password-input w-full flex flex-col gap-2'>
            <label htmlFor='password'>Password</label>
            <input name='password' id='password' className='w-full border-b border-lightgray bg-transparent outline-none' type='password'></input>
          </div>

          <div className='password-input w-full flex flex-col gap-2'>
            <label htmlFor='password'>Verify password</label>
            <input name='password' id='password' className='w-full border-b border-lightgray bg-transparent outline-none' type='password'></input>
          </div>

          <button className='h-[35px] uppercase bg-green text-white w-full text-md'>Sign In</button>
        </div>
    </div>
  )
}

export default SignIn