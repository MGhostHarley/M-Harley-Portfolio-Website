import { profile } from '../data/profile'

export const contactFields = ['name', 'email', 'message'] as const

export type ContactField = (typeof contactFields)[number]
export type ContactForm = Record<ContactField, string>
export type ContactErrors = Partial<Record<ContactField, string>>

export const maxLengths: Record<ContactField, number> = {
  name: 100,
  email: 254,
  message: 5000,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Trims every field and returns the trimmed values with any errors. */
export function validateContact(values: Partial<ContactForm>): {
  data: ContactForm
  errors: ContactErrors
} {
  const data: ContactForm = {
    name: values.name?.trim() ?? '',
    email: values.email?.trim() ?? '',
    message: values.message?.trim() ?? '',
  }
  const errors: ContactErrors = {}

  if (!data.name) errors.name = 'Please enter your name.'
  else if (data.name.length > maxLengths.name)
    errors.name = 'Please keep your name under 100 characters.'

  if (!data.email) errors.email = 'Please enter your email address.'
  else if (data.email.length > maxLengths.email)
    errors.email = 'Please use an email address under 254 characters.'
  else if (!data.email.includes('@'))
    errors.email = 'Add the @ and domain, like name@company.com.'
  else if (!EMAIL_PATTERN.test(data.email))
    errors.email = 'Check the part after @, like name@company.com.'

  if (!data.message) errors.message = 'Please enter a message.'
  else if (data.message.length > maxLengths.message)
    errors.message = 'Please keep your message under 5,000 characters.'

  return { data, errors }
}

/** Maps form values to the variables the EmailJS template expects. */
export function toTemplateParams(data: ContactForm) {
  return {
    from_name: data.name,
    from_email: data.email,
    message: data.message,
    to_name: profile.preferredName,
    // No to_email: the EmailJS template has the recipient address set.
  }
}
