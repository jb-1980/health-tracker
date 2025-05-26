"use server"
import { deleteMetric } from "@/db/metrics.server"
import { revalidatePath } from "next/cache"

export const deleteWeight = async (_state: null, formData: FormData) => {
  const id = formData.get("weight") as string

  await deleteMetric(id)

  revalidatePath("/weight")
  return null
}
