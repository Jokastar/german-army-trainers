import React from 'react';
import FormInput from './FormInput';

function DoubleFormInput({ labelOne, labelTwo, register, errors }) {
  return (
    <div className='grid grid-cols-2 w-full gap-4'>
      <FormInput label={labelOne} register={register} errors={errors} />
      <FormInput label={labelTwo} register={register} errors={errors} />
    </div>
  );
}

export default DoubleFormInput;