import z from "zod"

export type AddCholesterolState = {
  userId: string
  error: string | null
}

export const AddCholesterolFormSchema = z.object({
  userId: z.string().uuid(),
  total: z.number().min(0),
  hdl: z.number().min(0),
  triglycerides: z.number().min(0),
  datetime: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date",
  }),
})
