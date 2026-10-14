import { useEffect, useState } from "react";
import { site, hero } from "../data/content.js";

function useRotating(items, ms = 2500) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % items.length), ms);
    return () => clearInterval(id);
  }, [items.length, ms]);
  return items[i];
}

export default function Hero() {
  const role = useRotating(hero.roles);

  return (
    <section id="top" className="mx-auto grid max-w-5xl items-center gap-10 px-5 py-16 sm:py-24 md:grid-cols-[1.4fr_1fr]">
      <div>
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Hi, I am Vimal Mudalagi
        </h1>
        <p className="mt-4 text-xl font-medium" aria-live="off">
          <span className="text-neutral-500">I am a </span>
          <span className="border-b-2 border-black">{role}</span>
        </p>
        <p className="mt-6 max-w-xl text-neutral-700">{hero.intro}</p>
        <a
          href={site.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-black px-6 py-3 font-medium text-white hover:bg-neutral-800"
        >
          Check Resume
        </a>
      </div>
      <img
        src={site.profileImage}
        alt="Portrait of Vimal Mudalagi"
        className="mx-auto aspect-square w-56 rounded-full border border-black object-cover sm:w-72"
      />
    </section>
  );
}
