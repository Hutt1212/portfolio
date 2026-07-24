"use client"

import { motion } from "framer-motion"

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Page entrance. Timed to land just after TransitionOverlay's blinds pull away,
 * so the new page rises into view rather than being revealed already settled.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}
