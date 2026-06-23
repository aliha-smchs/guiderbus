# Guiderbus

Marketing site for **Guiderbus** — a business automation agency that builds AI-powered automations for businesses.

> Business Automation Powered by AI

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- Resend-backed contact and waitlist forms
- Cloudflare Turnstile spam protection
- Plausible privacy-friendly analytics
- Docker/VPS production deployment with health checks

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm start
```

## Project Structure

```
src/
├── app/                # routes: /, /services, /privacy, /terms
│   ├── api/            # lead capture + health endpoints
│   ├── contact/        # consultation form
│   ├── platform/       # SaaS waitlist
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

## Production Services

The website builds without secrets, but production lead capture needs these services:

### Resend

Create a Resend API key and verify the sending domain for `guiderbus.com`.
Set:

```bash
RESEND_API_KEY=...
LEAD_TO_EMAIL=contact@guiderbus.com
LEAD_FROM_EMAIL="Guiderbus <contact@guiderbus.com>"
```

`LEAD_FROM_EMAIL` must use a sender address/domain approved in Resend.

### Cloudflare Turnstile

Create a Turnstile widget for `guiderbus.com`.
Set:

```bash
TURNSTILE_SECRET_KEY=...
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
```

The server rejects production form submissions if `TURNSTILE_SECRET_KEY` is not configured.

### Plausible

Add `guiderbus.com` in Plausible and set:

```bash
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=guiderbus.com
```

No Google Analytics or cookie banner is used for the current launch.

## Roadmap

A self-serve SaaS platform is planned. The current `/platform` page collects waitlist interest through the same production lead pipeline as the consultation form.

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

Or with Compose behind a shared Traefik proxy:

```bash
cp .env.example .env
docker network inspect traefik-proxy >/dev/null 2>&1 || docker network create traefik-proxy
docker compose up --build -d
docker compose logs -f
docker compose down
```

The standalone app container listens on `PORT` (default `3000`) and binds `HOSTNAME=0.0.0.0`, so it can still run directly on any container host. The Compose setup is intended for a VPS with one shared Traefik instance and one Nginx container per app:

- `web` runs the Next.js standalone server on the private `guiderbus-app` network
- `nginx` proxies to `web:3000`
- Traefik routes public traffic to the `nginx` container over the external Traefik network

Set these values in `.env` on the VPS:

```bash
APP_DOMAIN=guiderbus.com
TRAEFIK_NETWORK=traefik-proxy
TRAEFIK_ENTRYPOINT=websecure
TRAEFIK_CERT_RESOLVER=letsencrypt
RESEND_API_KEY=...
LEAD_TO_EMAIL=contact@guiderbus.com
LEAD_FROM_EMAIL="Guiderbus <contact@guiderbus.com>"
TURNSTILE_SECRET_KEY=...
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=guiderbus.com
```

`TRAEFIK_NETWORK` must match the Docker network used by your shared Traefik container.

### GitHub Actions to VPS

The workflow in `.github/workflows/ci-cd.yml` runs on pushes to `main`:

1. Installs dependencies with `npm ci`
2. Runs linting with `npm run lint`
3. Runs TypeScript checks with `npm run typecheck`
4. Runs unit/API tests with `npm run test`
5. Builds the Next.js app with `npm run build`
6. Installs Chromium for Playwright and runs `npm run test:e2e`
7. SSHs into the VPS, pulls the latest `main`, and restarts the Docker Compose service

Add these repository secrets in GitHub under **Settings > Secrets and variables > Actions**:

| Secret | Value |
| --- | --- |
| `VPS_HOST` | VPS IP address or hostname |
| `VPS_USER` | Linux user that owns the cloned repo |
| `VPS_SSH_PRIVATE_KEY` | Private SSH key GitHub Actions uses to connect to the VPS |
| `VPS_APP_DIR` | Absolute path to this repo on the VPS, for example `/home/deploy/guiderbus` |
| `VPS_PORT` | SSH port, optional if it is `22` |

Create a dedicated SSH key for GitHub Actions and authorize it for your VPS user:

```bash
ssh-keygen -t ed25519 -C "github-actions-guiderbus" -f github-actions-guiderbus -N ""
ssh-copy-id -i github-actions-guiderbus.pub <your-vps-user>@<your-vps-host>
```

Use the contents of `github-actions-guiderbus` as the `VPS_SSH_PRIVATE_KEY` secret.

One-time VPS requirements:

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin
sudo usermod -aG docker <your-vps-user>
```

Log out and back in after adding the user to the `docker` group. Then verify the cloned repo can pull from GitHub and run Docker:

```bash
cd /path/to/guiderbus
cp .env.example .env
# edit .env if your Traefik network, entrypoint, cert resolver, or domain differs
docker network inspect traefik-proxy >/dev/null 2>&1 || docker network create traefik-proxy
git pull --ff-only origin main
docker compose up --build -d
docker compose ps
```

For private GitHub repos, make sure the VPS clone uses an SSH remote or another credential that can pull from the repository.

Publish to a registry:

```bash
docker tag guiderbus:latest <registry>/<namespace>/guiderbus:latest
docker push <registry>/<namespace>/guiderbus:latest
```

**Note:** `guiderbus.com` is hardcoded for SEO/canonical URLs in [`src/lib/site.ts`](src/lib/site.ts). If you deploy under a different domain, update `url` and `domain` there.

## License

© Guiderbus. All rights reserved.
