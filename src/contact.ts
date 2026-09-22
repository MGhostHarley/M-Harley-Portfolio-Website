import { createContext, useContext } from 'react'

/** Opens the page's one contact dialog, so every "contact" button shares one draft. */
export const OpenContactContext = createContext<() => void>(() => {})

export function useOpenContact() {
  return useContext(OpenContactContext)
}
