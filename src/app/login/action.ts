"use server"
import { createSession, CreateSessionError } from "@/auth/create-session"
import { LoginFormSchema, LoginFormState } from "./definitions"
import { isFailure } from "@/lib/result"
import { redirect } from "next/navigation"

export const login = async (
  state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> => {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  })
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid form data",
    }
  }
  const { username, password } = validatedFields.data
  const sessionResult = await createSession(username, password)

  if (isFailure(sessionResult)) {
    if (sessionResult.message === CreateSessionError.INVALID_CREDENTIALS) {
      return {
        message: "Invalid credentials",
      }
    }
    console.error(sessionResult.error)
    return {
      message: "Unknown error while logging in",
    }
  }

  redirect("/")
}
