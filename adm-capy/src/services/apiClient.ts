const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api"

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, init)
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }
  return res.json()
}

export async function apiGet<T>(path: string): Promise<T> {
  return request<T>(path)
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
}

export async function apiDelete(path: string): Promise<void> {
  await fetch(`${API_BASE_URL}${path}`, { method: "DELETE" })
}

export { API_BASE_URL }
