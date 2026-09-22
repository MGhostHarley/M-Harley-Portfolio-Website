import { useId, useRef, type ReactNode } from 'react'
import ContactForm from './ContactForm'
import { buttonStyles } from './styles'
import { CloseIcon } from './icons'
import { OpenContactContext, useOpenContact } from '../contact'

interface ContactButtonProps {
  label?: ReactNode
  variant?: keyof typeof buttonStyles
}

/** A button that opens the page's contact dialog. */
export function ContactButton({
  label = (
    <>
      Send me a message <span aria-hidden="true">→</span>
    </>
  ),
  variant = 'primary',
}: ContactButtonProps) {
  const openContact = useOpenContact()
  return (
    <button
      type="button"
      className={buttonStyles[variant]}
      onClick={openContact}
    >
      {label}
    </button>
  )
}

/**
 * The page's one contact dialog. Every ContactButton inside it opens the same
 * form, so a draft started from one button is still there from another.
 */
export default function ContactDialog({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  // Only a press that starts and ends on the backdrop closes the dialog, so
  // selecting text and releasing outside it doesn't.
  const pressedBackdrop = useRef(false)
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
    <OpenContactContext value={open}>
      {children}
      {/* showModal() traps focus, closes on Escape, and returns focus to the button that opened it. */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- Escape already closes the dialog; the backdrop click is its pointer equivalent. */}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        // Events whose target is the dialog element itself are on the backdrop.
        onPointerDown={(event) => {
          pressedBackdrop.current = event.target === event.currentTarget
        }}
        onClick={(event) => {
          if (pressedBackdrop.current && event.target === event.currentTarget)
            close()
        }}
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
    </OpenContactContext>
  )
}
