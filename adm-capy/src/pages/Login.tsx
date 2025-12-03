import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Login() {
  const nav = useNavigate()
  const [value, setValue] = useState("")
  function submit(e: React.FormEvent) {
    e.preventDefault()
    window.localStorage.setItem("admToken", value || "1")
    nav("/admin/articles", { replace: true })
  }
  return (
    <div style={{ padding: 24 }}>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input value={value} onChange={e => setValue(e.target.value)} placeholder="Token" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
