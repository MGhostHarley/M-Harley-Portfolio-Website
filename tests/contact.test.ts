import { describe, expect, it } from 'vitest'
import { toTemplateParams, validateContact } from '../src/utils/contact'
import { profile } from '../src/data/profile'

describe('validateContact', () => {
  it('rejects empty and whitespace-only required fields', () => {
    const { errors } = validateContact({ name: ' ', email: '', message: '\n' })
    expect(Object.keys(errors)).toEqual(['name', 'email', 'message'])
  })

  it('rejects malformed emails and oversized messages', () => {
    const { errors } = validateContact({
      name: 'Em',
      email: 'invalid@',
      message: 'x'.repeat(5001),
    })
    expect(errors.email).toBeDefined()
    expect(errors.message).toBeDefined()
  })

  it('trims valid input', () => {
    const result = validateContact({
      name: ' Ada ',
      email: ' ada@example.com ',
      message: ' Hello ',
    })
    expect(result.errors).toEqual({})
    expect(result.data).toEqual({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'Hello',
    })
  })
})

describe('toTemplateParams', () => {
  it('maps form values to the EmailJS template variables', () => {
    expect(
      toTemplateParams({
        name: 'Ada',
        email: 'ada@example.com',
        message: 'Hello',
      }),
    ).toEqual({
      from_name: 'Ada',
      from_email: 'ada@example.com',
      message: 'Hello',
      to_name: profile.preferredName,
    })
  })
})
