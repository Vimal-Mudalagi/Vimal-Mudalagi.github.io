import { test } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";

const valid = {
  name: "Test User",
  email: "test@example.com",
  subject: "Hello",
  message: "This is a valid test message.",
  website: "",
  startedAt: Date.now() - 10_000,
};

async function withServer(opts, fn) {
  const server = createApp({ rateLimitMax: 100, ...opts }).listen(0);
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    await fn(base);
  } finally {
    server.close();
  }
}

const post = (base, body) =>
  fetch(`${base}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

test("health endpoint reports email config state", async () => {
  await withServer({ transporter: null }, async (base) => {
    const res = await fetch(`${base}/api/health`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { status: "ok", emailConfigured: false });
  });
});

test("rejects invalid input with field errors", async () => {
  await withServer({ transporter: null }, async (base) => {
    const res = await post(base, { ...valid, email: "nope", message: "short" });
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.ok(data.fields.email && data.fields.message);
  });
});

test("returns 503 when email is not configured", async () => {
  await withServer({ transporter: null }, async (base) => {
    const res = await post(base, valid);
    assert.equal(res.status, 503);
  });
});

test("honeypot submissions are silently dropped, nothing sent", async () => {
  let sent = 0;
  const transporter = { sendMail: async () => void sent++ };
  await withServer({ transporter }, async (base) => {
    const res = await post(base, { ...valid, website: "http://spam.example" });
    assert.equal(res.status, 200);
    assert.equal(sent, 0);
  });
});

test("sends mail when configured", async () => {
  let mail;
  const transporter = { sendMail: async (m) => void (mail = m) };
  await withServer({ transporter, env: { CONTACT_TO: "me@example.com" } }, async (base) => {
    const res = await post(base, valid);
    assert.equal(res.status, 200);
    assert.equal(mail.to, "me@example.com");
    assert.equal(mail.replyTo, valid.email);
  });
});

test("returns 502 when the mail transport fails", async () => {
  const transporter = { sendMail: async () => { throw new Error("boom"); } };
  await withServer({ transporter }, async (base) => {
    const res = await post(base, valid);
    assert.equal(res.status, 502);
  });
});
