import {z} from "zod"; 

const passwordRules = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(32, "Password must be at most 32 characters long")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")
  .nonempty("Password is required");

const loginFormSchema = z.object({
  email:z.string().email("Invalid email address"),
  password:z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(32, "Password must be at most 32 characters long")
});

const signUpFormSchema = z.object({
  email:z.string().email("Invalid email address"),
  password:z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(32, "Password must be at most 32 characters long"),
  verifyPassword:z
  .string()
}).refine((data) => data.password === data.verifyPassword, {
  message: "Passwords do not match",
  path: ["verifyPassword"], // Error will be associated with 'verifyPassword'
})

module.exports = {
    loginFormSchema, 
    signUpFormSchema
}