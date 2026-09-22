import type { CaseStudy as CaseStudyData, DiagramNode } from '../data/types'
import TechChip from './TechChip'
import { companyLogos } from '../data/impact'
import { panelStyles } from './styles'

const nodeStyles: Record<NonNullable<DiagramNode['kind']> | 'default', string> =
  {
    default: 'border-accent/40 bg-accent/5',
    ai: 'border-coral/60 bg-coral/10',
    store: 'border-dashed border-accent/40 bg-accent/5',
  }

const columns = [
  { key: 'problem', label: 'Problem', border: 'border-accent' },
  { key: 'approach', label: 'Approach', border: 'border-accent' },
  { key: 'outcome', label: 'Outcome', border: 'border-gold' },
] as const

function Diagram({ rows }: { rows: CaseStudyData['diagram'] }) {
  return (
    <figure className={`${panelStyles} p-6 md:p-7`}>
      <figcaption className="mb-5 flex justify-between font-mono text-xs tracking-widest text-faint uppercase">
        <span>Architecture</span>
        <span>Simplified</span>
      </figcaption>
      <div className="grid gap-5">
        {rows.map(({ label, nodes }) => (
          <div key={label ?? nodes[0].title}>
            {label && (
              <p className="mb-2 font-mono text-xs text-faint">{label}</p>
            )}
            <ol className="flex flex-col items-stretch md:flex-row md:items-center">
              {nodes.map(({ title, detail, kind }, index) => (
                <li
                  key={title}
                  className="flex flex-col items-center md:flex-1 md:flex-row"
                >
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="px-2 py-1 text-faint max-md:rotate-90 md:py-0"
                    >
                      →
                    </span>
                  )}
                  <div
                    className={`w-full rounded-xl border p-3.5 text-center ${nodeStyles[kind ?? 'default']}`}
                  >
                    <b className="block text-[0.95rem] font-semibold">
                      {title}
                    </b>
                    <span className="mt-1 block font-mono text-xs text-muted">
                      {detail}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </figure>
  )
}

export default function CaseStudy(study: CaseStudyData) {
  const {
    id,
    sector,
    title,
    company,
    detail,
    period,
    result,
    diagram,
    keyDecision,
    stack,
  } = study
  return (
    <article
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 border-b border-line pb-18 not-last:mb-18 last:border-0"
    >
      <header className="grid gap-x-10 gap-y-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="eyebrow text-sm">{sector}</p>
          <h2
            id={`${id}-title`}
            className="mt-2.5 text-[length:clamp(1.9rem,3.4vw,2.6rem)] leading-tight font-bold tracking-tight"
          >
            {title}
          </h2>
          <p className="mt-3 flex items-center gap-3 text-muted">
            <img
              src={companyLogos[company]}
              alt=""
              width="96"
              height="96"
              className="size-9 rounded-lg"
            />
            <span>
              <span className="block font-semibold text-accent">{company}</span>
              <span className="text-sm">
                {[detail, period].filter(Boolean).join(' · ')}
              </span>
            </span>
          </p>
        </div>
        <p className="border-l-2 border-gold pl-4 lg:mb-1 lg:min-w-44">
          <span className="block text-3xl font-bold tracking-tight text-gold">
            {result.value}
          </span>
          <span className="text-sm text-muted">{result.label}</span>
        </p>
      </header>

      <dl className="my-9 grid gap-6 md:grid-cols-3">
        {columns.map(({ key, label, border }) => (
          <div key={key} className={`border-t-2 pt-3.5 ${border}`}>
            <dt className="mb-2.5 font-mono text-xs tracking-widest text-muted uppercase">
              {label}
            </dt>
            <dd className="text-body">{study[key]}</dd>
          </div>
        ))}
      </dl>

      <Diagram rows={diagram} />

      <div className="mt-6 rounded-2xl border border-gold/40 bg-gold/5 p-6">
        <p className="eyebrow text-xs text-gold">Key decision</p>
        <h3 className="mt-2.5 text-lg font-semibold text-snow">
          {keyDecision.title}
        </h3>
        <p className="mt-1.5 text-body">{keyDecision.detail}</p>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
        {stack.map((technology) => (
          <li key={technology}>
            <TechChip name={technology} />
          </li>
        ))}
      </ul>
    </article>
  )
}
