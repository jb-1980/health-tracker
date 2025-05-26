"use server"
import { deleteMetric } from "@/db/metrics.server"
import { revalidatePath } from "next/cache"

export const deleteCholesterol = async (_state: null, formData: FormData) => {
  const id = formData.get("cholesterolId") as string

  await deleteMetric(id)

  revalidatePath("/cholesterol")
  return null
}
