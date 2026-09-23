import { aiHighlights } from '../data/impact'

// Work with its own case study is tagged "AI" in Selected Work, not retold here.
const described = aiHighlights.filter((item) => !item.caseStudyId)

/** Production AI work, shown under the experience list. */
export default function AiInProduction() {
  return (
    <section
      aria-labelledby="ai-heading"
      className="mt-14 rounded-2xl border border-coral/40 bg-surface p-6 md:p-9"
    >
      <h3
        id="ai-heading"
        className="max-w-[34em] text-2xl leading-snug font-bold tracking-tight md:text-3xl"
      >
        I put <span className="text-coral">AI</span> where it changes an
        outcome, and I measure it by the result.
      </h3>
      <dl className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
        {described.map(({ title, detail, company }) => (
          <div key={title} className="flex flex-col">
            <dt className="text-xl font-semibold text-snow">{title}</dt>
            <dd className="mt-1.5 leading-relaxed text-body">{detail}</dd>
            <dd className="mt-2 text-sm text-muted">{company}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
