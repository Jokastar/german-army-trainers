import React from 'react'
import FormInput from '@/app/components/FormInput'
import DoubleFormInput from '@/app/components/DoubleFormInput'
import PurchaseCard from '@/app/components/PurchaseCard'
import PasswordModal from '@/app/components/PasswordModal'

function MyProfile() {
  return (
    <>
    <div className='white-space h-[100px]'></div>
    <div className='grid grid-cols-2 grid-rows-2 w-[100vw] min-h-[100vh] gap-4'>
        <h2>My Profile</h2>
        <div className='profil-form flex flex-col gap-4'>
        <div className='contact flex flex-col gap-4'>
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
            <PasswordModal/>
        </div>
        <h2>My Purchases</h2>
        <div className='purchases-data'>
            <PurchaseCard/>
        </div>
    </div>
    </>
  )
}




export default MyProfile