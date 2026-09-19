import { useState } from 'react'

// Storage can be unavailable (private mode, blocked site data); fall back to memory.
function read(key: string) {
  try {
    return sessionStorage.getItem(key) === 'true'
  } catch {
    return false
  }
}

/** A boolean that survives navigating between pages in the same tab. */
export default function useStoredToggle(key: string) {
  const [value, setValue] = useState(() => read(key))
  const toggle = () => {
    setValue(!value)
    try {
      sessionStorage.setItem(key, String(!value))
    } catch {
      // Keep the in-memory value only.
    }
  }
  return [value, toggle] as const
}
