"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { Observer } from "gsap/Observer"
import { CustomEase } from "gsap/CustomEase"

/**
 * Single registration point. Registering the same plugin twice is harmless but
 * doing it per-component makes it easy to forget one and get a silent no-op.
 * Guarded because Next re-executes modules on the server during RSC rendering.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Observer, CustomEase)

  // The house curve: fast out, long settle. Everything scroll-driven uses it.
  CustomEase.create("y-out", "0.16, 1, 0.3, 1")

  gsap.defaults({ ease: "y-out", duration: 1 })
}

/**
 * Resolve a design token to a literal colour GSAP can tween.
 *
 * GSAP parses colour strings itself and has no CSS engine, so `hsl(var(--x))`
 * reaches its parser unresolved, fails to match, and throws. Tokens must be
 * read off the computed style first.
 */
export function tokenColor(name: string, fallback = "#ffffff"): string {
  if (typeof window === "undefined") return fallback
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return raw ? `hsl(${raw})` : fallback
}

export { gsap, ScrollTrigger, SplitText, Observer, CustomEase }
