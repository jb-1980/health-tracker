import { deleteSession } from "@/auth/session"
import { redirect } from "next/navigation"

export const POST = async () => {
  await deleteSession()
  redirect("/login")
}

export const GET = async () => {
  await deleteSession()
  redirect("/login")
}
