import Section from './Section'
import ExternalLink from './ExternalLink'
import TechChip from './TechChip'
import { projects } from '../data/projects'
import { panelStyles } from './styles'

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Side projects" title="Built for fun">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map(
          ({ id, name, description, tags, image, demo, source }) => (
            <li
              key={id}
              className={`${panelStyles} flex flex-col overflow-hidden`}
            >
              <img
                src={image}
                alt={`${name} application preview`}
                width="960"
                height="540"
                loading="lazy"
                decoding="async"
                className="aspect-video w-full border-b border-line object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-semibold">{name}</h3>
                <p className="mt-1.5 mb-4 text-sm leading-normal text-muted">
                  {description}
                </p>
                <ul
                  className="mb-5 flex flex-wrap gap-1.5"
                  aria-label="Technologies"
                >
                  {tags.map((tag) => (
                    <li key={tag}>
                      <TechChip name={tag} />
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex gap-4 font-mono text-xs">
                  {demo && (
                    <ExternalLink
                      className="text-accent hover:underline"
                      href={demo}
                      aria-label={`${name} live demo (new tab)`}
                    >
                      Live ↗
                    </ExternalLink>
                  )}
                  {source ? (
                    <ExternalLink
                      className="text-accent hover:underline"
                      href={source}
                      aria-label={`${name} source code (new tab)`}
                    >
                      Source ↗
                    </ExternalLink>
                  ) : (
                    <span className="text-faint">Source private</span>
                  )}
                </div>
              </div>
            </li>
          ),
        )}
      </ul>
    </Section>
  )
}
