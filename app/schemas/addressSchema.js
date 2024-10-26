import { z } from "zod";

// Address Schema
export const addressFormSchema = z.object({
  street: z.string().min(1, "Street is required"), // Required field with validation
  city: z.string().min(1, "City is required"), // Required field with validation
  postcode: z.string().min(1, "Postcode is required"), // Required field with validation
  country: z.string().min(1, "Country is required"), // Required field with validation
  user_id: z.string().uuid(), // Foreign key as a UUID referencing the user
});