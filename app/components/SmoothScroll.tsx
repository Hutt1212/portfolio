"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { registerLenis } from "@/lib/scroll-lock"
import type React from "react"

/**
 * Lenis drives the page, GSAP drives the clock. Running Lenis off its own rAF
 * while ScrollTrigger runs off gsap.ticker puts the two a frame apart, which is
 * exactly how pinned sections end up jittering — so the ticker owns both.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    // Touch devices keep native momentum: it is smoother and cheaper than any
    // emulation, and ScrollTrigger works against native scroll regardless.
    const isTouch = window.matchMedia("(pointer: coarse)").matches
    if (reduced || isTouch) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
    })

    lenis.on("scroll", ScrollTrigger.update)
    registerLenis(lenis)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(500, 33)

    return () => {
      gsap.ticker.remove(tick)
      registerLenis(null)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
