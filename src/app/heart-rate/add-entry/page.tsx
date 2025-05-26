import { Dialog, DialogTitle } from "@mui/material"
import { verifySession } from "@/auth/verify-session"
import { Navigate } from "@/components/navigate"
import { AddHeartRateEntryForm } from "./components/add-heart-rate-form"

export default async function AddHeartRateEntry() {
  const session = await verifySession()
  if (!session.isAuth) {
    return <Navigate to="/login" />
  }

  return (
    <Dialog open>
      <DialogTitle>Add Heart Rate</DialogTitle>
      <AddHeartRateEntryForm userId={session.user.id} />
    </Dialog>
  )
}
