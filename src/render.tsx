import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

/** Mounts a page into #root; each HTML entry point calls this once. */
export function renderPage(page: ReactNode) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>{page}</StrictMode>,
  )
}
