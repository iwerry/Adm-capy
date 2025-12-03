import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiGet, apiPost } from "../services/apiClient"

type Category = {
  id: number
  name: string
  slug: string
}

export default function ArticleNew() {
  const nav = useNavigate()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    apiGet<Category[]>("/categories").then(setCategories)
  }, [])
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!categoryId) return
    await apiPost("/articles", { title, slug, content, excerpt, categoryId })
    nav("/admin/articles", { replace: true })
  }
  return (
    <div style={{ padding: 24 }}>
      <h1>Novo Artigo</h1>
      <form onSubmit={submit}>
        <div>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" />
        </div>
        <div>
          <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="Slug" />
        </div>
        <div>
          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Conteúdo" />
        </div>
        <div>
          <input value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Resumo" />
        </div>
        <div>
          <select value={categoryId ?? ""} onChange={e => setCategoryId(Number(e.target.value))}>
            <option value="">Categoria</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  )
}
