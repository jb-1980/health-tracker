import { Dialog, DialogTitle } from "@mui/material"
import { verifySession } from "@/auth/verify-session"
import { Navigate } from "@/components/navigate"
import { AddWeightEntryForm } from "./components/add-weight-form"

export default async function AddWeightEntry() {
  const session = await verifySession()
  if (!session.isAuth) {
    return <Navigate to="/login" />
  }

  return (
    <Dialog open>
      <DialogTitle>Add Heart Rate</DialogTitle>
      <AddWeightEntryForm userId={session.user.id} />
    </Dialog>
  )
}
