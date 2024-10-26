import { z } from 'zod';

export const checkoutFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstname: z.string().min(2, { message: "Firstname must be at least 2 characters" }),
  lastname: z.string().min(2, { message: "Lastname must be at least 2 characters" }),
  telephone: z.string().min(10, { message: "Telephone must be at least 10 digits" }),
  street: z.string().min(5, { message: "Street must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  postcode: z.string().min(4, { message: "Postcode must be at least 4 characters" }),
  country: z.string().min(2, { message: "Country must be at least 2 characters" }),
});