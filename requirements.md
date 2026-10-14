# Requirements

## Features
- Single page with anchor navigation, smooth scrolling, mobile menu
- Sections: header, hero (rotating roles), About, Skills, Projects, Education, Contact, footer
- Monochrome design (black on white), Alliance font with system-sans fallback
- All content in one file (`client/src/data/content.js`); reusable project/education entries
- Contact form: client + server validation, honeypot, minimum-fill-time check, rate limit (5 / 15 min / IP), clear success and error messages

## Architecture
- `client/`: React 18 + Vite 5 + Tailwind CSS 4 (static build)
- `server/`: Express 4 API. `POST /api/contact`, `GET /api/health`. Mail via Nodemailer (SMTP)
- Client talks to the API via `VITE_API_URL`; no secrets in the frontend

## Dependencies
- Client: react, react-dom; dev: vite, @vitejs/plugin-react, tailwindcss, @tailwindcss/vite, vitest
- Server: express, cors, express-rate-limit, nodemailer, dotenv (tests use built-in `node:test`)

## Environment variables
| File | Variable | Purpose |
|---|---|---|
| client/.env | `VITE_API_URL` | API base URL |
| server/.env | `PORT` | API port (default 5000) |
| server/.env | `CLIENT_ORIGIN` | Allowed CORS origin(s), comma-separated |
| server/.env | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Email delivery (host, user, pass required) |
| server/.env | `CONTACT_TO`, `MAIL_FROM` | Recipient / sender (default to `SMTP_USER`) |

## Known limitations
- Alliance font is licensed and not bundled; fallback font is used until you add the files
- Email delivery is untested against a real mailbox; you must send a test message
- Rate limiting is in-memory (resets on restart; per-instance)
- Spam protection is basic (honeypot, timing, rate limit); no CAPTCHA
- Skills/project text contains `[EDIT]` placeholders you must confirm
- B.Sc. CGPA (8.71) is taken from the old portfolio and unverified
- Client tests cover validation only; no browser/E2E tests
