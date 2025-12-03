import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getArticles, deleteArticle, getCategories } from "../lib/api"

type Article = {
  id: number
  title: string
  slug: string
  content: string
  excerpt?: string | null
  categoryId: number
}

type Category = {
  id: number
  name: string
  slug: string
}

export default function ArticlesList() {
  const nav = useNavigate()
  const [items, setItems] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [category, setCategory] = useState<string>("")
  async function load() {
    const data = await getArticles(category || undefined)
    setItems(data)
  }
  useEffect(() => {
    load()
  }, [category])
  useEffect(() => {
    getCategories().then(setCategories)
  }, [])
  async function remove(id: number) {
    await deleteArticle(id)
    load()
  }
  return (
    <div style={{ padding: 24 }}>
      <h1>Artigos</h1>
      <div style={{ marginBottom: 12 }}>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Todas</option>
          {categories.map(c => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <button style={{ marginLeft: 8 }} onClick={() => nav("/admin/articles/new")}>Novo</button>
      </div>
      <ul>
        {items.map(a => (
          <li key={a.id} style={{ marginBottom: 8 }}>
            <strong>{a.title}</strong> ({a.slug})
            <button style={{ marginLeft: 8 }} onClick={() => nav(`/admin/articles/${a.id}/edit`)}>Editar</button>
            <button style={{ marginLeft: 8 }} onClick={() => remove(a.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 12 }}>
        <Link to="/login">Sair</Link>
      </div>
    </div>
  )
}
