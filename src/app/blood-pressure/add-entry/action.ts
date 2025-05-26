"use server"
import { createMetric } from "@/db/metrics.server"
import { MetricName } from "@/definitions/metrics"
import { AddBPState } from "./definitions"
import { isFailure } from "@/lib/result"
import { redirect } from "next/navigation"

export const addBP = async (
  state: AddBPState,
  formData: FormData
): Promise<AddBPState> => {
  const systolic = formData.get("systolic") as string
  const diastolic = formData.get("diastolic") as string
  const timestamp = formData.get("datetime") as string

  const createResult = await createMetric({
    name: MetricName.BLOOD_PRESSURE,
    userId: state.userId,
    timestamp: new Date(timestamp),
    value: {
      systolic: Number(systolic),
      diastolic: Number(diastolic),
    },
  })

  if (isFailure(createResult)) {
    console.error(createResult.error)
    return {
      ...state,
      error: createResult.message,
    }
  }

  redirect("/blood-pressure")
}
