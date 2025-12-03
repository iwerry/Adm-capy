# CapyNews Admin API + Painel

## Server

```
cd server
npm install
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

A variável `DATABASE_URL` deve apontar para `file:./data/dev.db`.

## Admin

```
cd adm-capy
npm install
# criar .env.local com VITE_API_URL, exemplo: http://localhost:4000/api
npm run dev
```

O frontend público (CapyNews) consumirá a API via `VITE_API_URL`. Este projeto será deployado em infraestrutura separada.
