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
      title="Problems I've solved"
      aside={
        <a
          className={`inline-flex min-h-11 items-center ${textLinkStyles}`}
          href="/case-studies/"
        >
          Read all case studies →
        </a>
      }
    >
      {/* The first case study leads: full width on tablets, a tall left
          column beside the other two on wide screens. */}
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr]">
        {caseStudies.map(({ id, company, title, result, problem }, index) => {
          const lead = index === 0
          return (
            <li
              key={id}
              className={
                lead ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
              }
            >
              <a
                href={`/case-studies/#${id}`}
                className={`${panelStyles} group flex h-full flex-col p-6 transition-colors hover:border-accent/50 md:p-7 ${lead ? 'lg:p-10' : ''}`}
              >
                <CompanyBadge company={company} />
                <p
                  className={`mt-6 leading-none font-semibold tracking-tight text-gold ${lead ? 'text-[2.4rem] md:text-5xl' : 'text-[2.4rem]'}`}
                >
                  {result.value}
                </p>
                <p className="mt-2 text-sm text-muted">{result.label}</p>
                <h3
                  className={`mt-6 mb-6 border-t border-line pt-5 leading-snug font-semibold ${lead ? 'text-xl md:text-2xl' : 'text-xl'}`}
                >
                  {title}
                </h3>
                {lead && (
                  <p className="-mt-3 mb-6 max-w-[46ch] text-body">{problem}</p>
                )}
                <span className="mt-auto text-sm text-accent group-hover:underline">
                  Read the case study →
                </span>
              </a>
            </li>
          )
        })}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4 rounded-2xl border border-line px-7 py-5">
        <span className="text-sm font-semibold text-muted">Also at scale</span>
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
