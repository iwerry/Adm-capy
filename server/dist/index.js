"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const allowedOrigins = [
    "https://capynews2025.vercel.app",
    "https://adm-capy.vercel.app",
    "http://localhost:5173"
];
const corsOptions = {
    origin(origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin))
            return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    }
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.get("/api/categories", async (req, res) => {
    try {
        const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
        res.json(categories);
    }
    catch (e) {
        res.status(500).json({ error: "server_error" });
    }
});
app.get("/api/articles", async (req, res) => {
    try {
        const category = typeof req.query.category === "string" ? req.query.category : undefined;
        if (category) {
            const cat = await prisma.category.findUnique({ where: { slug: category } });
            if (!cat) {
                return res.json([]);
            }
            const articles = await prisma.article.findMany({
                where: { categoryId: cat.id },
                orderBy: { createdAt: "desc" }
            });
            return res.json(articles);
        }
        const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" } });
        res.json(articles);
    }
    catch (e) {
        res.status(500).json({ error: "server_error" });
    }
});
app.get("/api/articles/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: "invalid_id" });
        }
        const article = await prisma.article.findUnique({ where: { id } });
        if (!article) {
            return res.status(404).json({ error: "not_found" });
        }
        res.json(article);
    }
    catch (e) {
        res.status(500).json({ error: "server_error" });
    }
});
app.get("/api/articles/slug/:slug", async (req, res) => {
    try {
        const slug = req.params.slug;
        const article = await prisma.article.findUnique({ where: { slug } });
        if (!article) {
            return res.status(404).json({ error: "not_found" });
        }
        res.json(article);
    }
    catch (e) {
        res.status(500).json({ error: "server_error" });
    }
});
app.post("/api/articles", async (req, res) => {
    try {
        const { title, slug, content, excerpt, categoryId } = req.body || {};
        if (!title || !slug || !content || !categoryId) {
            return res.status(400).json({ error: "invalid_body" });
        }
        const created = await prisma.article.create({
            data: { title, slug, content, excerpt, categoryId }
        });
        res.status(201).json(created);
    }
    catch (e) {
        res.status(500).json({ error: "server_error" });
    }
});
app.put("/api/articles/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: "invalid_id" });
        }
        const { title, slug, content, excerpt, categoryId } = req.body || {};
        const updated = await prisma.article.update({
            where: { id },
            data: { title, slug, content, excerpt, categoryId }
        });
        res.json(updated);
    }
    catch (e) {
        res.status(500).json({ error: "server_error" });
    }
});
app.delete("/api/articles/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: "invalid_id" });
        }
        await prisma.article.delete({ where: { id } });
        res.status(204).end();
    }
    catch (e) {
        res.status(500).json({ error: "server_error" });
    }
});
const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});
