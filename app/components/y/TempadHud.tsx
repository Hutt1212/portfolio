"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { useAppReady } from "@/app/hooks/useAppReady"
import { useLanguage } from "@/app/hooks/useLanguage"
import { useTimelineTheme, type TimelineThemeKey } from "@/app/context/TimelineThemeContext"
import { scrollToTop } from "@/lib/scroll-lock"

/**
 * The TemPad the visitor "carries" through the page after the preloader:
 * where they are on the timeline, how far down they are (as the device
 * battery), and a way back to the top.
 *
 * Scroll-driven values are written straight to the DOM from a rAF-throttled
 * listener — a React state update per scroll frame would re-render the HUD
 * dozens of times a second for a three-character change.
 */

/** Sector names per stream theme. `long` on wide screens, `short` on phones. */
const SECTORS: Record<TimelineThemeKey | "footer", { long: string; short: string }> = {
  sacred: { long: "/EARTH-616 · SACRED TIMELINE", short: "SACRED TIMELINE" },
  multiverse: { long: "/MULTIVERSE · CASE FILES", short: "CASE FILES" },
  loki: { long: "/YGGDRASIL · ABOUT", short: "ABOUT" },
  quantum: { long: "/QUANTUM · TOOLS", short: "TOOLS" },
  nexus: { long: "/NEXUS · CONTACT", short: "CONTACT" },
  footer: { long: "/TIMEDOOR · OPEN CHANNEL", short: "OPEN CHANNEL" },
}

export default function TempadHud() {
  const ready = useAppReady()
  const { language } = useLanguage()
  const { activeTheme } = useTimelineTheme()
  const [inFooter, setInFooter] = useState(false)
  // Flips only when crossing the threshold, so React bails out on every other frame.
  const [atTop, setAtTop] = useState(true)

  const pctRef = useRef<HTMLSpanElement>(null)
  const batteryRef = useRef<HTMLImageElement>(null)
  const stateRef = useRef<HTMLImageElement>(null)
  const meterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let frame = 0
    let idleTimer = 0
    let lastCell = -1
    let playing = false

    const paint = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? Math.min(100, Math.max(0, Math.round((window.scrollY / max) * 100))) : 0

      setAtTop(window.scrollY < 48)
      if (pctRef.current) pctRef.current.textContent = `${String(pct).padStart(2, "0")}%`
      if (meterRef.current) meterRef.current.setAttribute("aria-valuenow", String(pct))

      const cell = pct >= 100 ? 5 : Math.min(4, Math.floor(pct / 25) + 1)
      if (cell !== lastCell && batteryRef.current) {
        lastCell = cell
        batteryRef.current.src = cell === 5 ? "/tempad/btc.png" : `/tempad/bt${cell}.png`
      }
    }

    const setPlaying = (on: boolean) => {
      if (on === playing || !stateRef.current) return
      playing = on
      stateRef.current.src = on ? "/tempad/playing.png" : "/tempad/pause.png"
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint)
      // The status icon "plays" while the timeline is moving.
      setPlaying(true)
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => setPlaying(false), 260)
    }

    paint()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    const footer = document.querySelector("footer")
    const io = footer
      ? new IntersectionObserver(([entry]) => setInFooter(entry.isIntersecting), { rootMargin: "0px 0px -40% 0px" })
      : null
    if (footer && io) io.observe(footer)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(idleTimer)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      io?.disconnect()
    }
  }, [])

  const sector = SECTORS[inFooter ? "footer" : activeTheme] ?? SECTORS.sacred
  const vi = language === "vi"

  // The HUD reads the landing page's timeline; elsewhere (the 404 screen) it
  // would report a sector the visitor is not in.
  const pathname = usePathname()
  if (pathname !== "/") return null

  return (
    <nav aria-label="TemPad" className={`tempad-hud ${atTop ? "is-top" : ""} ${ready ? "is-on" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={stateRef} src="/tempad/pause.png" alt="" className="tempad-hud-icon" />
      <span className="tempad-hud-brand">TEMPAD</span>
      <span className="tempad-hud-sep" aria-hidden />

      <span className="tempad-hud-sector" aria-live="polite">
        <span className="tempad-hud-long">{sector.long}</span>
        <span className="tempad-hud-short">{sector.short}</span>
      </span>

      <span className="tempad-hud-sep" aria-hidden />
      <span
        ref={meterRef}
        role="meter"
        aria-label={vi ? "Tiến độ cuộn trang" : "Scroll progress"}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        className="tempad-hud-meter"
      >
        <span ref={pctRef} className="tempad-hud-pct">
          00%
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={batteryRef} src="/tempad/bt1.png" alt="" className="tempad-hud-battery" />
      </span>

      <span className="tempad-hud-sep" aria-hidden />
      <button type="button" data-cursor onClick={scrollToTop} className="tempad-hud-top" aria-label={vi ? "Về đầu trang" : "Back to top"}>
        ↑ <span className="tempad-hud-top-label">TOP</span>
      </button>
    </nav>
  )
}
