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
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Paper
        elevation={10}
        style={{
          padding: 20,
          maxWidth: 300,
        }}
      >
        <form action={action}>
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
