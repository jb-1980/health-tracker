"use client"
import { MetricDTO, MetricName } from "@/definitions/metrics"
import { LineChart } from "@mui/x-charts/LineChart"

export const CholesterolChart = (props: {
  data: MetricDTO<MetricName.CHOLESTEROL>[]
}) => {
  const data = props.data.map((d) => ({
    date: d.date,
    total: d.value.total,
    hdl: d.value.hdl,
    ldl: d.value.ldl,
  }))
  return (
    <LineChart
      width={500}
      height={300}
      dataset={data.map((d) => ({
        ...d,
        date: new Date(d.date),
      }))}
      series={[
        { dataKey: "total", label: "Total Cholesterol" },
        { dataKey: "hdl", label: "HDL" },
        { dataKey: "ldl", label: "LDL" },
      ]}
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
