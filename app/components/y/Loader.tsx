"use client"

import { useRef, useState } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"
import { useLanguage } from "@/app/hooks/useLanguage"

export const INTRO_DONE = "y:intro-done"
const SEEN_KEY = "y:intro-seen"

/** Fires the event late-joiners can also read, so nothing waits forever. */
function announce() {
  ;(window as unknown as { __yIntroDone?: boolean }).__yIntroDone = true
  window.dispatchEvent(new Event(INTRO_DONE))
}

export default function Loader() {
  const { t } = useLanguage()
  const root = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  // Rendering nothing on repeat visits would still flash on first paint, so the
  // decision is made before paint in the layout effect below.
  const [skip, setSkip] = useState(false)

  useIsomorphicLayoutEffect(() => {
    const el = root.current
    if (!el) return

    const seen = sessionStorage.getItem(SEEN_KEY) === "1"
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (seen || reduced) {
      setSkip(true)
      announce()
      return
    }

    sessionStorage.setItem(SEEN_KEY, "1")
    document.body.style.overflow = "hidden"
    window.scrollTo(0, 0)

    // A curtain that fails to lift locks the whole site behind a blank panel,
    // so its removal can never depend on the animation actually finishing.
    const lift = () => {
      document.body.style.overflow = ""
      announce()
      setSkip(true)
    }
    const safety = window.setTimeout(lift, 6000)

    const ctx = gsap.context(() => {
      const counter = { v: 0 }
      const tl = gsap.timeline({
        onComplete: () => {
          window.clearTimeout(safety)
          ScrollTrigger.refresh()
          lift()
        },
      })

      tl.to(counter, {
        v: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0")
          }
        },
      })
        .from(".loader-word", { yPercent: 110, stagger: 0.08, duration: 0.9 }, 0.25)
        .to(".loader-word", { yPercent: -110, stagger: 0.05, duration: 0.7 }, "+=0.1")
        .to(".loader-count", { opacity: 0, duration: 0.4 }, "<")
        // The panel leaves as a curtain rather than a fade so the hero underneath
        // reads as arriving, not as having been there all along.
        .to(el, { yPercent: -100, duration: 1.1, ease: "y-out" }, "-=0.25")
    }, el)

    return () => {
      window.clearTimeout(safety)
      document.body.style.overflow = ""
      ctx.revert()
    }
  }, [])

  if (skip) return null

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-[hsl(var(--violet))] px-[var(--gutter)] py-8 text-[hsl(var(--background))]"
    >
      <span className="t-label loader-count">
        <span ref={countRef}>000</span> / 100
      </span>

      <h2 className="t-display t-huge">
        {t.name.split(" ").map((word) => (
          <span key={word} className="block overflow-hidden">
            <span className="loader-word block">{word}</span>
          </span>
        ))}
      </h2>

      <span className="t-label loader-count">{t.hero.role}</span>
    </div>
  )
}
