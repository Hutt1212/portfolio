"use client"

import { motion } from "framer-motion"
import { useAppReady } from "@/app/hooks/useAppReady"

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Above-the-fold entrance. Unlike the `whileInView` reveals further down the
 * page, this content is already on screen at load — so it waits for the
 * preloader to lift instead of animating behind it and arriving pre-settled.
 */
export default function Rise({
  children,
  delay = 0,
  y = 40,
  duration = 0.8,
  className,
  as = "div",
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  duration?: number
  className?: string
  as?: "div" | "dl" | "h1"
}) {
  const ready = useAppReady()
  const Component = motion[as]

  return (
    <Component
      initial={{ opacity: 0, y }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, ease: EASE, delay }}
      className={className}
    >
      {children}
    </Component>
  )
}
