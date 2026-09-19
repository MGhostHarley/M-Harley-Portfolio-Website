import Section from './Section'
import CompanyBadge from './CompanyBadge'
import { caseStudies } from '../data/caseStudies'
import { scaleHighlights } from '../data/impact'
import { panelStyles, textLinkStyles } from './styles'

/** The headline results, each leading into the case study behind it. */
export default function SelectedWork() {
  return (
    <Section
      id="work"
      eyebrow="Case studies"
      title="Problems I've solved"
      aside={
        <a className={textLinkStyles} href="/case-studies/">
          Read all case studies →
        </a>
      }
    >
      <ul className="grid gap-5 md:grid-cols-3">
        {caseStudies.map(({ id, company, title, result }) => (
          <li key={id}>
            <a
              href={`/case-studies/#${id}`}
              className={`${panelStyles} group flex h-full flex-col p-7 transition-colors hover:border-accent/50`}
            >
              <CompanyBadge company={company} />
              <p className="mt-6 text-[2.4rem] leading-none font-semibold tracking-tight text-gold">
                {result.value}
              </p>
              <p className="mt-2 text-sm text-muted">{result.label}</p>
              <h3 className="mt-6 mb-6 border-t border-line pt-5 text-xl leading-snug font-semibold">
                {title}
              </h3>
              <span className="mt-auto text-sm text-accent group-hover:underline">
                Read the case study →
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4 rounded-2xl border border-line px-7 py-5">
        <span className="font-mono text-xs tracking-widest text-faint uppercase">
          Also at scale
        </span>
        {scaleHighlights.map(({ value, label, company }) => (
          <p
            key={label}
            className="flex flex-wrap items-center gap-x-3 gap-y-1"
          >
            <span className="text-2xl font-semibold tracking-tight">
              {value}
            </span>
            <span className="text-muted">{label}</span>
            <CompanyBadge company={company} />
          </p>
        ))}
      </div>
    </Section>
  )
}
