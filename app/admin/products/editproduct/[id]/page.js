"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema } from "@/app/schemas/productSchema";
import FormInput from "@/app/components/FormInput";
import FileUpLoader from "@/app/components/FileUpLoader";
import { getProductById, editProduct } from "@/app/_actions/_product"; // Import editProduct action
import { deleteFile, UploadcareSimpleAuthSchema } from "@uploadcare/rest-client";
import { useParams } from "next/navigation"; 
import { extractUuidFromUrl } from "@/utils/utils";

const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
  publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY,
  secretKey: process.env.NEXT_PUBLIC_UPLOADCARE_SECRET_KEY,
});

function EditProduct() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productFormSchema),
  });

  const [imagesUrls, setImagesUrls] = useState([]);
  const [thumbsnailUrl, setThumbsnailUrl] = useState(null);
  const { id } = useParams(); // Fetch the ID using useParams from next/navigation

  useEffect(() => {
    // Fetch product data by ID and populate the form fields
    const fetchProduct = async () => {
      const { data: product } = await getProductById(id);
      if (product) {
        // Pre-fill form inputs
        setValue("name", product.name);
        setValue("price", product.price);
        setValue("description", product.description);
        setValue("color", product.color);
        setValue("stock", product.stock); // Assuming stock is part of the form

        // Set existing image URLs
        let parsedImagesUrls;
        if (typeof product.imagesUrls === "string") {
          parsedImagesUrls = JSON.parse(product.imagesUrls); // If it's a string, parse it
        } else if (Array.isArray(product.imagesUrls) && typeof product.imagesUrls[0] === "object") {
          parsedImagesUrls = product.imagesUrls.map((img) => img.cdnUrl); // If it's an array of objects, extract the cdnUrls
        }

        setImagesUrls(parsedImagesUrls);
        setThumbsnailUrl(product.thumbsnailUrl);
      }
    };

    fetchProduct();
  }, [id, setValue]);

  const handleRemoveImage = async (imageUrl) => {
    try {
      const fileUUID = extractUuidFromUrl(imageUrl);
      const result = await deleteFile(
        { uuid: fileUUID },
        { authSchema: uploadcareSimpleAuthSchema }
      );
      console.log("uploadcare delete result " + JSON.stringify(result));

      // Remove the image from the local state
      setImagesUrls((prev) => prev.filter((url) => url !== imageUrl));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const onSubmit = async (formData) => {
    formData.imagesUrls = imagesUrls;
    formData.thumbsnailUrl = thumbsnailUrl;

    console.log("Updated form data:", formData);

    // Call the server-side action to edit the product
    const result = await editProduct(id, formData);

    if (result.success) {
      console.log("Product updated successfully");
      // Optionally redirect after a successful update, if necessary
    } else {
      console.log("Error updating product:", result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-[600px]">
      {/* Display existing images */}
      <div className="existing-images">
        <h3>Existing Images</h3>
        <div className="image-gallery flex">
          {Array.isArray(imagesUrls) && imagesUrls.length > 0 ? (
            imagesUrls.map((imageUrl, index) => (
              <div key={index} className="image-item flex flex-col gap-3 justify-center">
                <img src={imageUrl} alt={`Product Image ${index + 1}`} width="100" />
                <button type="button" onClick={() => handleRemoveImage(imageUrl)} className="w-20 bg-red-600">
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No images available</p>
          )}
        </div>
      </div>

      {/* Display existing thumbnail */}
      <div className="thumbnail-section">
        {thumbsnailUrl != null ? (
          <div className="thumbnail-image flex flex-col gap-3">
            <h3>Thumbnail Image</h3>
            <img src={thumbsnailUrl} alt="Thumbnail" width="100" />
            <button type="button" onClick={() => handleRemoveImage(thumbsnailUrl)} className="w-20 bg-red-600">
              Remove
            </button>
          </div>
        ) : (
          <p className="text-gray-500">No thumbnail image available</p>
        )}
      </div>

      {/* Form Inputs */}
      <FormInput label="name" register={register} errors={errors} />
      <FormInput label="price" register={register} errors={errors} />
      <FormInput label="description" register={register} errors={errors} />
      <FormInput label="stock" register={register} errors={errors} /> {/* Added stock input */}
      <FormInput label="color" register={register} errors={errors} />

      {/* File Uploads */}
      <label htmlFor="product-images">Update Product Images</label>
      <FileUpLoader setFiles={setImagesUrls} />

      <label htmlFor="frontImagesUrl">Update Thumbnail Image</label>
      <FileUpLoader setFiles={setThumbsnailUrl} />

      {/* Submit Button */}
      <button type="submit" className="h-[35px] uppercase bg-green text-white">
        Update Product
      </button>
    </form>
  );
}

export default EditProduct;



