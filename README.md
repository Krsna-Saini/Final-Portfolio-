# Krishna Saini — 3D Portfolio

A modern, animation-rich personal portfolio built with an interactive **3D hero scene**,
smooth scroll-reveal motion, and a futuristic dark theme. It showcases Krishna Saini's
work, skills, journey, and a big-tech engineering internship — plus **dedicated 3D pages
for every project** and a small **backend that collects opportunities** people send and
surfaces them in a private owner inbox.

**Sections:** Hero (3D) · About · Skills · Experience · Journey · Work · Contact

**Routes**

| Route              | Page |
| ------------------ | ---- |
| `/`                | Home (all sections) |
| `/projects/:slug`  | Per-project detail page with its own 3D hero (`notesmania`, `nexus`, `ai-chat`, `better-call-saul`) |
| `/inbox`           | Private owner inbox (passcode-gated) for received opportunities |
| `*`                | Animated 404 |

## Tech stack

| Area            | Tools |
| --------------- | ----- |
| Framework       | React 19 + TypeScript + Vite |
| Routing         | react-router-dom (multi-page, lazy-loaded routes) |
| 3D              | Three.js · @react-three/fiber · @react-three/drei · postprocessing (Bloom / Vignette) |
| Animation       | Framer Motion (scroll reveal, magnetic buttons, tilt cards, custom cursor) |
| Styling         | Tailwind CSS v3 (custom theme, glassmorphism, gradients) |
| Icons           | Custom brand SVGs + lucide-react |
| Backend         | Express + JSON file store · nodemailer (optional email notifications) |

## Getting started

```bash
npm install
npm run dev      # starts BOTH the web app (5173) and the API (4000)
```

`npm run dev` runs the Vite dev server and the Express API together (via `concurrently`).
The frontend proxies `/api/*` to the API, so everything is same-origin in development.

## Scripts

```bash
npm run dev         # web (5173) + API (4000) together
npm run dev:web     # just the Vite dev server
npm run dev:server  # just the Express API
npm run build       # type-check + production build -> dist/
npm run preview     # preview the production build locally
```

## Opportunities backend

Visitors submit the **Contact** form; each submission is stored and shows up in the
private `/inbox` page. If the API is unreachable, the form gracefully falls back to
opening the visitor's mail app (`mailto:`).

- **Storage:** a JSON file at `server/data/opportunities.json` (git-ignored, created on first write).
- **Owner inbox** (`/inbox`): enter the admin passcode to view, mark read/unread, star,
  archive, reply (mailto) or delete submissions. Live unread badge + filters.
- **Admin passcode:** set via the `ADMIN_KEY` env var. Defaults to `krishna-admin` — **change this**.
- **Email notifications (optional):** set SMTP env vars and every new submission emails you.
  Without them, submissions are still stored and logged to the server console.

| Env var        | Purpose |
| -------------- | ------- |
| `ADMIN_KEY`    | Passcode that unlocks `/inbox` (default `krishna-admin`) |
| `PORT`         | API port (default `4000`) |
| `SMTP_HOST`    | SMTP server host (enables email notifications) |
| `SMTP_PORT`    | SMTP port (default `587`) |
| `SMTP_USER`    | SMTP username |
| `SMTP_PASS`    | SMTP password / app password |
| `NOTIFY_EMAIL` | Where notifications are sent (defaults to `SMTP_USER`) |

Create a `.env` file (git-ignored) in the project root to set these locally.

### API endpoints

| Method | Endpoint                        | Auth  | Purpose |
| ------ | ------------------------------- | ----- | ------- |
| GET    | `/api/health`                   | —     | Health check |
| POST   | `/api/opportunities`            | —     | Submit an opportunity (rate-limited) |
| GET    | `/api/admin/verify`             | admin | Validate the passcode |
| GET    | `/api/opportunities`            | admin | List all submissions |
| GET    | `/api/opportunities/stats`      | admin | Totals (total/unread/starred/archived) |
| PATCH  | `/api/opportunities/:id`        | admin | Update read/starred/archived |
| DELETE | `/api/opportunities/:id`        | admin | Delete a submission |

Admin requests send the passcode via an `x-admin-key` header (or `?key=`).

## Project structure

```
src/
  App.tsx                 # router + global layout (cursor, scroll progress)
  data.ts                 # single source of truth for all content (+ getProject())
  index.css               # theme, glass utilities, custom cursor
  lib/
    motion.ts             # shared Framer Motion variants + easing
    inboxApi.ts           # API client (submit + admin actions)
  three/
    HeroScene.tsx         # the 3D hero (r3f canvas, distorted core, postprocessing)
    ProjectScene.tsx      # reusable accent-colored 3D scene for project pages
  pages/
    HomePage.tsx          # all sections composed
    ProjectDetail.tsx     # per-project 3D page
    Inbox.tsx             # private owner inbox
    NotFound.tsx          # animated 404
  components/             # Navbar, Preloader, CustomCursor, TiltCard, ScrollToTop, ...
  sections/               # Hero, About, Skills, Experience, Journey, Projects, Contact, Footer
server/
  index.js               # Express API
  store.js               # JSON file store
  notify.js              # optional email notifications
public/
  images/                # project screenshots + profile photo
  resume.pdf             # downloadable CV (linked from the hero + navbar)
  favicon.svg
```

## Customizing

- **All content** (name, bio, stats, socials, skills, experience, timeline, projects) lives in
  [`src/data.ts`](src/data.ts) — edit that one file to update the site. Each project has a
  `slug`, `overview`, `features`, `stack`, `year`, `role` and `accent` colour used by its 3D page.
- **Theme colors, fonts and animations** are defined in [`tailwind.config.js`](tailwind.config.js).
- **Resume:** replace `public/resume.pdf` with your own file (keep the same name) and it will be
  served from the "Download CV" / "Resume" buttons automatically.

## Performance notes

- The 3D scenes (`HeroScene`, `ProjectScene`) and every route are **lazy-loaded** as separate
  chunks, so heavy Three.js code never blocks the initial page paint.
- Each WebGL render loop **pauses automatically** when its canvas scrolls out of view
  (IntersectionObserver), saving CPU/GPU and battery.
- On low-power / mobile devices (and when `prefers-reduced-motion` is set) particle counts and
  DPR are reduced and postprocessing is skipped.

## Deployment

- **Frontend** deploys anywhere static (Vercel, Netlify, GitHub Pages). Run `npm run build`
  and serve `dist/`.
- **Backend** is a long-running Express server, so it does **not** run on Vercel's static
  hosting as-is. Host `server/` on a Node platform such as **Render**, **Railway**, **Fly.io**
  or a small VM, then point the frontend's `/api` calls at that URL (update the Vite proxy for
  dev, and use an env-based base URL / rewrite in production). Alternatively, port the endpoints
  in `server/index.js` to serverless functions (e.g. Vercel/Netlify Functions) backed by a
  hosted database instead of the local JSON file.

---

Built by Krishna Saini · IIT (BHU) Varanasi
