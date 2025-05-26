"use client"
import { useActionState } from "react"
import { login } from "./action"
import { Button, Paper, TextField } from "@mui/material"
import Link from "next/link"

export default function Login() {
  const [state, action, pending] = useActionState(login, undefined)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 56px - 32px)", // full-height - header - padding,
      }}
    >
      <Paper
        elevation={10}
        style={{
          padding: 20,
          maxWidth: 300,
        }}
      >
        <form action={action} className="flex flex-col gap-4">
          {state?.message && (
            <div style={{ color: "red" }}>{state.message}</div>
          )}

          <TextField name="username" label="Username" />
          <TextField
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button type="submit" disabled={pending} variant="contained">
            {pending ? "Logging in..." : "Login"}
          </Button>
          <div>
            Need an account?{" "}
            <Link className="text-blue-500" href="/register">
              Register
            </Link>
          </div>
        </form>
      </Paper>
    </div>
  )
}
