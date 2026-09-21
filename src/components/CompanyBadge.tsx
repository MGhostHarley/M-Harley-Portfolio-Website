import { companyLogos } from '../data/impact'

/** A company's logo tile and name. */
export default function CompanyBadge({ company }: { company: string }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img
        src={companyLogos[company]}
        alt=""
        width="96"
        height="96"
        className="size-6 rounded-md"
      />
      <span className="font-semibold text-accent">{company}</span>
    </span>
  )
}
