import { useEffect, useState } from 'react'

/**
 * Returns the id of the section crossing the middle of the viewport.
 * `ids` must be a stable array (for example, defined at module level).
 */
export default function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>()
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const { isIntersecting, target } of entries)
          setActive((current) =>
            isIntersecting
              ? target.id
              : current === target.id
                ? undefined
                : current,
          )
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    for (const id of ids) {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [ids])
  return active
}
