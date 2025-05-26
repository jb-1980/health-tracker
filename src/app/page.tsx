import { verifySession } from "@/auth/verify-session"
import { Navigate } from "@/components/navigate"
import { Button, Stack } from "@mui/material"
import Link from "next/link"

export default async function Home() {
  const session = await verifySession()
  if (!session.isAuth) {
    return <Navigate to="/login" />
  }
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        textAlign: "center",
        minHeight: "calc(100vh - 56px - 32px)", // full-height - header - padding,
        boxSizing: "border-box",
        gap: 2,
        width: "95%",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <Button
        component={Link}
        fullWidth
        href="/blood-pressure"
        variant="contained"
      >
        Blood Pressure
      </Button>
      <Button component={Link} fullWidth href="/heart-rate" variant="contained">
        Heart Rate
      </Button>
      <Button component={Link} fullWidth href="/weight" variant="contained">
        Weight
      </Button>
      <Button
        component={Link}
        fullWidth
        href="/cholesterol"
        variant="contained"
      >
        Cholesterol
      </Button>
    </Stack>
  )
}
