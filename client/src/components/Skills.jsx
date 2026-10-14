import Section from "./Section.jsx";
import { skills } from "../data/content.js";

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="grid gap-8 sm:grid-cols-2">
        {skills.map(({ group, items }) => (
          <div key={group}>
            <dt className="mb-2 font-bold">{group}</dt>
            <dd>
              <ul className="space-y-1 text-neutral-800">
                {items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
