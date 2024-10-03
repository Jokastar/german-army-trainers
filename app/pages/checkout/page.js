import React from 'react'
import FormInput from '@/app/components/FormInput'
import DoubleFormInput from '@/app/components/DoubleFormInput'
import Button from '@/app/components/Button'
import Image from 'next/image'

function Checkout() {
  return (
    <div className='grid grid-cols-2 w-[100vw] h-[100vh]'>
        <div className='checkout-form flex flex-col px-16 pb-16 gap-8'>
            <div className='white-space h-[100px]'></div>

            <div className='contact flex flex-col gap-4'>
                <div className=' form-title flex justify-between w-full'>
                    <h2 className='uppercase'>Checkout</h2>
                    <div className='text-xs'>Back</div>
                </div>
                <h2 className='uppercase'>Contact</h2>
                <FormInput label={"Email"}/>
                <DoubleFormInput labelOne={"Firstname"} labelTwo={"Lastname"}/>
                <FormInput label={"Telephone"}/>
            </div>

            <div className='address flex flex-col gap-4'>
                <h2 className='uppercase'>Address</h2>
                <FormInput label={"Street"}/>
                <DoubleFormInput labelOne={"City"} labelTwo={"Postcode"}/>
                <FormInput label={"Country"}/>
            </div>
            <Button label={"Pay"} color={"green"}/>
        </div>
        <div className='order-resume w-full h-full bg-black flex flex-col gap-4 px-16'>
            <div className='white-space h-[100px]'></div>
            <h2 className='uppercase'>Order</h2>
            <div className='border border-lightgray w-full grid grid-cols-[1fr_3fr] p-5'>
                <div className='product-img-ctn h-[90px] w-[60px]'>
                    <Image src="/images/shoes_perspective.png" alt="product-img" width={100} height={100} className="w-full h-full object-cover"/>
                </div>
                <div className='product-desc flex flex-col justify-between'>
                    <div className='flex justify-between'>
                        <p>German Army Trainers Bubble Pink</p>
                        <p>290 EUR</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Size 41</p>
                        <p>Quantity 2</p>
                    </div>
                </div>
            </div>
            <div className='total flex justify-between'>
                <p className='uppercase'>Total</p>
                <p>290 EUR</p>
            </div>
        </div>
    </div>
  )
}

export default Checkout