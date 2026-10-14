import { nav, social, site } from "../data/content.js";

const icons = {
  github: "M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z",
  linkedin: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z",
  email: "M2 5h20v14H2V5zm2 2v.5l8 5.5 8-5.5V7H4zm16 3.4-8 5.5-8-5.5V17h16v-6.6z",
  leetcode: "M13.48 2.2 4.6 11.1a3.3 3.3 0 0 0 0 4.7l4.2 4.2a3.3 3.3 0 0 0 4.7 0l2.5-2.5-1.5-1.5-2.5 2.5a1.2 1.2 0 0 1-1.7 0l-4.2-4.2a1.2 1.2 0 0 1 0-1.7l8.9-8.9-1.5-1.5zM14 11h7v2h-7v-2z",
};
const labels = { github: "GitHub", linkedin: "LinkedIn", email: "Email", leetcode: "LeetCode" };

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-5 text-center">
        <p className="font-bold">{site.name}</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:underline underline-offset-4">{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex gap-5">
          {Object.keys(icons).map((k) => (
            <li key={k}>
              <a
                href={social[k]}
                aria-label={labels[k]}
                title={labels[k]}
                {...(k !== "email" && { target: "_blank", rel: "noopener noreferrer" })}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-black" aria-hidden="true">
                  <path d={icons[k]} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-neutral-500">© 2026 Vimal Mudalagi. All rights reserved.</p>
      </div>
    </footer>
  );
}
