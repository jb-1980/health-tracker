"use client"
import { Button, Stack, TextField, Typography } from "@mui/material"
import dayjs from "dayjs"
import { useActionState } from "react"
import { addBP } from "../action"
import { useRouter } from "next/navigation"
import { DateTimePicker } from "@/components/DateTimePicker"

export const AddBPEntryForm = (props: { userId: string }) => {
  const router = useRouter()
  const [{ error }, action, pending] = useActionState(addBP, {
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
          label="Systolic"
          placeholder="0"
          variant="outlined"
          type="tel"
          fullWidth
          required
          name="systolic"
        />
        <TextField
          label="Diastolic"
          placeholder="0"
          variant="outlined"
          fullWidth
          required
          type="tel"
          name="diastolic"
        />

        <div>
          <Button
            color="error"
            variant="contained"
            style={btnstyle}
            fullWidth
            type="reset"
            onClick={() => router.push("/blood-pressure")}
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
