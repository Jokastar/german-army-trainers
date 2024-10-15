"use client"; 

import React from 'react'; 
import { useState } from 'react';
import {signup} from "../../_actions/_authentication"; 
import {signUpFormSchema} from "../../schemas/authenticationSchema"; 

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function SignUp() {
  const [error, setError] = useState(null)
  const {register, handleSubmit, formState:{errors}} = useForm({resolver: zodResolver(signUpFormSchema)}); 
  const submitForm = async (formData) =>{
     const {error, success} = await signup(formData); 
     if(error){
        setError(error); 
     }

     if(success){
      window.location.href = "/";
     }
  }

  return (
    <div className='flex justify-center items-center w-[100vw] h-[100vh]'>
        <form onSubmit={handleSubmit(submitForm)}className='login-form flex flex-col w-[500px] text-lightgray text-sm gap-6'>
          <h2 className='uppercase text-md'>Sign In</h2>

          <div className='email-input w-full flex flex-col gap-2'>
            <label htmlFor='email'>Email</label>
            <input {...register("email")} id='email' className='w-full border-b border-lightgray bg-transparent outline-none'></input>
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>

          <div className='password-input w-full flex flex-col gap-2'>
            <label htmlFor='password'>Password</label>
            <input {...register("password")} id='password' className='w-full border-b border-lightgray bg-transparent outline-none' type='password'></input>
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </div>

          <div className='password-input w-full flex flex-col gap-2'>
            <label htmlFor='verifyPassword'>Verify password</label>
            <input {...register("verifyPassword")} id='verifyPassword' className='w-full border-b border-lightgray bg-transparent outline-none' type='password'></input>
            {errors.verifyPassword && <p className='text-red-500'>{errors.verifyPassword.message}</p>}
          </div>

          <button type='submit' className='h-[35px] uppercase bg-green text-white w-full text-md'>Sign In</button>
          {error && <p className='text-red-500'>{error}</p>}
        </form>
    </div>
  )
}

export default SignUp