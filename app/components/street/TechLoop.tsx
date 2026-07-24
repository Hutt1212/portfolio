"use client"

import TechIcon from "./TechIcon"

/**
 * Compact looping row of stack chips. Pauses on hover/focus so a name can
 * actually be read, and freezes entirely under prefers-reduced-motion.
 */
export default function TechLoop({
  items,
  speed = 40,
  reverse = false,
  highlight = false,
}: {
  items: string[]
  speed?: number
  reverse?: boolean
  /** Fill the chips with the accent colour instead of the card surface. */
  highlight?: boolean
}) {
  // Only the first copy is exposed to assistive tech; the rest are duplicates.
  const renderGroup = (duplicate: boolean) => (
    <div
      aria-hidden={duplicate || undefined}
      className="flex shrink-0 items-center gap-2.5 pr-2.5 md:gap-4 md:pr-4"
    >
      {items.map((skill, i) => (
        <span
          key={`${skill}-${i}`}
          className={`slab flex shrink-0 items-center gap-2.5 px-3 py-2.5 md:gap-3 md:px-5 md:py-3.5 ${
            highlight ? "bg-volt text-volt-foreground" : "bg-card"
          }`}
        >
          <TechIcon name={skill} className="h-5 w-5 shrink-0 md:h-7 md:w-7" />
          <span className="font-display whitespace-nowrap text-base leading-[1.15] md:text-xl">
            {skill}
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee-pausable relative w-full select-none overflow-hidden py-1">
      <div
        className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {renderGroup(false)}
        {renderGroup(true)}
        {renderGroup(true)}
      </div>
    </div>
  )
}
