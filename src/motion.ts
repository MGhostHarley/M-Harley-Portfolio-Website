import { createContext, useContext } from 'react'

/** Whether decorative animation may run: false when paused or reduced motion is preferred. */
export const MotionContext = createContext(true)

export function useMotionEnabled() {
  return useContext(MotionContext)
}
