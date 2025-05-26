"use server"
import "server-only"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { User } from "@/definitions/user"

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: User): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey)
}

export async function decrypt(
  session: string | undefined = ""
): Promise<User | undefined> {
  try {
    const { payload } = await jwtVerify<User>(session, encodedKey, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    console.log("Failed to verify session: ", error)
  }
}

export async function updateSession(user: Partial<User>) {
  const session = (await cookies()).get("session")?.value
  const payload = await decrypt(session)
  if (!session || !payload) {
    return null
  }
  const updatedSession = {
    ...payload,
    ...user,
  }
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const cookieStore = await cookies()
  const encryptedSession = await encrypt(updatedSession)
  cookieStore.set("session", encryptedSession, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  })
}

export async function refreshSession() {
  const session = (await cookies()).get("session")?.value
  const payload = await decrypt(session)

  if (!session || !payload) {
    return null
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const cookieStore = await cookies()
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}
