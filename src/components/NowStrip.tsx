import { currentStack, profile } from '../data/profile'
import { experiences } from '../data/experience'
import TechChip from './TechChip'

/** The current role, with its stack highlighted. */
export default function NowStrip() {
  const current = experiences[0]
  return (
    <div className="border-y border-line bg-strip">
      <div className="page flex flex-wrap items-center gap-x-7 gap-y-3 py-5">
        <span className="flex items-center gap-3">
          <span
            className="size-2 rounded-full bg-live shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-live)_15%,transparent)]"
            aria-hidden="true"
          />
          <span className="text-sm font-semibold text-live">Now</span>
        </span>
        <p className="min-w-0 flex-[1_1_16rem]">
          <strong className="font-semibold">{current.company}</strong>
          <span className="text-muted"> · {profile.currentContext}</span>
        </p>
        <ul className="flex flex-wrap gap-2" aria-label="Current stack">
          {currentStack.map((technology) => (
            <li key={technology}>
              <TechChip name={technology} tone="neutral" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
