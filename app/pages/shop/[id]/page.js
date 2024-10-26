"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/app/_actions/_product";
import { useCart } from "@/app/context/cartContext";
import Image from "next/image";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [size, setSize] = useState(null)
  const {addToCart} = useCart(); 

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await getProductById(id);
      if (error) {
        setError(error);
      } else {
        setProduct(data);
      }
    };

    fetchProduct();
  }, [id]);

  const handleClick = (selectedSize) => {
    setSize(selectedSize); // Update the selected size in the state
  };

  if (error) {
    return (
      <div className="h-[100vh] font-Tiposka">
        <p>No product available</p>
      </div>
    );
  }

  // Parse imagesUrls safely if it exists
  const images = product?.imagesUrls ? JSON.parse(product.imagesUrls) : [];

  return (
    <div className="grid grid-cols-2 h-[100vh] font-FavoritBookC">
      {/* Image Gallery */}
      <div className="product-img-gallery w-full h-full overflow-y-scroll">
        <div className="flex flex-col items-center w-full">
          {images.length > 0 ? (
            images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Product Image ${index + 1}`}
              />
            ))
          ) : (
            <p className="text-white">No images available</p>
          )}
        </div>
      </div>

      {/* Product Description */}
      <div className="product-desc bg-black grid grid-rows-[1fr_3fr] px-24">
        <div className="white-space"></div>
        <div className="product-desc grid grid-rows-[1fr_2fr_1fr_1fr] h-full text-lightgray text-xs">
          <div className="product-title flex justify-between uppercase">
            <p>{product?.name}</p>
            <p>{product?.price + " EUR"}</p>
          </div>
          <div className="product-desc-txt flex justify-center flex-col">
            <p className="my-2">Description</p>
            <p>{product?.description}</p>
          </div>
          <div className="product-sizes">
            <p className="my-2">Sizes</p>
            <div className="sizes-list flex gap-6">
  {[40, 41, 42, 43, 44, 45].map((s) => (
    <div
      key={s}
      className={`w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer ${size === s ? "bg-green text-white" : "bg-white text-black"}`}
      onClick={() => handleClick(s)} // Pass the selected size
    >
      <p className="text-[10px]">{s}</p>
    </div>
  ))}
</div>
          </div>
          <div className="checkout-btn flex items-center justify-center">
            <button onClick={()=>addToCart({
                 name:product.name,
                 price:product.price, 
                 thumbsnailUrl:JSON.parse(product.thumbsnailUrl)[0], 
                 color:product.color, 
                 size:size,
                 id:product.id
                 })} className=" w-full h-[40px] bg-green text-white uppercase font-TestSohneMonoBuch" disabled={!size}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
