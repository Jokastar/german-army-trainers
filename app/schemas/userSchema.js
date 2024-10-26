import { z } from 'zod';

// Define the User schema using Zod
export const userFormSchema = z.object({
  id: z.bigint().nullable(), // Assuming id is optional; adjust as necessary
  created_at: z.date().nullable(), // For timestamp with time zone
  email: z.string().email(), // Email must be a valid email format
  last_name: z.string().min(1, "Last name is required"), // Ensure last name is not empty
  phone_number: z.bigint().nullable(), // Bigint for phone number, nullable if not provided
  first_name: z.string().min(1, "First name is required"), // Ensure first name is not empty
  address_id: z.bigint().optional(), // Optional bigint for address id
  purchases: z.array(z.bigint()).optional() // Optional array of bigints for purchases
});