import React from 'react'

function Button({color, label}) {
  return (
    <button className='h-[35px] uppercase bg-green text-white w-full text-md'>{label}</button>
  )
}

export default Button; 