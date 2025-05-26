"use server"
import { deleteMetric } from "@/db/metrics.server"
import { revalidatePath } from "next/cache"

export const deleteHR = async (_state: null, formData: FormData) => {
  const id = formData.get("heartRateId") as string

  await deleteMetric(id)

  revalidatePath("/heart-rate")
  return null
}
