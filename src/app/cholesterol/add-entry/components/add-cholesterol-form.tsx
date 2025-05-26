"use client"
import { Button, Stack, TextField, Typography } from "@mui/material"
import { useActionState } from "react"
import { addCholesterol } from "../action"
import { useRouter } from "next/navigation"
import { DateTimePicker } from "@/components/DateTimePicker"
import dayjs from "dayjs"

export const AddCholesterolForm = (props: { userId: string }) => {
  const router = useRouter()
  const [{ error }, action, pending] = useActionState(addCholesterol, {
    userId: props.userId,
    error: null,
  })

  const btnstyle = { margin: "8px 0" }

  return (
    <form action={action}>
      <Stack direction="column" spacing={3} padding={2}>
        {error && (
          <Typography variant="subtitle2" color="error">
            {error}
          </Typography>
        )}
        <DateTimePicker
          name="datetime"
          label="Measured on"
          defaultValue={dayjs()}
        />
        <TextField
          label="Total Cholesterol"
          placeholder="0"
          variant="outlined"
          fullWidth
          required
          type="number"
          name="totalCholesterol"
        />
        <TextField
          label="HDL"
          placeholder="0"
          variant="outlined"
          fullWidth
          required
          type="number"
          name="hdl"
        />
        <TextField
          label="Triglycerides"
          placeholder="0"
          variant="outlined"
          fullWidth
          required
          type="number"
          name="triglycerides"
        />

        <div>
          <Button
            color="error"
            variant="contained"
            style={btnstyle}
            fullWidth
            type="reset"
            onClick={() => router.push("/cholesterol")}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            type="submit"
            disabled={pending}
          >
            Submit
          </Button>
        </div>
      </Stack>
    </form>
  )
}
