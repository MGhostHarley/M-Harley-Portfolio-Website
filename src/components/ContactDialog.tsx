import { useRef } from 'react'
import ContactForm from './ContactForm'
import { buttonStyles } from './styles'
import { CloseIcon } from './icons'

/** A button that opens the contact form in a modal dialog. */
export default function ContactDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const close = () => dialogRef.current?.close()
  return (
    <>
      <button
        type="button"
        className={buttonStyles.primary}
        onClick={() => dialogRef.current?.showModal()}
      >
        Send me a message <span aria-hidden="true">→</span>
      </button>
      {/* showModal() traps focus, closes on Escape, and returns focus to the button. */}
      <dialog
        ref={dialogRef}
        aria-labelledby="contact-dialog-title"
        className="m-auto w-[min(100%-2rem,560px)] rounded-2xl border border-line bg-dialog p-0 text-snow backdrop:bg-night/80 backdrop:backdrop-blur-sm"
      >
        <div className="p-6 md:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2
                id="contact-dialog-title"
                className="text-2xl font-bold tracking-tight"
              >
                Send me a message
              </h2>
              <p className="mt-1 text-sm text-muted">
                I usually reply within a couple of days.
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="grid size-11 shrink-0 place-items-center rounded-full border border-line hover:border-accent"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>
          <ContactForm />
          <p className="mt-2 text-xs text-faint">
            Messages are delivered through EmailJS. Your name, email, and
            message are only used to reply to you.
          </p>
        </div>
      </dialog>
    </>
  )
}
