// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '../src/components/ContactForm'
import Footer from '../src/components/Footer'
import Navbar from '../src/components/Navbar'
import { EmailTimeoutError, sendContactEmail } from '../src/utils/sendEmail'

// Keep the real module (for EmailTimeoutError) but never send real email.
vi.mock('../src/utils/sendEmail', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../src/utils/sendEmail')>()),
  sendContactEmail: vi.fn(),
}))

class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = '0px'
  readonly scrollMargin = '0px'
  readonly thresholds = [0]
  disconnect = vi.fn()
  observe = vi.fn()
  takeRecords = vi.fn(() => [])
  unobserve = vi.fn()
}

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', IntersectionObserverStub)
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Your name'), 'Ada Lovelace')
  await user.type(screen.getByLabelText('Your email'), 'ada@example.com')
  await user.type(screen.getByLabelText('Your message'), 'Hello Em')
  await user.click(screen.getByRole('button', { name: 'Send message' }))
}

describe('ContactForm', () => {
  it('focuses the first invalid field and explains the problem', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.click(screen.getByRole('button', { name: 'Send message' }))

    expect(document.activeElement).toBe(screen.getByLabelText('Your name'))
    expect(screen.getByText('Please enter your name.')).toBeTruthy()
    expect(sendContactEmail).not.toHaveBeenCalled()
  })

  it('submits valid details and confirms delivery', async () => {
    vi.mocked(sendContactEmail).mockResolvedValue(undefined)
    const user = userEvent.setup()
    render(<ContactForm />)

    await fillAndSubmit(user)

    await waitFor(() => expect(sendContactEmail).toHaveBeenCalledOnce())
    expect(screen.getByRole('status').textContent).toContain(
      'Thanks for your message',
    )
  })

  it.each([
    ['a timeout', new EmailTimeoutError(), 'may still arrive'],
    ['a failure', new Error('Unavailable'), 'could not be sent'],
  ])('explains %s without clearing the message', async (_, error, text) => {
    vi.mocked(sendContactEmail).mockRejectedValue(error)
    const logError = vi.spyOn(console, 'error').mockImplementation(() => {})
    const user = userEvent.setup()
    render(<ContactForm />)

    await fillAndSubmit(user)

    await waitFor(() =>
      expect(screen.getByRole('status').textContent).toContain(text),
    )
    expect(
      screen.getByLabelText<HTMLTextAreaElement>('Your message').value,
    ).toBe('Hello Em')
    expect(logError).toHaveBeenCalledWith(
      'Contact form: message not sent',
      error,
    )
  })

  it('silently accepts honeypot submissions without sending email', async () => {
    const user = userEvent.setup()
    const { container } = render(<ContactForm />)
    const honeypot = container.querySelector<HTMLInputElement>(
      '[name=nickname_confirm]',
    )
    expect(honeypot).toBeTruthy()
    fireEvent.change(honeypot!, { target: { value: 'spam.example' } })
    await user.click(screen.getByRole('button', { name: 'Send message' }))

    expect(sendContactEmail).not.toHaveBeenCalled()
    expect(screen.getByRole('status').textContent).toContain(
      'Thanks for your message',
    )
  })
})

describe('Navbar', () => {
  it('opens from the menu button and closes with Escape', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const button = screen.getByRole('button', { name: 'Open navigation' })

    await user.click(button)
    expect(button.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByRole('link', { name: 'About' })).toBeTruthy()

    await user.keyboard('{Escape}')
    expect(button.getAttribute('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(button)
  })
})

describe('Footer', () => {
  it('exposes animation state and calls the pause control', async () => {
    const onTogglePause = vi.fn()
    const user = userEvent.setup()
    render(
      <Footer
        paused={false}
        reducedMotion={false}
        onTogglePause={onTogglePause}
      />,
    )

    const button = screen.getByRole('button', { name: 'Pause animation' })
    expect(button.getAttribute('aria-pressed')).toBe('false')
    await user.click(button)
    expect(onTogglePause).toHaveBeenCalledOnce()
  })
})
