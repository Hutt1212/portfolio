"use client"

import { motion } from "framer-motion"
import SplitLines from "./SplitLines"

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Poster-style section masthead: index number, hairline rule and a huge title.
 */
export default function SectionHead({
  index,
  label,
  title,
  accent = "volt",
  action,
}: {
  index: string
  label: string
  title: string
  accent?: "volt" | "flare" | "cobalt"
  action?: React.ReactNode
}) {
  const dot =
    accent === "flare" ? "bg-flare" : accent === "cobalt" ? "bg-cobalt" : "bg-volt"

  return (
    <div className="mb-9 md:mb-14">
      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ transformOrigin: "left" }}
        className="flex items-center gap-3 border-b-2 border-foreground pb-3 md:border-b-[3px]"
      >
        <span className={`h-2.5 w-2.5 shrink-0 ${dot}`} />
        <span className="t-tag">{index}</span>
        <span className="t-tag text-muted-foreground">/ {label}</span>
      </motion.div>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 md:mt-7">
        <h2 className="font-display t-huge max-w-[16ch]">
          <SplitLines lines={[title]} delay={0.08} />
        </h2>

        {action && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
          >
            {action}
          </motion.div>
        )}
      </div>
    </div>
  )
}
