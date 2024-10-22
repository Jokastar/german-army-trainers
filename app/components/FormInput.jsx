import React from 'react'

function FormInput({label, register, errors}) {
  return (
  <div className='input w-full flex flex-col gap-1 bg-transparent p-0 focus:outline-none focus:ring-0'>
    <label htmlFor={label}>{label}</label>
    <input 
      name={label} 
      id={label} 
      {...register(`${label}`)}
      className='w-full border-b border-lightgray bg-transparent appearance-none text-white focus:outline-none focus:ring-0' 
    />
    {errors[label] && <p className="text-red-600">{errors[label].message}</p>}
  </div>

  )
}

export default FormInput; 