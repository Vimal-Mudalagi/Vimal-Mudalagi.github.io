import { useRef, useState } from "react";
import Section from "./Section.jsx";
import { site } from "../data/content.js";
import { validateContact } from "../utils/validate.js";

const empty = { name: "", email: "", subject: "", message: "", website: "" };
const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text" },
];
const inputCls = "mt-1 w-full rounded border border-neutral-300 px-3 py-2 focus:border-black";

export default function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const startedAt = useRef(Date.now());

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus({ state: "sending", message: "" });
    try {
      const res = await fetch(`${site.apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startedAt: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        setStatus({ state: "error", message: data.error || "Something went wrong. Please try again." });
        return;
      }
      setValues(empty);
      startedAt.current = Date.now();
      setStatus({ state: "success", message: "Thanks! Your message has been sent." });
    } catch {
      setStatus({ state: "error", message: "Could not reach the server. Please try again later." });
    }
  }

  return (
    <Section id="contact" title="Contact">
      <form onSubmit={onSubmit} noValidate className="max-w-xl space-y-4">
        {fields.map((f) => (
          <div key={f.name}>
            <label htmlFor={f.name} className="text-sm font-medium">{f.label}</label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              autoComplete={f.autoComplete}
              value={values[f.name]}
              onChange={onChange}
              aria-invalid={Boolean(errors[f.name])}
              aria-describedby={errors[f.name] ? `${f.name}-err` : undefined}
              className={inputCls}
            />
            {errors[f.name] && <p id={`${f.name}-err`} className="mt-1 text-sm text-red-700">{errors[f.name]}</p>}
          </div>
        ))}
        <div>
          <label htmlFor="message" className="text-sm font-medium">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={onChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-err" : undefined}
            className={inputCls}
          />
          {errors.message && <p id="message-err" className="mt-1 text-sm text-red-700">{errors.message}</p>}
        </div>

        {/* Honeypot: hidden from humans; bots tend to fill it */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
        </div>

        <button
          type="submit"
          disabled={status.state === "sending"}
          className="rounded-full bg-black px-6 py-3 font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
        >
          {status.state === "sending" ? "Sending…" : "Send message"}
        </button>

        <p role="status" aria-live="polite" className={`text-sm ${status.state === "error" ? "text-red-700" : ""}`}>
          {status.message}
        </p>
      </form>
    </Section>
  );
}
