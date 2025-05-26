"use client"
import { AspectRatioBox } from "@/components/AspectRatioBox"
import { MetricDTO, MetricName } from "@/definitions/metrics"
import { LineChart } from "@mui/x-charts/LineChart"

export const WeightChart = (props: {
  data: MetricDTO<MetricName.WEIGHT>[]
}) => {
  const data = props.data.map((d) => ({
    date: d.date,
    weight: d.value,
  }))
  return (
    <AspectRatioBox ratio={16 / 9}>
      <LineChart
        dataset={data.map((d) => ({
          ...d,
          date: new Date(d.date),
        }))}
        series={[{ dataKey: "weight", label: "Weight (lbs)" }]}
        xAxis={[
          {
            dataKey: "date",
            scaleType: "time",
            valueFormatter: (date) => date.toLocaleDateString(),
          },
        ]}
      />
    </AspectRatioBox>
  )
}
