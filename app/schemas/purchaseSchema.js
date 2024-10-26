// Purchases Schema
import { z } from 'zod';

export const purchaseFormSchema = z.object({
  user_id: z.string().uuid(), // Foreign key as a UUID referencing the user
  delivery_address_id: z.number().int(), // Foreign key referencing the delivery address
  total: z.number().int().min(1, "Quantity must be at least 1")
  , 
  products: z.array(
    z.object({
      product_id: z.number().int(), // Foreign key referencing the product
      quantity: z.number().int(1, "Quantity must be at least 1"), // Validate quantity
    })
  ), // Array of product objects to store product details
});

  