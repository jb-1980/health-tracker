"use server"
import { createMetric } from "@/db/metrics.server"
import { MetricName } from "@/definitions/metrics"
import { AddHRFormSchema, AddHRState } from "./definitions"
import { isFailure } from "@/lib/result"
import { redirect } from "next/navigation"

export const addHeartRate = async (
  state: AddHRState,
  formData: FormData
): Promise<AddHRState> => {
  const validatedFields = AddHRFormSchema.safeParse({
    userId: state.userId,
    heartRate: formData.get("heartRate"),
    datetime: formData.get("datetime"),
  })

  if (!validatedFields.success) {
    return {
      ...state,
      error: validatedFields.error.message,
    }
  }
  const { heartRate, datetime: timestamp } = validatedFields.data

  const createResult = await createMetric({
    name: MetricName.HEART_RATE,
    userId: state.userId,
    timestamp: new Date(timestamp),
    value: heartRate,
  })

  if (isFailure(createResult)) {
    console.error(createResult.error)
    return {
      ...state,
      error: createResult.message,
    }
  }

  redirect("/heart-rate")
}
