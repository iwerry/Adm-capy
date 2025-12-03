import { Routes, Route, Navigate } from "react-router-dom"
import RequireAuth from "./components/RequireAuth"
import Login from "./pages/Login"
import ArticlesList from "./pages/ArticlesList"
import ArticleNew from "./pages/ArticleNew"
import ArticleEdit from "./pages/ArticleEdit"

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin/articles" element={<RequireAuth><ArticlesList /></RequireAuth>} />
      <Route path="/admin/articles/new" element={<RequireAuth><ArticleNew /></RequireAuth>} />
      <Route path="/admin/articles/:id/edit" element={<RequireAuth><ArticleEdit /></RequireAuth>} />
      <Route path="*" element={<Navigate to="/admin/articles" replace />} />
    </Routes>
  )
}
