"use client"
import { IconButton } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { useRouter } from "next/navigation"

export const AddBPButton = () => {
  const router = useRouter()
  return (
    <IconButton
      size="large"
      onClick={() => router.push("/blood-pressure/add-entry")}
      sx={{
        marginLeft: "auto",
      }}
    >
      <AddCircleIcon fontSize="large" color="error" />
    </IconButton>
  )
}
