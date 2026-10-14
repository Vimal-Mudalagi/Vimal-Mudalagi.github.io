import Section from "./Section.jsx";
import { education } from "../data/content.js";

export default function Education() {
  return (
    <Section id="education" title="Education">
      <ol>
        {education.map((e) => (
          <li key={e.school + e.degree} className="border-t border-neutral-200 py-5 first:border-t-0 first:pt-0">
            <h3 className="font-bold">{e.school}</h3>
            <p>{e.degree}</p>
            <p className="text-sm text-neutral-500">
              {e.period} · {e.grade}
            </p>
            {e.note && <p className="mt-2 max-w-2xl text-sm text-neutral-800">{e.note}</p>}
          </li>
        ))}
      </ol>
    </Section>
  );
}
