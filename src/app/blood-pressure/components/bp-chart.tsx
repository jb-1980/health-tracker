"use client"
import { AspectRatioBox } from "@/components/AspectRatioBox"
import { MetricDTO, MetricName } from "@/definitions/metrics"
import { LineChart } from "@mui/x-charts/LineChart"

export const BPChart = (props: {
  data: MetricDTO<MetricName.BLOOD_PRESSURE>[]
}) => {
  const data = props.data.map((d) => ({
    date: d.date,
    diastolic: d.value.diastolic,
    systolic: d.value.systolic,
  }))
  return (
    <AspectRatioBox ratio={16 / 9}>
      <LineChart
        dataset={data.map((d) => ({
          ...d,
          date: new Date(d.date),
        }))}
        series={[
          { dataKey: "diastolic", label: "DIA" },
          { dataKey: "systolic", label: "SYS" },
        ]}
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
