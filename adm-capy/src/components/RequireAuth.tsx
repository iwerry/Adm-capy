import { Navigate } from "react-router-dom"

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("admToken") : null
  return token ? children : <Navigate to="/login" replace />
}
