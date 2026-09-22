import Section from './Section'
import CompanyBadge from './CompanyBadge'
import TechChip from './TechChip'
import { caseStudies } from '../data/caseStudies'
import { aiHighlights, scaleHighlights } from '../data/impact'
import { panelStyles, textLinkStyles } from './styles'

const aiCaseStudies = new Set(aiHighlights.map((item) => item.caseStudyId))

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
          Read all case studies <span aria-hidden="true">→</span>
        </a>
      }
    >
      {/* The first case study leads: full width on tablets, a tall left
          column beside the other two on wide screens. */}
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {caseStudies.map((study, index) => {
          const { id, company, detail, title, result, problem } = study
          const lead = index === 0
          return (
            <li
              key={id}
              className={
                lead ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
              }
            >
              {/* Named by its result and title, not the whole card's text. */}
              <a
                href={`/case-studies/#${id}`}
                aria-labelledby={`${id}-card-result ${id}-card-title`}
                className={`${panelStyles} group flex h-full flex-col p-6 transition-colors hover:border-accent/50 md:p-7 ${lead ? 'lg:p-10' : ''}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <CompanyBadge company={company} />
                  {aiCaseStudies.has(id) && (
                    <span className="rounded-full border border-coral/40 px-2.5 py-0.5 text-xs font-semibold text-coral">
                      AI
                    </span>
                  )}
                </div>
                {lead && detail && (
                  <p className="mt-1.5 text-sm text-muted">{detail}</p>
                )}
                <p
                  className={`mt-6 leading-none font-semibold tracking-tight text-gold ${lead ? 'text-[2.4rem] md:text-5xl' : 'text-[2.4rem]'}`}
                  id={`${id}-card-result`}
                >
                  {result.value}
                </p>
                <p className="mt-2 text-sm text-muted">{result.label}</p>
                <h3
                  className={`mt-6 mb-6 border-t border-line pt-5 leading-snug font-semibold ${lead ? 'text-xl md:text-2xl' : 'text-xl'}`}
                  id={`${id}-card-title`}
                >
                  {title}
                </h3>
                {lead && (
                  <>
                    <p className="-mt-3 mb-6 max-w-[46ch] text-body">
                      {problem}
                    </p>
                    {/* The wide lead card has room for more of the story; phones get the short version. */}
                    <p className="mb-6 max-w-[46ch] text-body max-md:hidden">
                      <span className="font-semibold text-gold">
                        Key decision:
                      </span>{' '}
                      {study.keyDecision.title}
                    </p>
                    <ul
                      className="mb-8 flex flex-wrap gap-1.5 max-md:hidden"
                      aria-label="Technologies"
                    >
                      {study.stack.map((technology) => (
                        <li key={technology}>
                          <TechChip name={technology} tone="neutral" />
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <span className="mt-auto text-sm text-accent group-hover:underline">
                  Read the case study <span aria-hidden="true">→</span>
                </span>
              </a>
            </li>
          )
        })}
      </ul>

      <div className="mt-6 flex flex-col gap-x-10 gap-y-4 rounded-2xl border border-line px-6 py-5 md:flex-row md:flex-wrap md:items-center md:px-7">
        <span className="text-sm font-semibold text-muted">
          More results at scale
        </span>
        {scaleHighlights.map(({ value, label, company }) => (
          <p
            key={label}
            className="flex flex-wrap items-center gap-x-3 gap-y-1"
          >
            <span className="text-2xl font-semibold tracking-tight text-gold">
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
