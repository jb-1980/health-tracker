import { Dialog, DialogTitle } from "@mui/material"
import { verifySession } from "@/auth/verify-session"
import { Navigate } from "@/components/navigate"
import { AddBPEntryForm } from "./components/add-bp-form"

export default async function AddBPEntry() {
  const session = await verifySession()
  if (!session.isAuth) {
    return <Navigate to="/login" />
  }

  return (
    <Dialog open>
      <DialogTitle>Add Blood Pressure</DialogTitle>
      <AddBPEntryForm userId={session.user.id} />
    </Dialog>
  )
}
