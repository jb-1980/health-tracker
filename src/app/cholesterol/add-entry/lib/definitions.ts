import { ObjectId } from "mongodb"
import z from "zod"

export type AddCholesterolState = {
  userId: string
  error: string | null
}

export const AddCholesterolFormSchema = z.object({
  userId: z.string().refine((id) => ObjectId.isValid(id), {
    message: "Invalid user ID",
  }),
  total: z.coerce.number().min(0),
  hdl: z.coerce.number().min(0),
  triglycerides: z.coerce.number().min(0),
  datetime: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date",
  }),
})
