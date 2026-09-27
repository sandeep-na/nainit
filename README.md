# NainIT Solutions

Company website and administrator inquiry dashboard. Next.js frontend, Express API, MongoDB persistence.

## Run locally

```sh
npm run install:all
cp backend/.env.example backend/.env
# Set JWT_SECRET to a unique random value. Start MongoDB locally.
npm run dev:api
# In a second terminal:
npm run dev
```

Frontend: http://localhost:3000. API: http://localhost:5050.
Port 5050 avoids the macOS AirPlay service on port 5000.
Frontend requests `/api/*`; Next.js forwards them to `API_URL` (default `http://127.0.0.1:5050`).
Set `API_URL` in `frontend/.env.local` when hosting the API elsewhere, then rebuild.

## Structure

- `frontend/src/app`: routes, metadata, and the global design tokens.
- `frontend/src/components`: page features, shared site components, and UI primitives.
- `frontend/src/data`: editorial service, industry, project, article, and career content.
- `frontend/src/lib`: API client, validation, and shared utilities.
- `frontend/src/context`: verified authentication and persistent theme state.
- `backend/src/app.ts`: HTTP application and middleware, independent of startup.
- `backend/src/server.ts`: environment, database connection, and listener.
- `backend/src/{routes,controllers,models}`: API contracts, request handling, and persistence.

## Behavior

Only administrators can sign in at `/admin/login`; public login and registration pages and the signup API are removed. Sessions restore through the admin-protected `/api/auth/me`.
Contact and career forms only confirm success after persistence; failures preserve input.
The admin dashboard at `/dashboard` includes an activity overview, searchable inquiry and call inboxes, a hiring inbox, record details, status updates, a website content library, and workspace settings. It supports mobile layouts and light/dark themes. Its API requires an administrator role. Inbox metrics cover the latest 50 inquiries (including call requests) and 100 applications, rather than lifetime totals.

Use `/dashboard?preview=1` to explore the interface with clearly labeled sample data, without credentials. Preview status changes are temporary and never call the mutation APIs. The website library links to published pages; editing content still happens in the source files.
Call requests at `/schedule-call` are saved as inquiries with the preferred date, time, time zone, topic, and optional phone. Admins confirm the time and send meeting details manually; no live calendar availability, automatic invites, or email delivery is configured.
The hiring inbox requires an administrator role. The website does not create demo sessions.
Service and industry pages use the editorial content in `frontend/src/data`; their existing API endpoints remain available.

## Admin setup

If an administrator account already exists, use its credentials at `/admin/login`.
To create one, set `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` (at least 12 characters)
in your local `backend/.env`, then run `npm run admin:create --prefix backend`.
The command requires MongoDB and refuses to overwrite or promote an existing account.
Remove those three setup values from `.env` afterward. No default credentials are provided.

## Validation

```sh
npm run lint
npm run build
npm test --prefix backend
```

Production builds use Webpack to avoid a local Turbopack process/port restriction.
The original Sora/Inter typography, sky/violet/mint palette, React Three Fiber hero,
mega menus, glowing cards, reveal animations, and autoplay sliders are restored.
Fonts are hosted locally. Authentication and submission fixes remain in place.

Before publishing, replace or verify the existing company addresses, team profiles, case-study
metrics, testimonials, and hiring information. Contact submissions are saved in MongoDB;
email notifications are not configured. Use a production MongoDB URI and JWT secret for deployment.
