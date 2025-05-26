import { z } from "zod"

export const RegisterFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm Password is required" }),
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
})

export type RegisterFormState =
  | {
      errors?: {
        username?: string[]
        password?: string[]
        confirmPassword?: string[]
        firstName?: string[]
        lastName?: string[]
      }
      message?: string
    }
  | undefined
