import { createClient } from "@/utils/supabaseClient";
import { userFormSchema } from "@/app/schemas/userSchema";

// CREATE user
export async function createUser(formData) {
  const supabase = createClient();

  // Validate form data using Zod
  const result = userFormSchema.safeParse({
    email: formData.email,
    last_name: formData.last_name,
    phone_number: formData.phone_number,
    first_name: formData.first_name,
    address_id: formData.address_id,
    purchases: formData.purchases || []
  });

  if (!result.success) {
    console.log(result.error.errors);
    return { data: null, error: result.error.errors, success: false };
  }

  // Insert user into the database
  const { data, error } = await supabase
    .from("Users")
    .insert({
      email: formData.email,
      last_name: formData.last_name,
      phone_number: formData.phone_number,
      first_name: formData.first_name,
      address_id: formData.address_id,
      purchases: formData.purchases || []
    })
    .select();

  if (error) {
    console.log("Supabase error: " + JSON.stringify(error));
    return { data: null, error: error.code, success: false };
  }

  return { data, error: null, success: true };
}

// READ user by ID
export async function getUserById(id) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("Users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log("Supabase error: " + JSON.stringify(error));
    return { data: null, error: error.code, success: false };
  }

  return { data, error: null, success: true };
}

// UPDATE user
export async function updateUser(id, formData) {
  const supabase = createClient();

  // Validate form data
  const result = userFormSchema.safeParse({
    email: formData.email,
    last_name: formData.last_name,
    phone_number: formData.phone_number,
    first_name: formData.first_name,
    address_id: formData.address_id,
    purchases: formData.purchases || []
  });

  if (!result.success) {
    console.log(result.error.errors);
    return { data: null, error: result.error.errors, success: false };
  }

  // Update the user
  const { data, error } = await supabase
    .from("Users")
    .update({
      email: formData.email,
      last_name: formData.last_name,
      phone_number: formData.phone_number,
      first_name: formData.first_name,
      address_id: formData.address_id,
      purchases: formData.purchases || []
    })
    .eq("id", id);

  if (error) {
    console.log("Supabase error: " + JSON.stringify(error));
    return { data: null, error: error.code, success: false };
  }

  return { data, error: null, success: true };
}

// DELETE user
export async function deleteUser(id) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("Users")
    .delete()
    .eq("id", id);

  if (error) {
    console.log("Supabase error: " + JSON.stringify(error));
    return { data: null, error: error.code, success: false };
  }

  return { data, error: null, success: true };
}
