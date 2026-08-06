export function SiteWatermark() {
  return (
    <p
      aria-hidden
      className="pointer-events-none fixed z-[40] hidden select-none text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/20 sm:block md:text-[11px]"
      style={{
        bottom: 'max(1rem, env(safe-area-inset-bottom))',
        right: 'max(1rem, env(safe-area-inset-right))',
      }}
    >
      designed &amp; developed by{' '}
      <span className="text-accent/45">ABHISHEK</span>
    </p>
  )
}
