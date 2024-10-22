"use client";
import { useState } from "react"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema } from "@/app/schemas/productSchema"; // Ensure this includes stock validation
import FormInput from "@/app/components/FormInput";
import FileUpLoader from "@/app/components/FileUpLoader";
import { createProduct } from "@/app/_actions/_product"; // Adjust the path as necessary

function NewProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productFormSchema)
  });
  
  const [imagesUrls, setimagesUrls] = useState([]);
  const [thumbsnailUrl, setThumbsnailUrl] = useState([]); 
  const [errorMessage, setErrorMessage] = useState(null); // State for error message
  const [successMessage, setSuccessMessage] = useState(null); // State for success message

  const onSubmit = async (formData) => {
    formData.imagesUrls = imagesUrls
    formData.thumbsnailUrl = thumbsnailUrl;

    const response = await createProduct(formData);
    
    if (response.success) {
      setSuccessMessage("Product created successfully!");
      setErrorMessage(null); // Clear any previous error messages
      console.log("Form submitted with data:", formData); // Check if formData logs correctly
    } else {
      setErrorMessage(response.error || "An error occurred while creating the product.");
      setSuccessMessage(null); // Clear any previous success messages
    }

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-[600px]">
      {/* Error and Success Messages */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      {/* Name Input */}
      <FormInput label={"name"} register={register} errors={errors} />
      <FormInput label={"price"} register={register} errors={errors}/>
      <FormInput label={"description"} register={register} errors={errors}/>
      <FormInput label={"color"} register={register} errors={errors}/>

      {/* Stock Input */}
      <FormInput
        label={"stock"}
        register={register}
        errors={errors}
      />

      <label htmlFor="product-images">Product images</label>
      <FileUpLoader setFiles={setimagesUrls}/>

      <label htmlFor="frontImagesUrl">Thumbnail Image</label>
      <FileUpLoader setFiles={setThumbsnailUrl}/>

      {/* Submit Button */}
      <button type="submit" className="h-[35px] uppercase bg-green text-white">Create Product</button>
    </form>
  );
}

export default NewProduct;
