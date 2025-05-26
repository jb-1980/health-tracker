import z from "zod"

export type AddWeightState = {
  userId: string
  error: string | null
}

export const AddWeightFormSchema = z.object({
  weight: z.number().min(0),
  datetime: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date",
  }),
})
