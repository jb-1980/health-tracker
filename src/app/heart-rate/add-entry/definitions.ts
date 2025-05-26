import z from "zod"

export type AddHRState = {
  userId: string
  error: string | null
}

export const AddHRFormSchema = z.object({
  heartRate: z.number().min(0),
  datetime: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date",
  }),
})
