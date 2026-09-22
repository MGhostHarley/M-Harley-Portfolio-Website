import { useState } from 'react'

// Storage can be unavailable (private mode, blocked site data); fall back to memory.
function read(key: string, fallback: number, min: number, max: number) {
  try {
    const saved = Number(localStorage.getItem(key) ?? NaN)
    return Number.isFinite(saved)
      ? Math.min(max, Math.max(min, saved))
      : fallback
  } catch {
    return fallback
  }
}

/** A number between min and max that the viewer's browser remembers. */
export default function useStoredNumber(
  key: string,
  fallback: number,
  { min = 0, max = 1 } = {},
) {
  const [value, setValue] = useState(() => read(key, fallback, min, max))
  const update = (next: number) => {
    setValue(next)
    try {
      localStorage.setItem(key, String(next))
    } catch {
      // Keep the in-memory value only.
    }
  }
  return [value, update] as const
}
