"use client"
import { MetricDTO, MetricName } from "@/definitions/metrics"
import { LineChart } from "@mui/x-charts/LineChart"

export const HeartRateChart = (props: {
  data: MetricDTO<MetricName.HEART_RATE>[]
}) => {
  const data = props.data.map((d) => ({
    date: d.date,
    heartRate: d.value,
  }))
  return (
    <LineChart
      width={500}
      height={300}
      dataset={data.map((d) => ({
        ...d,
        date: new Date(d.date),
      }))}
      series={[{ dataKey: "heartRate", label: "Heart Rate" }]}
      xAxis={[
        {
          dataKey: "date",
          scaleType: "time",
          valueFormatter: (date) => date.toLocaleDateString(),
        },
      ]}
    />
  )
}
