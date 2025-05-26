"use client"
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material"
import { formattedDate } from "../../../lib/dates"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { MetricDTO, MetricName } from "@/definitions/metrics"
import { useActionState } from "react"
import { deleteHR } from "../action"

export const HRDataDisplay = (props: {
  data: MetricDTO<MetricName.HEART_RATE>[]
}) => {
  const data = props.data.map((d) => ({
    id: d.id,
    date: d.date,
    heartRate: d.value,
  }))

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Heart Rate</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell>{formattedDate(entry.date)}</TableCell>
            <TableCell>{entry.heartRate} bpm</TableCell>
            <TableCell>
              <DeleteMetricControl id={entry.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const DeleteMetricControl = (props: { id: string }) => {
  const [, action, pending] = useActionState(deleteHR, null)

  return (
    <form action={action}>
      <input type="hidden" name="heartRateId" value={props.id} />
      <IconButton type="submit" size="small" disabled={pending}>
        <DeleteForeverIcon />
      </IconButton>
    </form>
  )
}
