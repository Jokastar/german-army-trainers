"use server"
import { createClient } from "@/utils/supabase/server";
import { productFormSchema } from "@/app/schemas/productSchema";
import { extractUuidFromUrl } from "@/utils/utils";
import axios from "axios";


// Uploadcare auth schema setup for using deleteFile
const uploadcareSimpleAuthSchema = {
  publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY,
  secretKey: process.env.NEXT_PUBLIC_UPLOADCARE_SECRET_KEY
};

// Fetch all products
export const fetchProducts = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('Products').select();
  if (error) {
    console.error('Error fetching products:', error);
    return { data: null, error, success: false };
  }
  return { data, error: null, success: true };
};

// Create a new product with Zod validation
export const createProduct = async (formData) => {
   const supabase = createClient()
  // Validate formData using Zod
  const result = productFormSchema.safeParse(formData);
  if (!result.success) {
    console.log(result.error.errors);
    return { data: null, error: JSON.stringify(result.error.errors), success: false };
  }

  // Insert into Supabase if validation passes
  const { data, error } = await supabase.from('Products').insert([formData]);
  if (error) {
    console.log('Error creating product:', error);
    return { data: null, error: error.message, success: false };
  }

  return { data, error: null, success: true };
};

// Update a product with Zod validation
export const editProduct = async (id, formData) => {
    const supabase = createClient()
  // Validate formData using Zod
  const result = productFormSchema.safeParse(formData);
  if (!result.success) {
    console.log(result.error.errors);
    return { data: null, error: result.error.errors, success: false };
  }

  // Update the product in Supabase
  const { data, error } = await supabase
    .from('Products')
    .update(formData)
    .eq('id', id);
  if (error) {
    console.error('Error updating product:', error);
    return { data: null, error: error.message, success: false };
  }

  return { data, error: null, success: true };
};

const deleteFileFromUploadcare = async (uuid) => {
  const url = `https://api.uploadcare.com/files/${uuid}/`;
  
  try {
    // Make a DELETE request to Uploadcare API
    const response = await axios.delete(url, {
      headers: {
        'Authorization': `Uploadcare.Simple ${uploadcareSimpleAuthSchema.publicKey}:${uploadcareSimpleAuthSchema.secretKey}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting file ${uuid} from Uploadcare:`, error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  const supabase = await createClient();

  // Step 1: Retrieve the product to get its associated images and thumbnail
  const { data: product, error: fetchError } = await supabase
    .from('Products')
    .select('imagesUrls, thumbsnailUrl') // Fetch both imagesUrls and thumbnailUrl
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('Error fetching product:', JSON.stringify(fetchError));
    return { data: null, error: fetchError.message, success: false };
  }

  // Step 2: Delete associated images from Uploadcare
  const deleteImagePromises = [];

  // Process imagesUrls (assuming it's stored as a JSON array)
  if (product.imagesUrls) {
    const imageUrlsArray = Array.isArray(product.imagesUrls)
      ? product.imagesUrls
      : JSON.parse(product.imagesUrls);

    imageUrlsArray.forEach((imageUrl) => {
      const uuid = extractUuidFromUrl(imageUrl); // Extract UUID from each image URL
      if (uuid) {
        deleteImagePromises.push(deleteFileFromUploadcare(uuid)); // Delete using the helper function
      }
    });
  }

  // Process thumbsnailUrl
  if (product.thumbsnailUrl) {
    const thumbUuid = extractUuidFromUrl(product.thumbsnailUrl); // Extract UUID from the thumbnail URL
    if (thumbUuid) {
      deleteImagePromises.push(deleteFileFromUploadcare(thumbUuid)); // Delete using the helper function
    }
  }

  // Wait for all image and thumbnail deletions to complete
  try {
    await Promise.all(deleteImagePromises);
  } catch (error) {
    console.error('Error deleting images:', JSON.stringify(error));
    return { data: null, error: error.message, success: false };
  }

  // Step 3: Delete the product from Supabase
  const { error } = await supabase
    .from('Products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', JSON.stringify(error));
    return { data: null, error: error.message, success: false };
  }

  return { data: true, error: null, success: true };
};


export async function getProductById(id) {
  const supabase = await createClient();

  // Fetch product by ID
  const { data, error } = await supabase
    .from('Products') // The table name in Supabase
    .select('*') // Select all columns
    .eq('id', id) // Filter where id equals the provided id
    .single(); // Ensure only one record is returned

  if (error) {
    console.log("Error fetching product: " + error.message);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

