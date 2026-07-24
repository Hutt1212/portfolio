"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { markAppReady } from "@/lib/app-ready"
import { useLanguage } from "@/app/hooks/useLanguage"

const EASE = [0.76, 0, 0.24, 1] as const
const COLUMNS = 5

/** Never hold the screen shorter than this, or the loader just flickers. */
const MIN_MS = 700
/** Never hold it longer than this, whatever the network is doing. */
const MAX_MS = 4000

export default function Preloader() {
  const { t, language } = useLanguage()
  const [show, setShow] = useState(true)
  const [progress, setProgress] = useState(0)

  // Rendered on the server too (initial state is `true`), so the ink panel is
  // in the first paint — no flash of the page before this mounts.
  const target = useRef(0)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setShow(false)
      markAppReady()
      return
    }

    const started = performance.now()
    let raf = 0
    let finished = false

    const bump = (value: number) => {
      target.current = Math.max(target.current, value)
    }

    // Real signals rather than a fake timer: webfonts decoded, then every
    // subresource on the page settled.
    document.fonts?.ready.then(() => bump(55))
    if (document.readyState === "complete") bump(100)
    else window.addEventListener("load", () => bump(100), { once: true })

    const finish = () => {
      if (finished) return
      finished = true
      cancelAnimationFrame(raf)
      setProgress(100)
      // Hand off now, so the hero rises while the panels are still lifting.
      markAppReady()
      setShow(false)
    }

    const hardStop = window.setTimeout(finish, MAX_MS)

    const tick = (now: number) => {
      const elapsed = now - started
      // Asymptotic creep to 90 keeps the number moving on a fast connection
      // where the real signals land almost immediately.
      const creep = (1 - Math.exp(-elapsed / 900)) * 90
      const goal = Math.max(target.current, creep)

      setProgress((prev) => prev + (goal - prev) * 0.12)

      if (target.current >= 100 && elapsed >= MIN_MS) {
        finish()
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(hardStop)
    }
  }, [])

  // Hold the page still while the curtain is up
  useEffect(() => {
    if (!show) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [show])

  const value = Math.min(100, Math.round(progress))

  return (
    <AnimatePresence>
      {show && (
        <div id="preloader" className="fixed inset-0 z-[999999]" aria-hidden>
          {/* Ink panels — same blinds language as the route transition */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: COLUMNS }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: "0%" }}
                exit={{
                  y: "-100%",
                  transition: { duration: 0.62, ease: EASE, delay: 0.05 * i },
                }}
                className="h-full w-full bg-foreground"
              />
            ))}
          </div>

          {/* Texture */}
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />

          {/* Content */}
          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.25, ease: "easeOut" } }}
            className="absolute inset-0 flex flex-col justify-between p-4 text-background sm:p-6 lg:p-10"
          >
            <div className="flex items-center justify-between gap-4 border-b-2 border-background/30 pb-3">
              <span className="t-tag">{t.name}</span>
              <span className="t-tag flex items-center gap-2">
                <span className="animate-blink h-2 w-2 rounded-full bg-volt" />
                {language === "vi" ? "Đang tải" : "Loading"}
              </span>
            </div>

            {/* Wordmark that fills up as the page loads */}
            <div className="relative flex flex-1 items-center justify-center">
              <div className="relative">
                <span className="font-display t-poster block text-background/20">M.HUY</span>
                <span
                  className="font-display t-poster absolute inset-0 block text-volt"
                  style={{ clipPath: `inset(${100 - value}% 0 0 0)` }}
                >
                  M.HUY
                </span>
              </div>
            </div>

            <div>
              <div className="h-1 w-full bg-background/20 md:h-1.5">
                <div
                  className="h-full origin-left bg-volt"
                  style={{ transform: `scaleX(${value / 100})` }}
                />
              </div>
              <div className="mt-3 flex items-end justify-between gap-4">
                <span className="t-tag">{t.hero.role}</span>
                <span className="font-display text-[clamp(2.5rem,9vw,6rem)] leading-[1.15] tabular-nums">
                  {String(value).padStart(3, "0")}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
