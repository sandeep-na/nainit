# NainIT Solutions — Frontend

Company website built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.
Original sky/violet/mint UI with locally hosted Sora/Inter fonts, a 3D hero, mega menus, and animated cards/sliders.

## Quick start

```bash
npm install
cp .env.example .env        # optional — defaults point at the local API
npm run dev                 # http://localhost:3000
```

Backend API lives in `../backend` and runs on `http://localhost:5050`.

## Structure

```
src/app/                  # routes: home, about, services, services/[slug],
                          # industries, industries/[slug], portfolio,
                          # portfolio/[slug], blog, blog/[slug], careers,
                          # contact, auth/login, auth/register, dashboard
src/components/<page>/    # one primary component file per page
src/components/common/    # navbar, footer, page-hero, cta-banner, reveal
src/components/ui/        # button, card, input, section-heading, toaster
src/components/three/     # hero-scene (lazy-loaded, client-only)
src/{lib,data,hooks,context,types}/
public/images/            # all site imagery
```

## Checks

```bash
npm run lint          # eslint — must be clean
npx tsc --noEmit      # type check
npm run build         # production build (Webpack)
```

## Notes

- Slug pages (`services/[slug]`, `industries/[slug]`, `portfolio/[slug]`, `blog/[slug]`)
  are statically generated with per-page SEO metadata.
- Auth, contact, and application forms use the backend API through a same-origin proxy.
- API failures show errors and preserve form input. No simulated success or demo login.
- The dashboard loads the signed-in account’s inquiries from MongoDB.
