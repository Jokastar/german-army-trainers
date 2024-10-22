"use server";

import { createClient } from "@/utils/supabase/server";
import { addressFormSchema } from "@/app/schemas/addressSchema";

// CREATE an Address
export async function createAddress(formData) {
  const supabase = createClient();

  // Validate the form data
  const result = addressFormSchema.safeParse({
    street: formData.street,
    city: formData.city,
    postcode: formData.postcode,
    country: formData.country,
    user_id: BigInt(formData.user_id),
  });

  if (!result.success) {
    console.log(result.error.errors);
    return { data: null, error: result.error.errors, success: false };
  }

  // Insert into the Address table
  const { data, error } = await supabase.from("Address").insert([result.data]);

  if (error) {
    console.log("Supabase error: " + JSON.stringify(error));
    return { data: null, error: error.message, success: false };
  }

  return { data, error: null, success: true };
}

// READ an Address by ID
export async function getAddressById(id) {
  const supabase = createClient();

  const { data, error } = await supabase.from("Address").select("*").eq("id", id).single();

  if (error) {
    console.log("Supabase error: " + JSON.stringify(error));
    return { data: null, error: error.message, success: false };
  }

  return { data, error: null, success: true };
}

// UPDATE an Address
export async function updateAddress(id, formData) {
  const supabase = createClient();

  // Validate the form data
  const result = addressFormSchema.safeParse({
    street: formData.street,
    city: formData.city,
    postcode: formData.postcode,
    country: formData.country,
    user_id: BigInt(formData.user_id),
  });

  if (!result.success) {
    console.log(result.error.errors);
    return { data: null, error: result.error.errors, success: false };
  }

  // Update the Address
  const { data, error } = await supabase
    .from("Address")
    .update(result.data)
    .eq("id", id);

  if (error) {
    console.log("Supabase error: " + JSON.stringify(error));
    return { data: null, error: error.message, success: false };
  }

  return { data, error: null, success: true };
}

// DELETE an Address
export async function deleteAddress(id) {
  const supabase = createClient();

  const { data, error } = await supabase.from("Address").delete().eq("id", id);

  if (error) {
    console.log("Supabase error: " + JSON.stringify(error));
    return { data: null, error: error.message, success: false };
  }

  return { data, error: null, success: true };
}
