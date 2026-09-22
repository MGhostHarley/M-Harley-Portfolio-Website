import { aiHighlights } from '../data/impact'

/** Production AI work, shown under the experience list. */
export default function AiInProduction() {
  return (
    <section
      aria-labelledby="ai-heading"
      className="mt-14 rounded-2xl border border-violet/40 bg-[linear-gradient(135deg,rgb(193_118_223/16%),rgb(112_215_250/6%))] p-7 md:p-9"
    >
      <p className="eyebrow text-sm text-violet">AI in production</p>
      <h3
        id="ai-heading"
        className="mt-3 max-w-[34em] text-2xl leading-snug font-bold tracking-tight md:text-3xl"
      >
        I put AI where it changes an outcome, and I measure it by the result.
      </h3>
      <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {aiHighlights.map(({ title, detail, company }) => (
          <div
            key={title}
            className="flex flex-col border-l-2 border-violet/60 pl-4"
          >
            <dt className="text-xl font-semibold text-snow">{title}</dt>
            <dd className="mt-1.5 text-sm leading-normal text-body">
              {detail}
            </dd>
            <dd className="mt-2 font-mono text-xs text-accent">{company}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
