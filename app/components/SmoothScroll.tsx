"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { MotionConfig } from "framer-motion"

/**
 * Desktop-only smooth scrolling. Touch devices keep their native momentum
 * scrolling (which is smoother and cheaper than emulating it), and users who
 * ask for reduced motion get the browser default.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (isTouch || reduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  // `reducedMotion="user"` makes every framer-motion animation on the site obey
  // the OS setting. The CSS rule in globals.css only covers CSS animations —
  // JS-driven transforms would otherwise ignore the preference entirely.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
