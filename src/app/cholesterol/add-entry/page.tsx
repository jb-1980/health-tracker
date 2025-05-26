import { Dialog, DialogTitle } from "@mui/material"
import { verifySession } from "@/auth/verify-session"
import { Navigate } from "@/components/navigate"
import { AddCholesterolForm } from "./components/add-cholesterol-form"

export default async function AddCholesterolEntry() {
  const session = await verifySession()
  if (!session.isAuth) {
    return <Navigate to="/login" />
  }

  return (
    <Dialog open>
      <DialogTitle>Add Cholesterol</DialogTitle>
      <AddCholesterolForm userId={session.user.id} />
    </Dialog>
  )
}
