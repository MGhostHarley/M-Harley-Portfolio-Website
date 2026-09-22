import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import ContactDialog from '../components/ContactDialog'
import { faqGroups } from '../data/faqs'
import { panelStyles } from '../components/styles'
import { PlusIcon } from '../components/icons'

const groupId = (index: number) => `faq-group-${index + 1}`

export default function FaqPage() {
  return (
    <Layout currentPage="/faq/">
      <PageHeader title="Questions I get asked">
        Quick answers about me, my work, and how to get in touch.
      </PageHeader>

      <div className="page grid grid-cols-1 gap-14 py-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:py-20">
        <nav aria-label="FAQ topics" className="max-lg:hidden">
          <ol className="sticky top-24 grid gap-1 border-l border-line">
            {faqGroups.map(({ title }, index) => (
              <li key={title}>
                <a
                  href={`#${groupId(index)}`}
                  className="-ml-px block border-l border-transparent py-2.5 pl-4.5 text-muted hover:border-accent hover:text-snow"
                >
                  {title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid min-w-0 gap-14">
          {faqGroups.map(({ title, faqs }, index) => (
            <section
              key={title}
              id={groupId(index)}
              aria-labelledby={`${groupId(index)}-title`}
              className="scroll-mt-24"
            >
              <h2
                id={`${groupId(index)}-title`}
                className="mb-5 text-xl font-semibold tracking-tight"
              >
                {title}
              </h2>
              <div
                className={`${panelStyles} divide-y divide-line overflow-hidden`}
              >
                {faqs.map(({ question, answer }) => (
                  <details key={question} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-lg font-medium transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                      {question}
                      <span
                        aria-hidden="true"
                        className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-accent transition-transform group-open:rotate-45"
                      >
                        <PlusIcon />
                      </span>
                    </summary>
                    <p className="max-w-[68ch] px-6 pb-6 text-body">{answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}

          <section
            aria-labelledby="faq-contact"
            className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-line bg-surface p-7"
          >
            <div>
              <h2
                id="faq-contact"
                className="text-2xl font-bold tracking-tight"
              >
                Still have a question?
              </h2>
              <p className="mt-1 text-muted">
                Ask me directly and I'll get back to you.
              </p>
            </div>
            <ContactDialog />
          </section>
        </div>
      </div>
    </Layout>
  )
}
