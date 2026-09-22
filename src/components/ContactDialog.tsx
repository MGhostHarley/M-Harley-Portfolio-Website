import { useId, useRef, type ReactNode } from 'react'
import ContactForm from './ContactForm'
import { buttonStyles } from './styles'
import { CloseIcon } from './icons'

interface ContactDialogProps {
  /** Text on the button that opens the dialog. */
  label?: ReactNode
  variant?: keyof typeof buttonStyles
}

/** A button that opens the contact form in a modal dialog. */
export default function ContactDialog({
  label = (
    <>
      Send me a message <span aria-hidden="true">→</span>
    </>
  ),
  variant = 'primary',
}: ContactDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const open = () => {
    const dialog = dialogRef.current
    if (!dialog) return
    dialog.showModal()
    // Start in the first field rather than on the Close button.
    dialog
      .querySelector<HTMLInputElement>('input[autocomplete="name"]')
      ?.focus()
  }
  const close = () => dialogRef.current?.close()
  return (
    <>
      <button type="button" className={buttonStyles[variant]} onClick={open}>
        {label}
      </button>
      {/* showModal() traps focus, closes on Escape, and returns focus to the button. */}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="m-auto w-[min(100%-2rem,560px)] rounded-2xl border border-line bg-dialog p-0 text-snow backdrop:bg-night/80 backdrop:backdrop-blur-sm"
      >
        <div className="p-6 md:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 id={titleId} className="text-2xl font-bold tracking-tight">
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
        </div>
      </dialog>
    </>
  )
}
