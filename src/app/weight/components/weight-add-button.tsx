"use client"
import { IconButton } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { useRouter } from "next/navigation"

export const WeightAddButton = () => {
  const router = useRouter()
  return (
    <IconButton
      size="large"
      onClick={() => router.push("/weight/add-entry")}
      sx={{
        marginLeft: "auto",
      }}
    >
      <AddCircleIcon fontSize="large" color="error" />
    </IconButton>
  )
}
