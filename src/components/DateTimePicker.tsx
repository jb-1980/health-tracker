import {
  DateTimePicker as MUIDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { ComponentProps } from "react"

export const DateTimePicker = (
  props: ComponentProps<typeof MUIDateTimePicker>
) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <MUIDateTimePicker {...props} />
  </LocalizationProvider>
)
