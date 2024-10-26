"use client"; 

import Link from 'next/link';
import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"; 
import {loginFormSchema} from "../../schemas/authenticationSchema";
import { login } from '@/app/_actions/_authentication';

function Login() {
  const [error, setError] = useState(null)

  const {register, handleSubmit, formState:{errors}} = useForm({resolver:zodResolver(loginFormSchema)})
  const submitForm = async (formData) => {
    const { error, success } = await login(formData);  // Server action

    if (error) {
        setError(error);  // Handle the error case
    }

    if (success) {
      window.location.href = "/";
    }
};
  return (
    <div className='flex justify-center items-center w-[100vw] h-[100vh]'>
        <form onSubmit={handleSubmit(submitForm)} className='login-form flex flex-col w-[500px] text-lightgray text-sm gap-6'>
          <h2 className='uppercase text-md'>Login</h2>
          <div className='email-input w-full flex flex-col gap-2'>
            <label htmlFor='email'>Email</label>
            <input  id='email' {...register("email")} className='w-full border-b border-lightgray bg-transparent outline-none'></input>
            {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
          </div>
          <div className='password-input w-full flex flex-col gap-2'>
            <label htmlFor='password'>Password</label>
            <input id='password' {...register("password")} className='w-full border-b border-lightgray bg-transparent outline-none' type='password'></input>
            {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
          </div>
          <p>No account ? <Link href={"/pages/signup"} className='text-[#6A70FF]'>Sign in </Link></p>
          <button type='submit' className='h-[35px] uppercase bg-green text-white w-full text-md'>Login</button>
          {error && <p className='text-red-600'>{error}</p>}
        </form>
    </div>
  )
}

export default Login;