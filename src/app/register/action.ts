"use server"

import { createUser } from "@/db/user.server"
import { redirect } from "next/navigation"
import { RegisterFormSchema, RegisterFormState } from "./definitions"
import { createSession } from "@/auth/create-session"

export const register = async (
  _state: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> => {
  // validate form data
  const validatedFields = RegisterFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  })
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid form data",
    }
  }

  const { username, password, confirmPassword, firstName, lastName } =
    validatedFields.data
  if (password !== confirmPassword) {
    return {
      errors: {
        password: ["Passwords do not match"],
        confirmPassword: ["Passwords do not match"],
      },
      message: "Passwords do not match",
    }
  }

  try {
    await createUser(
      username as string,
      password as string,
      firstName as string,
      lastName as string
    )

    await createSession(username, password)
  } catch (error) {
    console.error("Error creating user:", error)
    return {
      message: "Unknown Error when creating user",
    }
  }

  return redirect("/")
}
