import type { ContactForm } from './contact'
import { toTemplateParams } from './contact'

// EmailJS identifiers are public browser values, not secrets. Override in .env.local.
const env = import.meta.env
const serviceId = env.VITE_EMAILJS_SERVICE_ID || 'service_3baipf2'
const templateId = env.VITE_EMAILJS_TEMPLATE_ID || 'template_4ug1zkf'
const publicKey = env.VITE_EMAILJS_PUBLIC_KEY || 'x_rj_SWg5AokCeduj'
const SEND_TIMEOUT_MS = 12_000

export class EmailTimeoutError extends Error {
  constructor() {
    super('The message request timed out.')
    this.name = 'EmailTimeoutError'
  }
}

async function withTimeout<T>(request: Promise<T>, timeoutMs: number) {
  let timeoutId: number | undefined
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = window.setTimeout(
      () => reject(new EmailTimeoutError()),
      timeoutMs,
    )
  })
  try {
    return await Promise.race([request, timeout])
  } finally {
    if (timeoutId !== undefined) window.clearTimeout(timeoutId)
  }
}

export async function sendContactEmail(data: ContactForm) {
  // Loaded on demand so the SDK stays out of the initial bundle.
  const { default: emailjs } = await import('@emailjs/browser')
  await withTimeout(
    emailjs.send(serviceId, templateId, toTemplateParams(data), {
      publicKey,
      limitRate: { id: 'portfolio-contact', throttle: 10_000 },
    }),
    SEND_TIMEOUT_MS,
  )
}
