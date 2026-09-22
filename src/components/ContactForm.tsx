import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from 'react'
import {
  contactFields,
  maxLengths,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactForm as ContactValues,
} from '../utils/contact'
import { EmailTimeoutError, sendContactEmail } from '../utils/sendEmail'
import { buttonStyles, textLinkStyles } from './styles'
import ExternalLink from './ExternalLink'
import { profile } from '../data/profile'

const linkedIn = profile.socials.find(({ icon }) => icon === 'linkedin')?.url

interface Status {
  /** 'timedOut': the message may still arrive, so sending again is blocked. */
  type: 'idle' | 'sending' | 'success' | 'error' | 'timedOut'
  message: string
}

const statusColors: Record<Status['type'], string> = {
  idle: '',
  sending: '',
  success: 'text-live',
  error: 'text-error',
  timedOut: 'text-gold',
}

const inputStyles =
  'block min-h-11 w-full rounded-lg border border-faint/60 bg-night/60 px-4 py-2 text-snow focus:border-accent aria-[invalid=true]:border-error'

const emptyForm: ContactValues = { name: '', email: '', message: '' }

// The draft survives a reload or a phone discarding the tab. Storage can be
// unavailable (private windows, blocked site data), so every access is guarded.
const DRAFT_KEY = 'contact-draft'

function loadDraft(): ContactValues {
  try {
    const saved: unknown = JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? '{}')
    const draft = { ...emptyForm }
    if (saved && typeof saved === 'object')
      for (const field of contactFields) {
        const value = (saved as Record<string, unknown>)[field]
        if (typeof value === 'string') draft[field] = value
      }
    return draft
  } catch {
    return emptyForm
  }
}

function saveDraft(values: ContactValues) {
  try {
    if (Object.values(values).some((value) => value.trim()))
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(values))
    else sessionStorage.removeItem(DRAFT_KEY)
  } catch {
    // Storage unavailable: the draft just won't outlive the page.
  }
}

// Hidden spam trap: people never see it, bots fill it in. The name avoids
// words like "website" or "url" so browser autofill won't fill it either.
const HONEYPOT_NAME = 'nickname_confirm'

const messages = {
  success:
    'Thanks for your message. I will get back to you as soon as possible.',
  invalid: 'Please check the highlighted fields.',
  sending: 'Sending your message…',
  failed:
    'Your message could not be sent. Please try again in a moment, or reach me on LinkedIn.',
  // The request may still complete after we stop waiting, so don't invite a resend.
  timedOut:
    'This is taking longer than expected, and your message may still arrive. Rather than resending, please reach me on LinkedIn.',
}

