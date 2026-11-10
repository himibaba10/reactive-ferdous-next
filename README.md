# reactive-ferdous-next

Next.js (App Router) rewrite of the Reactive Ferdous portfolio.

- **DB:** MongoDB Atlas  
- **Media:** Cloudflare R2  
- **Auth:** JWT in httpOnly cookie (single admin)  
- **Contact:** Formspree (+ optional Resend confirmation)  
- **Package manager:** Bun  

## Setup

```bash
cd "../reactive-ferdous-next"
cp .env.example .env.local
# fill MongoDB, R2, JWT_SECRET, ADMIN_*  (no Firebase needed for the app)
bun install
bun run seed:admin
bun run dev
```

Admin: [http://localhost:3000/admin](http://localhost:3000/admin) — add projects/reviews/logos there (uploads go to R2).

## Optional: import from the old Vite + Firestore site

Only if you still want to pull existing live data from the previous Firebase project:

```bash
# set FIREBASE_PROJECT_ID in .env.local
bun run migrate:firebase -- --dry-run
bun run migrate:firebase
```

## Deploy (Vercel)

1. Import this repo in Vercel  
2. Set env vars from `.env.example` (Mongo, JWT, R2, admin — not Firebase)  
3. Ensure R2 public URL / custom domain is in `images.remotePatterns` if needed  
4. Deploy  

## Scripts

| Script | Purpose |
|--------|---------|
| `bun run seed:admin` | Create/reset the single admin user |
| `bun run migrate:firebase` | Optional: old Firestore → MongoDB + media → R2 |
| `bun run dev` | Local development |
