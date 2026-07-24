"use client"

import { motion, type Variants } from "framer-motion"
import { useAppReady } from "@/app/hooks/useAppReady"

const EASE = [0.16, 1, 0.3, 1] as const

const container: Variants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
}

const line: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
}

/**
 * Sliding line reveal for display type.
 *
 * Each line sits in a `.line-mask`, whose clip box is padded beyond the glyph
 * box — without that padding the mask shaves the top off Vietnamese diacritics
 * (Ậ, Ế, Ừ …) and the bottom off the outline stroke.
 */
export default function SplitLines({
  lines,
  className = "",
  lineClassName,
  delay = 0,
  stagger = 0.09,
  immediate = false,
}: {
  lines: string[]
  className?: string
  lineClassName?: (index: number) => string
  delay?: number
  stagger?: number
  /**
   * Play as soon as the preloader lifts, instead of waiting for the section to
   * scroll into view. For headlines that are already above the fold.
   */
  immediate?: boolean
}) {
  const ready = useAppReady()

  const trigger = immediate
    ? { animate: ready ? "show" : "hidden" }
    : { whileInView: "show" as const, viewport: { once: true, margin: "-12%" } }

  return (
    <motion.span
      className={`block ${className}`}
      variants={container}
      custom={stagger}
      initial="hidden"
      transition={{ delayChildren: delay }}
      {...trigger}
    >
      {lines.map((text, i) => (
        <span key={i} className="line-mask">
          <motion.span variants={line} className={`block ${lineClassName?.(i) ?? ""}`}>
            {text}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
