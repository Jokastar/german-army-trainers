import { z } from 'zod';

// Zod schema for the product form validation
export const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "A price is required"),
  description: z.string().min(1, "Description is required"),
  color: z.string().min(1, "Color is required"),
  stock: z.string().min(1, "Stock must be a non-negative integer"), 
  imagesUrls: z.array(z.string()).optional(),
  thumbsnailUrl: z.array(z.string()).optional(),
});

