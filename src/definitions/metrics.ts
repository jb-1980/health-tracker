export enum MetricName {
  BLOOD_PRESSURE = "BLOOD_PRESSURE",
  WEIGHT = "WEIGHT",
  HEART_RATE = "HEART_RATE",
  CHOLESTEROL = "CHOLESTEROL",
}

export type BloodPressure = {
  name: MetricName.BLOOD_PRESSURE
  value: {
    systolic: number
    diastolic: number
  }
}

export type Weight = {
  name: MetricName.WEIGHT
  value: number
}

export type HeartRate = {
  name: MetricName.HEART_RATE
  value: number
}

export type Cholesterol = {
  name: MetricName.CHOLESTEROL
  value: {
    ldl: number
    hdl: number
    nonHdl: number
    triglycerides: number
    total: number
  }
}

export type Metric = BloodPressure | Weight | HeartRate | Cholesterol

export type MetricDTO<T extends MetricName> = {
  id: string
  date: string
  name: T
  value: Extract<Metric, { name: T }>["value"]
}
