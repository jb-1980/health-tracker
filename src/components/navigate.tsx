"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const Navigate = (props: { to: string; replace?: boolean }) => {
  const { replace, to } = props
  const router = useRouter()
  useEffect(() => {
    if (replace) {
      router.replace(to)
    } else {
      router.push(to)
    }
  }, [replace, router, to])
  return null
}
