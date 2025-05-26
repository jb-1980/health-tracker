import { cookies } from "next/headers"
import { cache } from "react"
import { decrypt } from "./session"

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value
  const session = await decrypt(cookie)
  if (!session?.id) {
    return { isAuth: false as const, user: null }
  }

  return { isAuth: true as const, user: session }
})
