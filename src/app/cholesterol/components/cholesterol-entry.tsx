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
import { deleteCholesterol } from "../action"

export const CholesterolDataDisplay = (props: {
  data: MetricDTO<MetricName.CHOLESTEROL>[]
}) => {
  const data = props.data.map((d) => ({
    id: d.id,
    date: d.date,
    total: d.value.total,
    hdl: d.value.hdl,
    ldl: d.value.ldl,
  }))

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Total Cholesterol</TableCell>
          <TableCell>HDL</TableCell>
          <TableCell>LDL</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell>{formattedDate(entry.date)}</TableCell>
            <TableCell>{entry.total} mg/dL</TableCell>
            <TableCell>{entry.hdl} mg/dL</TableCell>
            <TableCell>{entry.ldl} mg/dL</TableCell>
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
  const [, action, pending] = useActionState(deleteCholesterol, null)

  return (
    <form action={action}>
      <input type="hidden" name="cholesterolId" value={props.id} />
      <IconButton type="submit" size="small" disabled={pending}>
        <DeleteForeverIcon />
      </IconButton>
    </form>
  )
}
