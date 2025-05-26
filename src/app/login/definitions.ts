import { z } from "zod"

export const LoginFormSchema = z.object({
  username: z.string().min(3, { message: "Username is required" }),
  password: z.string().min(8, { message: "Password is required" }),
})

export type LoginFormState =
  | {
      errors?: {
        username?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
