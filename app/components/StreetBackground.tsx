/**
 * Risograph colour field behind the whole site: six drifting ink blooms under a
 * blueprint grid, halftone dots and film grain.
 *
 * Server component on purpose — it renders once and animates entirely in CSS,
 * so nothing runs on the main thread and nothing recalculates per scroll frame.
 *
 * Placement, colour and drift live in globals.css (.aurora-1 … .aurora-6),
 * along with the contrast budget that ties --aurora-alpha, --aurora-veil and
 * --muted-foreground together.
 */
export default function StreetBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="aurora">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
        <div className="aurora-blob aurora-4" />
        <div className="aurora-blob aurora-5" />
        <div className="aurora-blob aurora-6" />
      </div>

      {/* Washes the colour field back toward the page colour — this is what
          keeps text legible no matter how many blooms overlap. */}
      <div className="aurora-veil" />

      {/* Print texture, stacked over the colour */}
      <div className="bg-halftone absolute inset-0 opacity-[0.06]" />
      <div className="bg-grid absolute inset-0" />
      <div className="bg-grain absolute inset-0 mix-blend-overlay" />
    </div>
  )
}
