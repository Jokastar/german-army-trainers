import React from 'react'

function ProductPage() {
  return (
    <div className='grid grid-cols-2 h-[100vh] font-FavoritBookC'>
        <div className='product-img-gallery'></div>
        <div className='product-desc bg-black grid grid-rows-[1fr_3fr] px-24'>
            <div className='white-space'></div>
            <div className='product-desc grid grid-rows-[1fr_2fr_1fr_1fr] h-full text-lightgray text-xs'>
                <div className='product-title flex justify-between uppercase'>
                    <p>German army trainers snow white</p>
                    <p>290 EUR</p>
                </div>
                <div className='product-desc-txt flex justify-center flex-col'>
                    <p className='my-2'>Description</p>
                    <p>The German military trainers from the 1980s. This tribute model is crafted from fine Italian leather with white suede overlays on the upper and leather lining.
The German Military Trainer is probably the most famous military trainer silhouette. This model stays true to the original shape while offering higher quality materials and shoe construction.</p>
                </div>
                <div className='product-sizes'>
                    <p className='my-2'>Sizes</p>
                    <div className='sizes-list flex justify-between'>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                    </div>
                </div>
                <div className='checkout-btn flex items-center justify-center'>
                    <button className=' w-full h-[40px] bg-green text-white uppercase font-TestSohneMonoBuch'>checkout</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductPage; 