"use server"
import { createClient } from "@/utils/supabase/server";
import { purchaseFormSchema } from "@/app/schemas/purchaseSchema";

// CREATE purchase
export async function createPurchase(formData) {
  console.log("i am here 0");
  const supabase = await createClient();
  console.log("i am here"); 
  // Validate form data using Zod
  const result = purchaseFormSchema.safeParse({
    user_id: formData.user_id,
    delivery_address_id: formData.delivery_address_id,
    total: formData.total,
    products: formData.products
  });


  if (!result.success) {
    console.log("i am here 2")
    console.log(result.error.errors);
    return { data: null, error: result.error.errors, success: false };
  }

  // Insert purchase into the database
  const { data, error } = await supabase
    .from("Purchases")
    .insert({
      user_id: formData.user_id,
      delivery_address: formData.delivery_address,
      total: formData.total,
      products: formData.products
    })
    .select();

  if (error) {
    console.log("i am here 3")
    console.log("Supabase error: " + JSON.stringify(error));
    return { data: null, error: error, success: false };
  }
  console.log("i am here 4")

  return { data:JSON.stringify(data), error: null, success: true };
}

// READ purchase by ID
export async function getPurchaseById(id) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("Purchases")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log("Supabase error: " + JSON.stringify(error));
    return { data: null, error: error.code, success: false };
  }

  return { data, error: null, success: true };
}

// UPDATE purchase
export async function updatePurchase(id, formData) {
  const supabase = createClient();

  // Validate form data
  const result = purchaseFormSchema.safeParse({
    user_id: formData.user_id,
    delivery_address: formData.delivery_address,
    total: formData.total,
    products: formData.products
  });

  if (!result.success) {
    console.log(result.error.errors);
    return { data: null, error: result.error.errors, success: false };
  }

  // Update the purchase
  const { data, error } = await supabase
    .from("Purchases")
    .update({
      user_id: formData.user_id,
      delivery_address: formData.delivery_address,
      total: formData.total,
      products: formData.products
    })
    .eq("id", id);

  if (error) {
    console.log("Supabase error: " + JSON.stringify(error));
    return { data: null, error: error.code, success: false };
  }

  return { data, error: null, success: true };
}

// DELETE purchase
export async function deletePurchase(id) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("Purchases")
    .delete()
    .eq("id", id);

  if (error) {
    console.log("Supabase error: " + JSON.stringify(error));
    return { data: null, error: error.code, success: false };
  }

  return { data, error: null, success: true };
}
