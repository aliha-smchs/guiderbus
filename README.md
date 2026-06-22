# Guiderbus

Marketing site for **Guiderbus** — a business automation agency that builds AI-powered automations for businesses.

> Business Automation Powered by AI

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- Static, fully responsive, dark-themed
- Zero backend — deployable on [Vercel](https://vercel.com) as-is

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                # routes: /, /services, /privacy, /terms
│   ├── icon.tsx        # generated favicon
│   └── opengraph-image.tsx
├── components/
│   ├── layout/         # Navbar, Footer
│   ├── sections/       # Hero, Services, HowItWorks, WhyGuiderbus, SaaSTeaser, CTA
│   └── ui/             # Button, Badge, Container, Logo, etc.
└── lib/
    ├── site.ts         # site config (name, domain, email, nav, SEO)
    └── services.ts     # service catalog (single source of truth)
```

## Configuration

Site-wide settings (domain, contact email, navigation) live in [`src/lib/site.ts`](src/lib/site.ts).
The service catalog lives in [`src/lib/services.ts`](src/lib/services.ts) and powers both the home cards and the `/services` page.

## Roadmap

A self-serve SaaS platform is planned. The component architecture (`sections/` + `ui/`) is designed so a future `/platform` route can be added without rewrites. The site currently shows a "Coming Soon" placeholder for it.

## Deploy

### Vercel
Push to a Git provider and import into Vercel — no environment variables required.

### Container (Docker)

The app builds to Next.js [standalone output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output), so the image ships only the server it needs (no `node_modules`).

Build and run with Docker:

```bash
docker build -t guiderbus:latest .
docker run --rm -p 3000:3000 guiderbus:latest
# → http://localhost:3000
```

Or with Compose (includes a healthcheck and restart policy):

```bash
docker compose up --build -d
docker compose logs -f
docker compose down
```

The container listens on `PORT` (default `3000`) and binds `HOSTNAME=0.0.0.0`, so it runs as-is on any container host — Cloud Run, ECS/Fargate, Fly.io, Railway, Kubernetes, a plain VPS, etc.

Publish to a registry:

```bash
docker tag guiderbus:latest <registry>/<namespace>/guiderbus:latest
docker push <registry>/<namespace>/guiderbus:latest
```

**Note:** `guiderbus.com` is hardcoded for SEO/canonical URLs in [`src/lib/site.ts`](src/lib/site.ts). If you deploy under a different domain, update `url` and `domain` there.

## License

© Guiderbus. All rights reserved.
