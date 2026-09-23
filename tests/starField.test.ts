import { describe, expect, it } from 'vitest'
import { parseSavedAngles } from '../src/graphics/starField'

describe('parseSavedAngles', () => {
  it('restores a complete saved sky position', () => {
    expect(
      parseSavedAngles('{"x":1.5,"y":-0.25,"time":1700000000000}'),
    ).toEqual({ x: 1.5, y: -0.25, time: 1700000000000 })
  })

  it.each([
    ['nothing saved', null],
    ['malformed JSON', '{"x":1'],
    ['not an object', '42'],
    ['a missing y', '{"x":1,"time":1}'],
    ['a missing time', '{"x":1,"y":2}'],
    ['a non-numeric y', '{"x":1,"y":"2","time":1}'],
    ['an overflowed value', '{"x":1e999,"y":2,"time":1}'],
  ])('ignores %s, so the sky starts fresh instead of blank', (_, raw) => {
    expect(parseSavedAngles(raw)).toBeUndefined()
  })
})
