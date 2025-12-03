import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import ArticlesList from "./pages/ArticlesList"
import ArticleNew from "./pages/ArticleNew"
import ArticleEdit from "./pages/ArticleEdit"

function Private({ children }: { children: JSX.Element }) {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("admToken") : null
  return token ? children : <Navigate to="/login" replace />
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/articles" element={<Private><ArticlesList /></Private>} />
        <Route path="/admin/articles/new" element={<Private><ArticleNew /></Private>} />
        <Route path="/admin/articles/:id/edit" element={<Private><ArticleEdit /></Private>} />
        <Route path="*" element={<Navigate to="/admin/articles" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
