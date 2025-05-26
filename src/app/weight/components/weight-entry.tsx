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
import { deleteWeight } from "../action"

export const WeightDataDisplay = (props: {
  data: MetricDTO<MetricName.WEIGHT>[]
}) => {
  const data = props.data.map((d) => ({
    id: d.id,
    date: d.date,
    weight: d.value,
  }))

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Weight (lbs)</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell>{formattedDate(entry.date)}</TableCell>
            <TableCell>{entry.weight} lbs</TableCell>
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
  const [, action, pending] = useActionState(deleteWeight, null)

  return (
    <form action={action}>
      <input type="hidden" name="heartRateId" value={props.id} />
      <IconButton type="submit" size="small" disabled={pending}>
        <DeleteForeverIcon />
      </IconButton>
    </form>
  )
}
