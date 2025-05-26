"use server"
import { createMetric } from "@/db/metrics.server"
import { MetricName } from "@/definitions/metrics"
import {
  AddCholesterolFormSchema,
  AddCholesterolState,
} from "./lib/definitions"
import { isFailure } from "@/lib/result"
import { redirect } from "next/navigation"
import { calculateLDL, calculateNonHDL } from "./lib/utils"

export const addCholesterol = async (
  state: AddCholesterolState,
  formData: FormData
): Promise<AddCholesterolState> => {
  const validatedFields = AddCholesterolFormSchema.safeParse({
    userId: state.userId,
    total: formData.get("totalCholesterol"),
    hdl: formData.get("hdl"),
    triglycerides: formData.get("triglycerides"),
    datetime: formData.get("datetime"),
  })

  if (!validatedFields.success) {
    return {
      ...state,
      error: validatedFields.error.message,
    }
  }

  const { total, hdl, triglycerides, datetime } = validatedFields.data

  const createResult = await createMetric({
    name: MetricName.CHOLESTEROL,
    userId: state.userId,
    timestamp: new Date(datetime),
    value: {
      total,
      hdl,
      triglycerides,
      ldl: calculateLDL(total, hdl, triglycerides),
      nonHdl: calculateNonHDL(total, hdl),
    },
  })

  if (isFailure(createResult)) {
    console.error(createResult.error)
    return {
      ...state,
      error: createResult.message,
    }
  }

  redirect("/cholesterol")
}
