import Section from './Section'
import ExternalLink from './ExternalLink'
import { projects } from '../data/projects'
import type { Project } from '../data/types'
import { textLinkStyles } from './styles'

function ProjectCard({
  name,
  description,
  tags,
  image,
  demo,
  source,
}: Project) {
  const links = [
    {
      label: 'Live demo',
      url: demo,
      unavailable: 'Live demo temporarily unavailable.',
    },
    {
      label: 'Source code',
      url: source,
      unavailable: 'Source repository is private.',
    },
  ]
  const previewUrl = demo ?? source
  const preview = (
    <img
      src={image}
      alt={`${name} application preview`}
      width="960"
      height="540"
      loading="lazy"
      decoding="async"
      className="aspect-video h-auto w-full rounded-[10px] bg-surface-sunken object-contain"
    />
  )
  return (
    <article className="rounded-2xl bg-surface-raised p-5">
      {previewUrl ? (
        <ExternalLink
          href={previewUrl}
          aria-label={`Open ${name} ${demo ? 'demo' : 'source'} (new tab)`}
        >
          {preview}
        </ExternalLink>
      ) : (
        preview
      )}
      <h3 className="mt-5.5 mb-3 text-[1.5rem] font-bold">{name}</h3>
      <p className="my-4 leading-[1.7] text-muted">{description}</p>
      <ul
        className="my-4 flex flex-wrap gap-3.5 text-accent"
        aria-label="Technologies"
      >
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-3 md:gap-4">
        {links.map(({ label, url, unavailable }) =>
          url ? (
            <ExternalLink
              key={label}
              className={textLinkStyles}
              href={url}
              aria-label={`View ${name} ${label.toLowerCase()} (new tab)`}
            >
              {label} ↗
            </ExternalLink>
          ) : (
            <span key={label} className="text-[0.85rem] text-muted">
              {unavailable}
            </span>
          ),
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <Section
      id="projects"
      title="My Work"
      intro="Selected personal projects, with live demos and public source code where available."
    >
      <div className="mt-9 grid grid-cols-1 gap-7 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </Section>
  )
}
