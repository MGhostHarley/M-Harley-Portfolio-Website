// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import { act } from 'react'
import userEvent from '@testing-library/user-event'
import ContactDialog, { ContactButton } from '../src/components/ContactDialog'
import ContactForm from '../src/components/ContactForm'
import PhotoCarousel from '../src/components/PhotoCarousel'
import { MotionContext } from '../src/motion'
import { photos } from '../src/data/photos'
import { resumeUrl } from '../src/data/profile'
import Layout from '../src/components/Layout'
import PauseButton from '../src/components/PauseButton'
import Navbar from '../src/components/Navbar'
import TechChip from '../src/components/TechChip'
import About from '../src/components/About'
import { skillGroups } from '../src/data/skills'
import { EmailTimeoutError, sendContactEmail } from '../src/utils/sendEmail'

const luminance = (channels: number[]) => {
  const [r, g, b] = channels.map((channel) => {
    const value = channel / 255
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

describe('TechChip', () => {
  it.each(['Kafka', 'Next.js', 'Python'])(
    'keeps the %s brand label readable on a tinted dark badge',
    (name) => {
      render(<TechChip name={name} />)
      const chip = screen.getByText(name)
      const foreground = chip.style
        .getPropertyValue('--brand')
        .match(/\d+/g)
        ?.map(Number)
      expect(foreground).toHaveLength(3)
      const background = foreground!.map((channel, index) =>
        Math.round(0.9 * [5, 8, 22][index] + 0.1 * channel),
      )
      const contrast =
        (luminance(foreground!) + 0.05) / (luminance(background) + 0.05)
      expect(contrast).toBeGreaterThanOrEqual(4.5)
    },
  )
})

describe('About skills', () => {
  it.each(skillGroups.map((group) => [group.name, group.skills.length]))(
    'shows at most 5 %s skills before "+N more" when there are more than 6',
    (name, count) => {
      render(<About />)
      const group = within(screen.getByRole('region', { name }))
      const [firstList] = group.getAllByRole('list')
      if (count > 6) {
        expect(within(firstList).getAllByRole('listitem')).toHaveLength(5)
        expect(group.getByText(`+${count - 5} more`)).toBeTruthy()
      } else {
        expect(within(firstList).getAllByRole('listitem')).toHaveLength(count)
        expect(group.queryByText(/more$/)).toBeNull()
      }
    },
  )
})

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
    // A timed-out message may still arrive, so sending again is blocked.
    ['a timeout', new EmailTimeoutError(), 'may still arrive', true],
    ['a failure', new Error('Unavailable'), 'could not be sent', false],
  ])(
    'explains %s without clearing the message',
    async (_, error, text, blocked) => {
      vi.mocked(sendContactEmail).mockRejectedValue(error)
      const logError = vi.spyOn(console, 'error').mockImplementation(() => {})
      const user = userEvent.setup()
      render(<ContactForm />)

      await fillAndSubmit(user)

      await waitFor(() =>
        expect(screen.getByRole('status').textContent).toContain(text),
      )
      // The way forward is a real link, not just the word "LinkedIn".
      expect(
        screen.getByRole('link', { name: /Message me on LinkedIn/ }),
      ).toBeTruthy()
      expect(
        screen.getByLabelText<HTMLTextAreaElement>('Your message').value,
      ).toBe('Hello Em')
      expect(logError).toHaveBeenCalledWith(
        'Contact form: message not sent',
        error,
      )
      expect(
        screen.getByRole<HTMLButtonElement>('button', { name: 'Send message' })
          .disabled,
      ).toBe(blocked)
    },
  )

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

describe('PauseButton', () => {
  it('reports its state and toggles', async () => {
    const onToggle = vi.fn()
    const user = userEvent.setup()
    const { rerender } = render(
      <PauseButton paused={false} onToggle={onToggle} />,
    )

    const button = screen.getByRole('button', {
      name: 'Pause motion and photos',
    })
    expect(button.getAttribute('aria-pressed')).toBe('false')
    await user.click(button)
    expect(onToggle).toHaveBeenCalledOnce()

    rerender(<PauseButton paused onToggle={onToggle} />)
    expect(
      screen
        .getByRole('button', { name: 'Resume motion and photos' })
        .getAttribute('aria-pressed'),
    ).toBe('true')
  })
})

describe('Navbar links', () => {
  it('offers the resume as a download and marks the current page', () => {
    render(<Navbar currentPage="/case-studies/" />)
    const resume = screen.getByRole('link', { name: /Resume/ })
    expect(resume.getAttribute('href')).toBe(resumeUrl)
    expect(resume.hasAttribute('download')).toBe(true)
    expect(
      screen
        .getByRole('link', { name: 'Case studies' })
        .getAttribute('aria-current'),
    ).toBe('page')
  })
})

describe('ContactDialog', () => {
  it('gives every contact button on a page the same form', () => {
    render(
      <ContactDialog>
        <ContactButton label="Get in touch" />
        <ContactButton />
      </ContactDialog>,
    )
    expect(screen.getAllByLabelText('Your name')).toHaveLength(1)
  })

  it('opens the contact form as a modal', async () => {
    // jsdom has <dialog> but not showModal/close.
    HTMLDialogElement.prototype.showModal = vi.fn(function (
      this: HTMLDialogElement,
    ) {
      this.open = true
    })
    HTMLDialogElement.prototype.close = vi.fn(function (
      this: HTMLDialogElement,
    ) {
      this.open = false
    })
    const user = userEvent.setup()
    render(
      <ContactDialog>
        <ContactButton />
      </ContactDialog>,
    )

    await user.click(screen.getByRole('button', { name: /Send me a message/ }))
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledOnce()
    expect(screen.getByLabelText('Your name')).toBeTruthy()

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalledOnce()
  })
})

describe('PhotoCarousel', () => {
  const visibleAlt = () =>
    screen
      .getAllByRole('img', { hidden: true })
      .find((img) => img.getAttribute('aria-hidden') === 'false')
      ?.getAttribute('alt')

  it('advances every 15 seconds and jumps to a chosen photo', () => {
    vi.useFakeTimers()
    render(<PhotoCarousel />)
    expect(visibleAlt()).toBe(photos[0].alt)

    act(() => vi.advanceTimersByTime(14_000))
    expect(visibleAlt()).toBe(photos[0].alt)
    act(() => vi.advanceTimersByTime(1_000))
    expect(visibleAlt()).toBe(photos[1].alt)

    fireEvent.click(
      screen.getByRole('button', { name: `Show photo 4 of ${photos.length}` }),
    )
    expect(visibleAlt()).toBe(photos[3].alt)
    vi.useRealTimers()
  })

  it('only loads the photo on show and the next one', () => {
    vi.useFakeTimers()
    render(<PhotoCarousel />)
    const loaded = () => screen.getAllByRole('img', { hidden: true }).length
    expect(loaded()).toBe(2)
    act(() => vi.advanceTimersByTime(15_000))
    expect(loaded()).toBe(3)
    vi.useRealTimers()
  })

  it('holds the photo while focus is inside it', () => {
    vi.useFakeTimers()
    render(<PhotoCarousel />)
    const dot = screen.getByRole('button', {
      name: `Show photo 1 of ${photos.length}`,
    })

    act(() => dot.focus())
    act(() => vi.advanceTimersByTime(30_000))
    expect(visibleAlt()).toBe(photos[0].alt)

    act(() => dot.blur())
    act(() => vi.advanceTimersByTime(15_000))
    expect(visibleAlt()).toBe(photos[1].alt)
    vi.useRealTimers()
  })

  it('stays on one photo when animation is paused', () => {
    vi.useFakeTimers()
    render(
      <MotionContext value={false}>
        <PhotoCarousel />
      </MotionContext>,
    )
    act(() => vi.advanceTimersByTime(60_000))
    expect(visibleAlt()).toBe(photos[0].alt)
    vi.useRealTimers()
  })
})

describe('Layout', () => {
  it('scrolls to the section named in the URL once the page renders', () => {
    // Arriving at /#experience from another page.
    window.history.replaceState(null, '', '/#experience')
    const scrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoView
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe = vi.fn()
        disconnect = vi.fn()
      },
    )
    vi.stubGlobal('matchMedia', () => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    render(
      <Layout>
        <section id="experience">Experience</section>
      </Layout>,
    )
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'instant' })
    window.history.replaceState(null, '', '/')
  })
})

describe('Layout with a malformed URL fragment', () => {
  it('renders instead of crashing', () => {
    window.history.replaceState(null, '', '/#%E0%A4%A')
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
    vi.stubGlobal('matchMedia', () => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    render(
      <Layout>
        <p>Still here</p>
      </Layout>,
    )
    expect(screen.getByText('Still here')).toBeTruthy()
    window.history.replaceState(null, '', '/')
  })
})
