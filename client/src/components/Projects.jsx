import Section from "./Section.jsx";
import { projects } from "../data/content.js";

function ProjectItem({ title, description, tech = [], github, demo }) {
  return (
    <article className="border-t border-neutral-200 py-6 first:border-t-0 first:pt-0">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 max-w-2xl text-neutral-800">{description}</p>
      <p className="mt-2 text-sm text-neutral-500">{tech.join(" · ")}</p>
      {(github || demo) && (
        <p className="mt-3 flex gap-4 text-sm font-medium">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              GitHub
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              Demo
            </a>
          )}
        </p>
      )}
    </article>
  );
}

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div>
        {projects.map((p) => (
          <ProjectItem key={p.title} {...p} />
        ))}
      </div>
    </Section>
  );
}
