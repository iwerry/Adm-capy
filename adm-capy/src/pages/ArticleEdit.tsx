import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { apiGet, apiPut } from "../services/apiClient"

type Category = {
  id: number
  name: string
  slug: string
}

export default function ArticleEdit() {
  const nav = useNavigate()
  const params = useParams()
  const id = Number(params.id)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    apiGet<Category[]>("/categories").then(setCategories)
  }, [])
  useEffect(() => {
    apiGet<any>(`/articles/${id}`).then(a => {
      if (!a) return
      setTitle(a.title)
      setSlug(a.slug)
      setContent(a.content)
      setExcerpt(a.excerpt ?? "")
      setCategoryId(a.categoryId)
    })
  }, [id])
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!categoryId) return
    await apiPut(`/articles/${id}`, { title, slug, content, excerpt, categoryId })
    nav("/admin/articles", { replace: true })
  }
  return (
    <div style={{ padding: 24 }}>
      <h1>Editar Artigo</h1>
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