const fields: {
  name: ContactField
  label: string
  type?: string
  autoComplete?: string
}[] = [
  { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Your email', type: 'email', autoComplete: 'email' },
  { name: 'message', label: 'Your message' },
]

export default function ContactForm({ className }: { className?: string }) {
  const [values, setValues] = useState(loadDraft)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>({ type: 'idle', message: '' })
  const idPrefix = useId()
  const formRef = useRef<HTMLFormElement>(null)
  // A ref, not state, so a rapid double submit can't slip past before re-render.
  const inFlight = useRef(false)
  const sending = status.type === 'sending'
  const blocked = sending || status.type === 'timedOut'
  // When sending fails, the dialog itself offers the way forward.
  const offerLinkedIn =
    status.type === 'timedOut' || status.message === messages.failed

  // Closing the dialog keeps the draft but drops stale errors, so reopening
  // starts clean. (A timed-out send stays blocked on purpose.)
  useEffect(() => saveDraft(values), [values])

  useEffect(() => {
    const dialog = formRef.current?.closest('dialog')
    if (!dialog) return
    const onClose = () => {
      setErrors({})
      setStatus((current) =>
        current.type === 'error' ? { type: 'idle', message: '' } : current,
      )
    }
    dialog.addEventListener('close', onClose)
    return () => dialog.removeEventListener('close', onClose)
  }, [])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
    updateError(name as ContactField, undefined)
  }

  // Sets one field's error, and drops the "check the highlighted fields"
  // status once nothing is highlighted any more.
  const updateError = (name: ContactField, error: string | undefined) => {
    const next = { ...errors, [name]: error }
    setErrors(next)
    if (
      status.message === messages.invalid &&
      !Object.values(next).some(Boolean)
    )
      setStatus({ type: 'idle', message: '' })
  }

  // Check a field once it's filled in and left, so a mistyped email shows
  // before Send. Empty fields wait for submit rather than nagging early.
  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = event.target.name as ContactField
    if (!values[name].trim()) return
    updateError(name, validateContact(values).errors[name])
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inFlight.current || blocked) return

    // Pretend a bot submission succeeded so it has no reason to retry.
    const honeypot = event.currentTarget.elements.namedItem(HONEYPOT_NAME)
    if (honeypot instanceof HTMLInputElement && honeypot.value) {
      setValues(emptyForm)
      setStatus({ type: 'success', message: messages.success })
      return
    }

    const { data, errors: validationErrors } = validateContact(values)
    setErrors(validationErrors)
    const firstInvalid = fields.find(({ name }) => validationErrors[name])
    if (firstInvalid) {
      setStatus({ type: 'error', message: messages.invalid })
      const element = event.currentTarget.elements.namedItem(firstInvalid.name)
      if (element instanceof HTMLElement) element.focus()
      return
    }

    inFlight.current = true
    setStatus({ type: 'sending', message: messages.sending })
    try {
      await sendContactEmail(data)
      setValues(emptyForm)
      setStatus({ type: 'success', message: messages.success })
    } catch (error) {
      // EmailJS rejects with { status, text }; the text names the cause,
      // e.g. an expired Gmail connection in the EmailJS dashboard.
      console.error('Contact form: message not sent', error)
      setStatus(
        error instanceof EmailTimeoutError
          ? { type: 'timedOut', message: messages.timedOut }
          : { type: 'error', message: messages.failed },
      )
    } finally {
      inFlight.current = false
    }
  }

  return (
    <form
      ref={formRef}
      className={className}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={sending}
    >
      <div
        className="absolute -left-[10000px] size-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor={`${idPrefix}-honeypot`}>Leave this field empty</label>
        <input
          id={`${idPrefix}-honeypot`}
          name={HONEYPOT_NAME}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {fields.map(({ name, label, type, autoComplete }) => {
        const error = errors[name]
        const errorId = `${idPrefix}-${name}-error`
        const inputProps = {
          id: `${idPrefix}-${name}`,
          name,
          value: values[name],
          onChange: handleChange,
          onBlur: handleBlur,
          required: true,
          // The message has no hard cap, so a long paste isn't silently cut;
          // validation explains the limit instead.
          maxLength: name === 'message' ? undefined : maxLengths[name],
          disabled: sending,
          'aria-invalid': Boolean(error),
          'aria-describedby': error ? errorId : undefined,
        }
        return (
          <div className="mb-2" key={name}>
            <label htmlFor={inputProps.id} className="mb-2.5 block">
              {label}
            </label>
            {name === 'message' ? (
              <textarea
                {...inputProps}
                rows={6}
                className={`${inputStyles} resize-y`}
              />
            ) : (
              <input
                {...inputProps}
                type={type}
                autoComplete={autoComplete}
                className={inputStyles}
              />
            )}
            {/* Always takes its line, so an error appearing doesn't shift the form. */}
            <p id={errorId} className="mt-1.5 min-h-6 text-sm text-error">
              {error}
            </p>
          </div>
        )
      })}
      <p className="mb-4 text-sm text-faint">
        Messages are delivered through EmailJS. Your name, email, and message
        are only used to reply to you.
      </p>
      <button type="submit" className={buttonStyles.primary} disabled={blocked}>
        {sending ? 'Sending…' : 'Send message'}
      </button>
      <p
        className={`my-4 min-h-[3em] leading-normal ${statusColors[status.type]}`}
        role="status"
        aria-live="polite"
      >
        {status.message}
      </p>
      {offerLinkedIn && linkedIn && (
        <ExternalLink
          href={linkedIn}
          className={`inline-flex min-h-11 items-center ${textLinkStyles}`}
        >
          Message me on LinkedIn <span aria-hidden="true">↗</span>
        </ExternalLink>
      )}
    </form>
  )
}
