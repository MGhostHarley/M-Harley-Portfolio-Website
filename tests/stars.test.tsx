// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import Stars from '../src/components/Stars'
import { MotionContext } from '../src/motion'

// Stand in for the canvas renderer, so these tests only check when Stars
// starts and stops the animation.
const field = { setAnimating: vi.fn(), dispose: vi.fn() }
vi.mock('../src/graphics/starField', () => ({
  createStarField: () => field,
}))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

const renderStars = (motion: boolean, brightness: number) => (
  <MotionContext value={motion}>
    <Stars brightness={brightness} />
  </MotionContext>
)

describe('Stars', () => {
  it('stops drawing when brightness is zero and resumes above it', () => {
    const { rerender } = render(renderStars(true, 0))
    expect(field.setAnimating).toHaveBeenLastCalledWith(false)

    rerender(renderStars(true, 0.4))
    expect(field.setAnimating).toHaveBeenLastCalledWith(true)
  })

  it('stays still when motion is paused, whatever the brightness', () => {
    render(renderStars(false, 1))
    expect(field.setAnimating).toHaveBeenLastCalledWith(false)
  })

  it('shows its brightness as the canvas opacity', () => {
    const { container } = render(renderStars(true, 0.35))
    expect(container.querySelector('canvas')?.style.opacity).toBe('0.35')
  })
})
