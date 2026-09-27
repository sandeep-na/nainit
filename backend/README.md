# NainIT Solutions — Backend API

Express + Mongoose REST API with JWT auth. Requires a running MongoDB instance.

## Quick start

```bash
npm install
cp .env.example .env        # set MONGO_URI + JWT_SECRET
npm run seed                # seed services + industries
npm run dev                 # http://localhost:5050
```

## Structure

```
src/models/         # User (bcrypt-hashed), Service, Industry, Contact, BlogPost
src/controllers/    # auth, service, industry, contact
src/routes/         # auth.routes, service.routes, industry.routes, contact.routes
src/middleware/     # auth.middleware (JWT guard), validation + error handler
src/config/         # MongoDB connection
src/utils/          # asyncHandler, JWT signing
src/app.ts          # HTTP app (helmet, CORS, morgan)
src/server.ts       # database and server startup
src/seed.ts         # seed script
```

## Endpoints

| Method | Route | Auth |
|---|---|---|
| POST | `/api/auth/register` | — |
| POST | `/api/auth/login` | — |
| GET | `/api/auth/me` | Bearer token |
| GET | `/api/services` · `/api/services/:slug` | — |
| GET | `/api/industries` · `/api/industries/:slug` | — |
| POST | `/api/contact` | — |
| GET | `/health` | — |
| GET | `/api/contact/mine` | Bearer token (own inquiries) |
| POST | `/api/applications` | — |
| GET | `/api/applications` | Administrator |

## Checks

```bash
npx tsc -p tsconfig.json --noEmit
npm run build
```

## Env vars

See `.env.example`: `PORT`, `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES`, `FRONTEND_URL`.
