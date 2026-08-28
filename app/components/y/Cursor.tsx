"use client"

import { useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"

/**
 * A difference-blended dot that trails the pointer and swells over anything
 * marked `data-cursor`. Pointer-driven only — never shown on touch (see CSS).
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const el = dot.current
    if (!el) return
    if (window.matchMedia("(pointer: coarse)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0 })

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" })
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" })

    let entered = false
    const onMove = (e: PointerEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      if (!entered) {
        entered = true
        gsap.to(el, { scale: 1, duration: 0.4 })
      }
    }

    // Delegated so elements added later (or swapped by route changes) still work.
    const onOver = (e: PointerEvent) => {
      const hit = (e.target as HTMLElement)?.closest?.("[data-cursor]")
      gsap.to(el, { scale: hit ? 3.4 : 1, duration: 0.45 })
    }

    const onLeave = () => {
      entered = false
      gsap.to(el, { scale: 0, duration: 0.3 })
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerover", onOver, { passive: true })
    document.addEventListener("pointerleave", onLeave)

    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerover", onOver)
      document.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <div ref={dot} aria-hidden className="cursor-dot">
      <div className="h-3 w-3 rounded-full bg-white" />
    </div>
  )
}
