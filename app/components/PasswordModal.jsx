"use client"; 
import React from 'react'
import { useState } from 'react';

function PasswordModal() {
  const [isOpen, setIsOpen] = useState(false); 

  const openModal = () =>{
    setIsOpen(true)
  }

  const closeModal = () =>{
    setIsOpen(false)
  }
  return (
    <>
    <div onClick={openModal}>Modify password</div>
            <div className={`fixed top-0 right-0 w-screen h-screen bg-white/10 backdrop-blur-md z-50 flex justify-center items-center ${isOpen ? "block" : "hidden"}`}>
              <div className='w-[500px] bg-black flex flex-col gap-6'>
              <div className={`change-password-modal flex flex-col w-[500px] text-lightgray text-sm gap-6 p-8 ${isOpen ? "block" : "hidden"}`}>
                <div className='modal-header flex justify-between'>
                  <h2 className='uppercase text-md'>Modify Password</h2>
                  <div onClick={closeModal}>X</div>
                </div>
              <div className='old-password w-full flex flex-col gap-2'>
                <label htmlFor='old-password'>Old password</label>
                <input type="password" name='old-password' id='old-password' className='w-full border-b border-lightgray bg-transparent outline-none'></input>
              </div>

          <div className='new-password w-full flex flex-col gap-2'>
            <label htmlFor='password'>New Password</label>
            <input  type="password" name='new-password' id='new-password' className='w-full border-b border-lightgray bg-transparent outline-none'></input>
          </div>

          <div className='validate-password w-full flex flex-col gap-2'>
            <label htmlFor='validate-password'>Verify new password</label>
            <input type="password" name='validate-password' id='validate-password' className='w-full border-b border-lightgray bg-transparent outline-none'></input>
          </div>

          <button className='h-[35px] uppercase bg-green text-white w-full text-md'>Change password</button>
        </div>

        </div>
    </div>
    </>
  )
}
export default PasswordModal; 