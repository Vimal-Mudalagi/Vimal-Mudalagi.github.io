import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 100, email: 254, subject: 150, message: 5000 };
const MIN_FILL_MS = 2000; // forms submitted faster than this are treated as bots

export function buildTransporter(env = process.env) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export function validate(body = {}) {
  const errors = {};
  const clean = {};
  for (const key of Object.keys(LIMITS)) {
    clean[key] = typeof body[key] === "string" ? body[key].trim() : "";
    if (!clean[key]) errors[key] = "Required";
    else if (clean[key].length > LIMITS[key]) errors[key] = "Too long";
  }
  if (!errors.email && !EMAIL_RE.test(clean.email)) errors.email = "Invalid email";
  if (!errors.message && clean.message.length < 10) errors.message = "At least 10 characters";
  return { errors, clean };
}

export function createApp({
  transporter = buildTransporter(),
  env = process.env,
  rateLimitMax = 5,
} = {}) {
  const app = express();
  app.use(express.json({ limit: "20kb" }));
  app.use(
    cors({ origin: (env.CLIENT_ORIGIN || "http://localhost:5173").split(",") })
  );

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", emailConfigured: Boolean(transporter) });
  });

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many messages. Please try again later." },
  });

  app.post("/api/contact", limiter, async (req, res) => {
    const { website, startedAt } = req.body || {};

    // Spam checks: honeypot field + too-fast submission. Pretend success to bots.
    const tooFast = Number.isFinite(Number(startedAt)) && Date.now() - Number(startedAt) < MIN_FILL_MS;
    if (website || tooFast) return res.json({ ok: true });

    const { errors, clean } = validate(req.body);
    if (Object.keys(errors).length) {
      return res.status(400).json({ error: "Please check the form fields.", fields: errors });
    }

    if (!transporter) {
      return res.status(503).json({
        error: "Email delivery is not configured on the server yet. Please email me directly.",
      });
    }

    try {
      await transporter.sendMail({
        from: env.MAIL_FROM || env.SMTP_USER,
        to: env.CONTACT_TO || env.SMTP_USER,
        replyTo: clean.email,
        subject: `[Portfolio] ${clean.subject}`,
        text: `From: ${clean.name} <${clean.email}>\n\n${clean.message}`,
      });
      return res.json({ ok: true });
    } catch (err) {
      console.error("Mail error:", err.message);
      return res.status(502).json({ error: "Could not send your message. Please try again later." });
    }
  });

  return app;
}
