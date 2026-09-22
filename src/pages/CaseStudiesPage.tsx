import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import CaseStudy from '../components/CaseStudy'
import ContactDialog from '../components/ContactDialog'
import { caseStudies } from '../data/caseStudies'
import { companyLogos } from '../data/impact'
import { profile } from '../data/profile'
import useActiveSection from '../hooks/useActiveSection'

const studyIds = caseStudies.map((study) => study.id)

export default function CaseStudiesPage() {
  const active = useActiveSection(studyIds) ?? studyIds[0]
  return (
    <Layout currentPage="/case-studies/">
      <PageHeader title="How I build production systems">
        <strong className="font-medium text-snow">{profile.name}</strong>,{' '}
        {profile.title.toLowerCase()}. Three systems I built, how I approached
        them, and what changed as a result.
      </PageHeader>

      <div className="page grid grid-cols-1 gap-14 pt-14 lg:grid-cols-[220px_1fr] lg:pt-16">
        <nav aria-label="Case studies" className="max-lg:hidden">
          <div className="sticky top-24">
            <p className="text-sm font-semibold text-muted">Case studies</p>
            <ol className="mt-4 border-l border-line">
              {caseStudies.map(({ id, title, company }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? 'location' : undefined}
                    className="-ml-px flex gap-3 border-l-2 border-transparent py-2.5 pl-4.5 text-[0.92rem] leading-snug text-muted hover:text-snow aria-[current=location]:border-accent aria-[current=location]:text-snow"
                  >
                    <img
                      src={companyLogos[company]}
                      alt=""
                      width="96"
                      height="96"
                      className="mt-0.5 size-5 shrink-0 rounded"
                    />
                    <span>
                      {title}
                      <small className="mt-0.5 block text-xs text-faint">
                        {company}
                      </small>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div>
          {caseStudies.map((study) => (
            <CaseStudy key={study.id} {...study} />
          ))}
          <section
            aria-labelledby="case-studies-contact"
            className="mt-4 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-line bg-surface p-7"
          >
            <div>
              <h2
                id="case-studies-contact"
                className="text-2xl font-bold tracking-tight"
              >
                Want to go deeper on any of these?
              </h2>
              <p className="mt-1 text-muted">
                I'm happy to walk through the trade-offs in more detail.
              </p>
            </div>
            <ContactDialog />
          </section>
        </div>
      </div>
    </Layout>
  )
}
