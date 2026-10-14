# Vimal Mudalagi — Portfolio

Single-page portfolio. React + Vite + Tailwind CSS (client) and Node + Express (contact API).

```
portfolio/
├── client/                 React + Vite app
│   ├── public/             logo.svg, profile.svg, resume.pdf (you add), fonts/
│   └── src/
│       ├── components/     Header, Hero, About, Skills, Projects, Education, Contact, Footer, Section
│       ├── data/content.js ALL editable text/links live here
│       └── utils/          validate.js (+ test)
├── server/                 Express API
│   ├── src/app.js          routes, validation, spam protection, mail
│   ├── src/index.js        entry point
│   └── test/api.test.js
├── requirements.md
└── README.md
```

## Prerequisites
- Node.js 18+ (tested on 22) and npm. Check: `node -v`
- A Gmail (or other SMTP) account if you want the contact form to deliver email.

## Install (Windows PowerShell)
```powershell
cd path\to\portfolio
cd client;  npm install; cd ..
cd server;  npm install; cd ..
Copy-Item client\.env.example client\.env
Copy-Item server\.env.example server\.env
```
Then edit `server\.env` (see Email setup below).

## Run (two separate PowerShell terminals)
Terminal 1 — API:
```powershell
cd path\to\portfolio\server
npm run dev
```
Terminal 2 — frontend:
```powershell
cd path\to\portfolio\client
npm run dev
```
Open http://localhost:5173. API health check: http://localhost:5000/api/health

## Email setup
Fill `server/.env`: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`.
For Gmail: turn on 2-Step Verification, create an App Password at https://myaccount.google.com/apppasswords, and use it as `SMTP_PASS`.
`/api/health` shows `"emailConfigured": true` once the three required variables are set.
If they are not set, the form returns a clear "not configured" error instead of pretending to send.
**Send yourself a test message through the form before you publish.** Delivery has not been tested against a real mailbox.

## Tests
```powershell
cd server; npm test      # API: validation, honeypot, 503 when unconfigured, mail success/failure
cd ..\client; npm test   # form validation
```

## Placeholders you MUST replace
| Where | What |
|---|---|
| `client/public/resume.pdf` | Add your resume here (served at `/resume.pdf`) |
| `client/public/profile.svg` | Replace with your photo (or change `site.profileImage` in content.js, e.g. `/me.jpg`) |
| `client/public/logo.svg` | Optional: replace logo |
| `client/public/fonts/*.woff2` | Alliance font files (licensed, not bundled; see `fonts/README.txt`). System sans is used until then |
| `content.js` → `social.linkedin` | Your LinkedIn URL |
| `content.js` → `social.email` | `mailto:you@example.com` |
| `content.js` → `social.leetcode` | Your LeetCode URL |
| `content.js` → `skills` | Remove/confirm every skill; items marked `[EDIT ...]` |
| `content.js` → `projects` | Fill IoT, Android, ML/DL descriptions; set exact Extinct-API repo link |
| `content.js` → `education[0].grade` | Official MSc CGPA |
| `content.js` → B.Sc. grade | Verify 8.71 CGPA against your marksheet |
| `server/.env` | SMTP credentials, `CONTACT_TO`, `CLIENT_ORIGIN` (your deployed site URL) |
| `client/.env` | `VITE_API_URL` (your deployed API URL) |

## Build and deploy

**Frontend (static):** set `VITE_API_URL` to the deployed API URL, then:
```powershell
cd client
npm run build
```
Upload `client/dist` to Netlify, Vercel, Cloudflare Pages, or GitHub Pages. On Netlify/Vercel: root `client`, build command `npm run build`, output `dist`, and add `VITE_API_URL` as an environment variable (it is baked in at build time).

**Backend (Express):** deploy `server/` to Render, Railway, or Fly.io as a Node web service.
- Build: `npm install`; Start: `npm start`
- Set env vars from `server/.env.example` in the host dashboard (never commit `.env`).
- Set `CLIENT_ORIGIN` to your frontend URL (comma-separate multiple), e.g. `https://vimal.netlify.app`.
- If behind a proxy (Render, etc.) and rate limiting looks wrong, add `app.set("trust proxy", 1)` in `server/src/app.js`.

## Troubleshooting
- **Form says "Could not reach the server"**: API not running, wrong `VITE_API_URL`, or CORS. Restart the client after editing `.env`.
- **CORS error in console**: `CLIENT_ORIGIN` must exactly match the site origin (no trailing slash).
- **503 "not configured"**: SMTP variables missing in `server/.env`.
- **502 "Could not send"**: wrong app password, or the provider blocked login; check the server terminal log.
- **429 / "Too many messages"**: limit is 5 per 15 minutes per IP.
- **PowerShell blocks scripts**: run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- **Port in use**: change `PORT` in `server/.env`, and `VITE_API_URL` to match.
