const BASE_URL = import.meta.env.VITE_API_URL as string

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories`)
  return res.json()
}

export async function getArticles(category?: string) {
  const url = category ? `${BASE_URL}/articles?category=${encodeURIComponent(category)}` : `${BASE_URL}/articles`
  const res = await fetch(url)
  return res.json()
}

export async function getArticleById(id: number) {
  const res = await fetch(`${BASE_URL}/articles/${id}`)
  if (res.status === 404) return null
  return res.json()
}

export async function createArticle(body: {
  title: string
  slug: string
  content: string
  excerpt?: string
  categoryId: number
}) {
  const res = await fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
  return res.json()
}

export async function updateArticle(id: number, body: {
  title?: string
  slug?: string
  content?: string
  excerpt?: string
  categoryId?: number
}) {
  const res = await fetch(`${BASE_URL}/articles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
  return res.json()
}

export async function deleteArticle(id: number) {
  await fetch(`${BASE_URL}/articles/${id}`, { method: "DELETE" })
}
