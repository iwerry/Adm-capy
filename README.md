# CapyNews – Admin + API

Repositório que concentra a API (`/server`) e o painel admin (`/adm-capy`). O frontend público está em outro projeto e consome a API via `VITE_API_URL`.

## Estrutura
- `/server` – API Node.js + TypeScript + Express + Prisma + SQLite
- `/adm-capy` – Painel admin React + Vite + TypeScript
- `README.md` – instruções gerais

## Server (rodando local)
```
cd server
npm install
npm run prisma:migrate
npm run prisma:seed
npm run dev
```
- `DATABASE_URL` deve apontar para `file:./data/dev.db` (configurado em `server/.env`).
- Scripts em `server/package.json`:
  - `dev`: `ts-node-dev --respawn --transpile-only src/index.ts`
  - `build`: `tsc`
  - `start`: `node dist/index.js`
  - `prisma:migrate`: `prisma migrate dev --name init`
  - `prisma:seed`: `ts-node src/prisma/seed.ts`
- A API inicia em `PORT` do ambiente (fallback `4000`) e loga `API running on port <PORT>`.
- CORS liberado para:
  - `https://capynews2025.vercel.app`
  - `https://adm-capy.vercel.app`

Endpoints disponíveis:
- `GET /api/articles` (suporta `?category=<slug>`)
- `GET /api/articles/:id`
- `GET /api/articles/slug/:slug`
- `POST /api/articles`
- `PUT /api/articles/:id`
- `DELETE /api/articles/:id`
- `GET /api/categories`

## Admin (rodando local)
```
cd adm-capy
npm install
# .env.local com:
# VITE_API_URL="http://localhost:4000/api"
npm run dev
```
- `src/services/apiClient.ts` centraliza `API_BASE_URL` e funções `apiGet/apiPost/apiPut/apiDelete`.
- Todas as telas (lista/criação/edição) usam esse client.
- Autenticação simples no front (`/login`) com credenciais fixas:
  - Email: `admin@capynews.com`
  - Senha: `CapyNews2025!`
- Proteção de rotas com `localStorage.admToken`.

## Deploy da API (ex.: Render)
Objetivo: obter uma URL pública estável, ex.: `https://capynews-api.onrender.com/api`.

Passos genéricos (Render):
1. Criar um novo Web Service apontando para este repositório.
2. Root/Working directory: `server`.
3. Build Command:
   ```
   cd server && npm install && npm run build
   ```
4. Start Command:
   ```
   cd server && npm run start
   ```
5. Variáveis de ambiente:
   - `DATABASE_URL=file:./data/dev.db`
   - (ajuste conforme o ambiente; para produção persistente, considere um SQLite gerenciado ou outro banco)
6. Após o deploy, anote a URL pública do serviço, por ex.: `https://capynews-api.onrender.com`. A base da API será `https://capynews-api.onrender.com/api`.

Equivalentes em Railway/DO App Platform:
- Configure o serviço com Root `server`, build e start como acima, e defina `DATABASE_URL` no painel.

## Deploy do Admin na Vercel
Projeto: `https://adm-capy.vercel.app`

Configuração:
- Root Directory: `adm-capy`
- Framework: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Variáveis de ambiente (produção):
  - `VITE_API_URL` = URL pública da API, ex.: `https://capynews-api.onrender.com/api`

## Meta
- Local: `cd server && npm run dev` sobe a API; `cd adm-capy && npm run dev` abre o admin consumindo `VITE_API_URL`.
- Produção: API publicada em PaaS com URL pública; admin na Vercel usa essa URL via `VITE_API_URL`.
