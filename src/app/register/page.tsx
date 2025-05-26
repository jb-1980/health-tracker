"use client"
import { useActionState } from "react"
import { register } from "./action"
import { Button, Paper, Stack, TextField, Typography } from "@mui/material"
import Link from "next/link"

export default function Register() {
  const paperStyle = {
    padding: 20,
    maxWidth: 300,
  }
  const [state, action, pending] = useActionState(register, undefined)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 56px - 32px)", // full-height - header - padding,
      }}
    >
      <Paper elevation={10} style={paperStyle}>
        <form action={action}>
          <Stack spacing={3} alignItems="center">
            <Typography>Register</Typography>
            {state?.message && (
              <div style={{ color: "red" }}>{state.message}</div>
            )}
            <TextField name="username" label="Username" variant="standard" />

            <TextField
              name="password"
              label="Password"
              variant="standard"
              type="password"
            />

            <TextField
              name="confirmPassword"
              label="Confirm Password"
              variant="standard"
              type="password"
            />

            <TextField name="firstName" label="First Name" variant="standard" />

            <TextField name="lastName" label="Last Name" variant="standard" />
            <Button type="submit" disabled={pending} variant="contained">
              {pending ? "Registering..." : "Register"}
            </Button>
            <div>
              Already have an account?{" "}
              <Link className="text-blue-500" href="/login">
                Login
              </Link>
            </div>
          </Stack>
        </form>
      </Paper>
    </div>
  )
}
