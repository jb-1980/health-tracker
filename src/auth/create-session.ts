import { getUserByUserName, UserDoc } from "@/db/user.server"
import { encrypt } from "./session"
import { cookies } from "next/headers"
import { User } from "@/definitions/user"
import { AsyncResult, Result } from "@/lib/result"
import bcrypt from "bcryptjs"

export enum CreateSessionError {
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  UNKNOWN_SESSION_ERROR = "UNKNOWN_SESSION_ERROR",
}

export async function createSession(
  username: string,
  password: string
): AsyncResult<null, string> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  try {
    const user = await getUserByUserName(username)
    if (!user) {
      return Result.Fail(CreateSessionError.INVALID_CREDENTIALS)
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordCorrect) {
      return Result.Fail(CreateSessionError.INVALID_CREDENTIALS)
    }

    const session = await encrypt(makeUserDTO(user))
    const cookieStore = await cookies()
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    })
    return Result.Success(null)
  } catch (error) {
    return Result.Fail(CreateSessionError.UNKNOWN_SESSION_ERROR, error)
  }
}

const makeUserDTO = (user: UserDoc): User => ({
  id: user._id.toString(),
  username: user.username,
  firstName: user.firstName,
  lastName: user.lastName,
})
