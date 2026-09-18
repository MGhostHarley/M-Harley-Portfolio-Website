/** A lightweight visual anchor for the contact section. */
export default function ContactScene() {
  return (
    <div className="-order-1 lg:order-none" aria-hidden="true">
      {/* Smaller below lg, where it sits above the form instead of beside it. */}
      <div className="relative mx-auto grid aspect-square w-full max-w-60 place-items-center overflow-hidden rounded-full bg-[radial-gradient(circle,var(--color-surface-card)_0_18%,var(--color-surface)_19%_36%,transparent_37%)] lg:max-w-90">
        <div className="absolute size-[78%] rounded-full border border-violet/60" />
        <div className="absolute size-[52%] rotate-45 rounded-full border border-accent/50" />
        <div className="absolute size-4 rounded-full bg-accent shadow-[0_0_28px_var(--color-accent)]" />
        <span className="absolute top-[18%] right-[20%] size-2 rounded-full bg-gold" />
        <span className="absolute bottom-[24%] left-[16%] size-3 rounded-full bg-pink" />
      </div>
      {/* Outside the circle so its rounded clipping can't cut the text off. */}
      <p className="mt-4 text-center text-sm tracking-[0.18em] text-balance text-muted uppercase">
        Build thoughtfully · ship reliably
      </p>
    </div>
  )
}
