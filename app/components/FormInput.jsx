import React from 'react'

function FormInput({label}) {
  return (
    <div className='email-input w-full flex flex-col gap-1'>
        <label htmlFor='email'>{label}</label>
        <input name='email' id='email' className='w-full border-b border-lightgray bg-transparent outline-none'></input>
    </div>
  )
}

export default FormInput