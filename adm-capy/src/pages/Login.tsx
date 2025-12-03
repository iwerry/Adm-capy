import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (email === "admin@capynews.com" && password === "CapyNews2025!") {
      window.localStorage.setItem("admToken", "ok")
      nav("/admin/articles", { replace: true })
    } else {
      setError("Credenciais inválidas")
    }
  }
  return (
    <div style={{ padding: 24 }}>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <div>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        </div>
        <div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
