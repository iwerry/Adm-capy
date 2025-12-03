# Adm-capy (Admin)

```
cd adm-capy
npm install
# .env.local com:
# VITE_API_URL="http://localhost:4000/api"
npm run dev
```

Configuração de deploy na Vercel:
- Root Directory: `adm-capy`
- Framework: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Variáveis de ambiente (produção):
  - `VITE_API_URL` = URL pública da API, ex: `https://capynews-api.sua-plataforma.com/api`
