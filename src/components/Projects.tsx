import Section from './Section'
import ExternalLink from './ExternalLink'
import { projects } from '../data/projects'
import type { Project } from '../data/types'

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
    />
  )
  return (
    <article className="project-card">
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
      <h3>{name}</h3>
      <p>{description}</p>
      <ul className="project-tags" aria-label="Technologies">
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className="project-links">
        {links.map(({ label, url, unavailable }) =>
          url ? (
            <ExternalLink
              key={label}
              className="text-link"
              href={url}
              aria-label={`View ${name} ${label.toLowerCase()} (new tab)`}
            >
              {label} ↗
            </ExternalLink>
          ) : (
            <span key={label}>{unavailable}</span>
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
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </Section>
  )
}
