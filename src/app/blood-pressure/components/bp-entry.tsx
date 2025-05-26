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
import { deleteBP } from "../action"

export const BPDataDisplay = (props: {
  data: MetricDTO<MetricName.BLOOD_PRESSURE>[]
}) => {
  const data = props.data.map((d) => ({
    id: d.id,
    date: d.date,
    systolic: d.value.systolic,
    diastolic: d.value.diastolic,
  }))

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Blood Pressure</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell>{formattedDate(entry.date)}</TableCell>
            <TableCell>
              {entry.systolic}/{entry.diastolic} mmHg
            </TableCell>

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
  const [, action, pending] = useActionState(deleteBP, null)

  return (
    <form action={action}>
      <input type="hidden" name="bloodPressureId" value={props.id} />
      <IconButton type="submit" size="small" disabled={pending}>
        <DeleteForeverIcon />
      </IconButton>
    </form>
  )
}
