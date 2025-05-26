"use server"
import { createMetric } from "@/db/metrics.server"
import { MetricName } from "@/definitions/metrics"
import { AddWeightFormSchema, AddWeightState } from "./definitions"
import { isFailure } from "@/lib/result"
import { redirect } from "next/navigation"

export const addWeight = async (
  state: AddWeightState,
  formData: FormData
): Promise<AddWeightState> => {
  const validatedFields = AddWeightFormSchema.safeParse({
    userId: state.userId,
    weight: formData.get("weight"),
    datetime: formData.get("datetime"),
  })

  if (!validatedFields.success) {
    return {
      ...state,
      error: validatedFields.error.message,
    }
  }
  const { weight, datetime: timestamp } = validatedFields.data

  const createResult = await createMetric({
    name: MetricName.WEIGHT,
    userId: state.userId,
    timestamp: new Date(timestamp),
    value: weight,
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
