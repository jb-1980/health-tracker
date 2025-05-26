import "server-only"
import { ObjectId } from "mongodb"
import { MongoCollection } from "./collection.server"
import { User } from "@/definitions/user"
import bcrypt from "bcryptjs"

export type UserDoc = {
  _id: ObjectId
  username: string
  passwordHash: string
  firstName: string
  lastName: string
}

export const Users = MongoCollection<UserDoc>("users")

const makeUserDTO = (user: UserDoc): User => {
  return {
    id: user._id.toString(),
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  }
}

export const getUserByUserName = async (username: string) => {
  return await Users.findOne({ username })
}

export const createUser = async (
  username: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<User> => {
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)

  const { insertedId } = await Users.insertOne({
    username,
    passwordHash,
    firstName,
    lastName,
  })
  return makeUserDTO({
    _id: insertedId,
    username,
    passwordHash,
    firstName,
    lastName,
  })
}

export const handleLogin = async (): Promise<User | null> => {
  const username = "testuser" // Replace with actual username retrieval logic
  const password = "testpassword" // Replace with actual password retrieval logic

  const user = await getUserByUserName(username)
  if (!user) {
    return null
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
  if (!isPasswordValid) {
    return null
  }

  return makeUserDTO(user)
}
