import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"

import { isLoggedIn } from "@/hooks/useAuth"

type GuardProps = {
  children: ReactNode
}

export function RequireAuth({ children }: GuardProps) {
  const location = useLocation()

  if (!isLoggedIn()) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

export function RequireGuest({ children }: GuardProps) {
  if (isLoggedIn()) {
    return <Navigate to="/" replace />
  }

  return children
}
