import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import {
  maxLengths,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactForm as ContactValues,
} from '../utils/contact'
import { EmailTimeoutError, sendContactEmail } from '../utils/sendEmail'
import { buttonStyles } from './styles'

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
  'block w-full rounded-lg border border-faint/60 bg-night/60 px-4 py-3 text-snow focus:border-accent aria-[invalid=true]:border-error'

const emptyForm: ContactValues = { name: '', email: '', message: '' }

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
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>({ type: 'idle', message: '' })
  // A ref, not state, so a rapid double submit can't slip past before re-render.
  const inFlight = useRef(false)
  const sending = status.type === 'sending'
  const blocked = sending || status.type === 'timedOut'

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => ({ ...previous, [name]: undefined }))
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
      className={className}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={sending}
    >
      <div
        className="absolute -left-[10000px] size-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="contact-honeypot">Leave this field empty</label>
        <input
          id="contact-honeypot"
          name={HONEYPOT_NAME}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {fields.map(({ name, label, type, autoComplete }) => {
        const error = errors[name]
        const errorId = `${name}-error`
        const inputProps = {
          id: `contact-${name}`,
          name,
          value: values[name],
          onChange: handleChange,
          required: true,
          maxLength: maxLengths[name],
          disabled: sending,
          'aria-invalid': Boolean(error),
          'aria-describedby': error ? errorId : undefined,
        }
        return (
          <div className="mb-6" key={name}>
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
            {error && (
              <p id={errorId} className="mt-2 text-sm text-error">
                {error}
              </p>
            )}
          </div>
        )
      })}
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
    </form>
  )
}
