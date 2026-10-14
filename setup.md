# Project Setup

## Requirements

Install Node.js 18 or newer:

```powershell
node -v
npm -v
```

## Install

Run these commands from the project root:

```powershell
cd "C:\Users\viaml\OneDrive\Desktop\portfolio\portfolio"
npm run install:all
Copy-Item client\.env.example client\.env
Copy-Item server\.env.example server\.env
```

## Start the project

Open two PowerShell terminals.

### Terminal 1: API server

```powershell
cd "C:\Users\viaml\OneDrive\Desktop\portfolio\portfolio\server"
npm run dev
```

API: http://localhost:5000

### Terminal 2: frontend

```powershell
cd "C:\Users\viaml\OneDrive\Desktop\portfolio\portfolio\client"
npm run dev
```

Website: http://localhost:5173

## Test and build

```powershell
cd "C:\Users\viaml\OneDrive\Desktop\portfolio\portfolio"
npm test

cd client
npm run build
```

The contact form needs SMTP values in `server/.env`. Add your resume at `client/public/resume.pdf` if you want the Resume link to work.
