import { useState } from "react";
import { site, nav, social } from "../data/content.js";

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-3 font-bold" onClick={close}>
          <img src={site.logo} alt="" className="h-8 w-8 rounded-full border border-black" />
          {site.name}
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-6 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:underline underline-offset-4">{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-black px-4 py-1.5 text-sm font-medium hover:bg-black hover:text-white sm:inline-block"
          >
            GitHub Profile
          </a>
          <button
            type="button"
            className="rounded border border-neutral-300 px-3 py-1.5 text-sm md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-neutral-200 md:hidden">
          <ul className="mx-auto flex max-w-5xl flex-col px-5 py-2">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={close} className="block py-2.5">{n.label}</a>
              </li>
            ))}
            <li>
              <a href={social.github} target="_blank" rel="noopener noreferrer" className="block py-2.5 font-medium">
                GitHub Profile
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
