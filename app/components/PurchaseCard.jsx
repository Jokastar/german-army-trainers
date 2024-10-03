import React from 'react'; 
import OrderCard from './OrderCard';

function PurchaseCard() {
  return (
    <div className="purchase-card flex flex-col gap-8 relative">
        <div className='absolute top-0 left-[-44px] w-7 h-7 rounded-full bg-[--green] text-white flex justify-center items-center'>
            <p>1</p>
        </div>
              <div className=' purchase-id flex justify-between border-b border-b-[lightgray]'>
                <p>Command date: 23/09/21</p>
                <p>Command ID: 1861361</p>
              </div>

              <div className='purchase-delivery-infos flex flex-col gap-8'>
                <p>Name: Kevin Lolaka</p>
                <p>Delivery Address: 4 rue madame de Stael, Saint Ouen , 93400, France</p>
              </div>

              <div className='purchase-total flex justify-between'>
                <p>TOTAL</p>
                <p>290 EUR</p>
              </div>
              <OrderCard imgUrl={"/images/shoes_perspective.png"} alt={"shoes"}/>
            </div>
  )
}

export default PurchaseCard