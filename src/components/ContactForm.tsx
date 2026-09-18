import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import {
  maxLengths,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactForm as ContactValues,
} from '../utils/contact'
import { sendContactEmail } from '../utils/sendEmail'
import { buttonStyles } from './styles'

interface Status {
  type: 'idle' | 'sending' | 'success' | 'error'
  message: string
}

const statusColors: Record<Status['type'], string> = {
  idle: '',
  sending: '',
  success: 'text-success',
  error: 'text-error',
}

const inputStyles =
  'block w-full rounded-lg border border-line bg-surface-raised px-4 py-3.5 text-snow aria-[invalid=true]:border-error'

const emptyForm: ContactValues = { name: '', email: '', message: '' }

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

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => ({ ...previous, [name]: undefined }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inFlight.current) return

    const { data, errors: validationErrors } = validateContact(values)
    setErrors(validationErrors)
    const firstInvalid = fields.find(({ name }) => validationErrors[name])
    if (firstInvalid) {
      setStatus({
        type: 'error',
        message: 'Please check the highlighted fields.',
      })
      const element = event.currentTarget.elements.namedItem(firstInvalid.name)
      if (element instanceof HTMLElement) element.focus()
      return
    }

    inFlight.current = true
    setStatus({ type: 'sending', message: 'Sending your message…' })
    try {
      await sendContactEmail(data)
      setValues(emptyForm)
      setStatus({
        type: 'success',
        message:
          'Thanks for your message. I will get back to you as soon as possible.',
      })
    } catch {
      setStatus({
        type: 'error',
        message:
          'Your message could not be sent. Please try again or use the email link below.',
      })
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
              <p id={errorId} className="my-4 leading-normal text-error">
                {error}
              </p>
            )}
          </div>
        )
      })}
      <button
        type="submit"
        className={buttonStyles.secondary}
        disabled={sending}
      >
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
