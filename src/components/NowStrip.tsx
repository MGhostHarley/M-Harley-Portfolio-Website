import { currentStack, profile } from '../data/profile'
import { experiences } from '../data/experience'

/** The current role, with its stack highlighted. */
export default function NowStrip() {
  const current = experiences[0]
  return (
    <div className="border-y border-line bg-[rgb(10_8_30/60%)]">
      <div className="page flex flex-wrap items-center gap-x-7 gap-y-3 py-5">
        <span className="flex items-center gap-3">
          <span
            className="size-2 rounded-full bg-live shadow-[0_0_0_4px_rgb(94_230_168/15%)]"
            aria-hidden="true"
          />
          <span className="eyebrow text-sm text-live">Now</span>
        </span>
        <p className="min-w-0 flex-[1_1_16rem]">
          <strong className="font-semibold">{current.company}</strong>
          <span className="text-muted"> · {profile.currentContext}</span>
        </p>
        <ul className="flex flex-wrap gap-2" aria-label="Current stack">
          {currentStack.map((technology) => (
            <li
              key={technology}
              className="rounded-full border border-accent/60 bg-accent/15 px-3 py-1 font-mono text-[0.8rem] font-medium text-accent shadow-[0_0_14px_rgb(112_215_250/20%)]"
            >
              {technology}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
