"use server"
import { deleteMetric } from "@/db/metrics.server"
import { revalidatePath } from "next/cache"

export const deleteBP = async (_state: null, formData: FormData) => {
  const id = formData.get("bloodPressureId") as string

  await deleteMetric(id)

  revalidatePath("/blood-pressure")
  return null
}
