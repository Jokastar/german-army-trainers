import React from 'react'; 
import FormInput from './FormInput'; 

function DoubleFormInput({labelOne, labelTwo}) {
  return (
    <div className='grid grid-cols-2 w-full gap-4'>
        <FormInput label={labelOne}/>
        <FormInput label={labelTwo}/>
    </div>
  )
}

export default DoubleFormInput