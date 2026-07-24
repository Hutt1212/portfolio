"use client"

type Variant = "ink" | "volt" | "flare" | "paper"

const VARIANTS: Record<Variant, string> = {
  ink: "bg-foreground text-background",
  volt: "bg-volt text-volt-foreground",
  flare: "bg-flare text-flare-foreground",
  paper: "bg-background text-foreground",
}

/**
 * Edge-to-edge scrolling band. The item list is rendered twice and the track is
 * translated by exactly -50%, so the loop is seamless at any width.
 */
export default function Ticker({
  items,
  speed = 30,
  reverse = false,
  variant = "ink",
  className = "",
}: {
  items: string[]
  speed?: number
  reverse?: boolean
  variant?: Variant
  className?: string
}) {
  const group = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="font-display t-mid whitespace-nowrap px-4 py-2.5 md:px-7 md:py-3.5">
            {item}
          </span>
          <span className="text-[0.7em] opacity-60">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <div
      aria-hidden
      className={`relative w-full select-none overflow-hidden border-y-2 border-foreground md:border-y-[3px] ${VARIANTS[variant]} ${className}`}
    >
      <div
        className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Three copies, shifted by one third — see the keyframe comment. */}
        {group}
        {group}
        {group}
      </div>
    </div>
  )
}
