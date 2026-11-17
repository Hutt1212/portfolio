"use client"

import React, { useRef, useState } from "react"
import { gsap } from "@/lib/gsap"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"
import { markAppReady } from "@/lib/app-ready"
import { lockScroll, unlockScroll } from "@/lib/scroll-lock"

const SEEN_KEY = "tva:tempad-seen"

/** Boot steps, shown as menu rows on the TemPad screen. The highlight walks down them. */
const STEPS = ["SCAN TIMELINE", "LOCK COORDINATES", "CHARGE TIMEDOOR", "OPEN PORTAL"]

/** Theme tokens taken from the TVA Classic theme config (styles/TVA Classic/config.json). */
const ORANGE = "#f8861e"
const TRACK = "#29231e"

/** Storage can throw (private mode, blocked site data) — never let it break the intro. */
function readSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1"
  } catch {
    return false
  }
}

function writeSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1")
  } catch {
    /* ignore */
  }
}

/** Wheel / touch input is swallowed while the curtain is down, so the page cannot drift underneath it. */
const block = (e: Event) => e.preventDefault()

export default function Loader() {
  const root = useRef<HTMLDivElement>(null)
  const padRef = useRef<HTMLDivElement>(null)
  const doorRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const batteryRef = useRef<HTMLImageElement>(null)

  const [visible, setVisible] = useState(true)

  useIsomorphicLayoutEffect(() => {
    const el = root.current
    if (!el) return

    const seen = readSeen()
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduced) {
      markAppReady()
      setVisible(false)
      return
    }

    writeSeen()

    // The intro always lands on the hero: drop any restored scroll position and
    // freeze scrolling (Lenis included) until the curtain lifts.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual"
    window.scrollTo(0, 0)
    lockScroll()
    window.addEventListener("wheel", block, { passive: false })
    window.addEventListener("touchmove", block, { passive: false })

    let released = false
    const release = () => {
      if (released) return
      released = true
      window.removeEventListener("wheel", block)
      window.removeEventListener("touchmove", block)
      unlockScroll()
    }

    const finish = () => {
      release()
      markAppReady()
      setVisible(false)
    }

    let safety = 0
    const counter = { val: 0 }
    const duration = seen ? 0.8 : 1.6
    const rows = Array.from(listRef.current?.children ?? []) as HTMLElement[]
    let lastStep = -1
    let lastCell = -1

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          window.clearTimeout(safety)
          finish()
        },
      })

      // 0. The CRT power-on runs in CSS from first paint (see .tempad-screen),
      //    so it never waits on hydration. Give it a beat before booting.
      tl.to({}, { duration: seen ? 0.1 : 0.35 })

      // 1. Boot progress: bar, percentage, battery cells and the menu highlight.
      tl.to(counter, {
        val: 100,
        duration,
        ease: "power1.inOut",
        onUpdate: () => {
          const v = Math.round(counter.val)
          if (countRef.current) countRef.current.textContent = `${String(v).padStart(3, "0")}%`
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${v / 100})`
            barRef.current.parentElement?.setAttribute("aria-valuenow", String(v))
          }

          const cell = v >= 100 ? 4 : Math.min(4, Math.floor(v / 25) + 1)
          if (cell !== lastCell && batteryRef.current) {
            lastCell = cell
            batteryRef.current.src = v >= 100 ? "/tempad/btc.png" : `/tempad/bt${cell}.png`
          }

          const step = Math.min(STEPS.length - 1, Math.floor((v / 100) * STEPS.length))
          if (step !== lastStep) {
            lastStep = step
            rows.forEach((row, i) => {
              row.dataset.state = i < step ? "done" : i === step ? "active" : "idle"
            })
          }
        },
      })

      // 2. Selected row blinks twice — the "confirm" press.
      tl.to(rows[rows.length - 1] ?? {}, { autoAlpha: 0.25, duration: 0.07, yoyo: true, repeat: 3, ease: "none" })

      // 3. Timedoor materialises out of the screen, then swallows the viewport.
      tl.fromTo(
        doorRef.current,
        { scaleX: 0.02, scaleY: 0.1, autoAlpha: 0 },
        { scaleX: 1, scaleY: 1, autoAlpha: 1, duration: 0.35, ease: "power3.out" }
      )
        .to(doorRef.current, { scaleX: 8, scaleY: 8, duration: 0.5, ease: "power3.in" })
        .to(flashRef.current, { autoAlpha: 1, duration: 0.3, ease: "power2.in" }, "-=0.25")
        .set(padRef.current, { autoAlpha: 0 })
        // Hand over to the Hero underneath and give scrolling back
        .call(() => {
          release()
          markAppReady()
        })
        .to(flashRef.current, { autoAlpha: 0, duration: 0.65, ease: "power2.out" })
        .to(el, { autoAlpha: 0, duration: 0.4, ease: "power2.out" }, "-=0.4")

      // Failsafe in case the timeline never completes (e.g. the tab starts in
      // the background and rAF is paused). Derived from the real length of the
      // timeline so it can never cut the portal off mid-flash.
      safety = window.setTimeout(finish, tl.duration() * 1000 + 1500)
    }, el)

    return () => {
      window.clearTimeout(safety)
      release()
      ctx.revert()
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={root}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="tempad-root fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-[#070402] px-4 select-none"
    >
      {/* Room ambience: faint grid + warm falloff around the device */}
      <div aria-hidden className="absolute inset-0 tva-bg-grid opacity-30 pointer-events-none" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(60% 55% at 50% 50%, rgba(248,134,30,0.14), transparent 70%)" }}
      />

      {/* Timedoor (expands to engulf the screen). Halo is a gradient, not a box-shadow:
          Chrome clips very large blurred shadows on a scaled layer. */}
      <div
        ref={doorRef}
        aria-hidden
        className="absolute z-40 h-[34rem] max-h-[80svh] w-72 pointer-events-none opacity-0"
        style={{ transformOrigin: "center center" }}
      >
        <div
          className="absolute -inset-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,200,80,0.7), rgba(248,134,30,0.35) 45%, rgba(248,134,30,0) 100%)",
          }}
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#fff4dc] via-[#ffb347] to-[#f8861e] shadow-[inset_0_0_60px_#ffffff]" />
      </div>

      <div
        ref={flashRef}
        aria-hidden
        className="fixed inset-0 z-50 pointer-events-none opacity-0 bg-gradient-to-b from-[#ffe7b0] via-[#ffa53a] to-[#f8861e]"
      />

      {/* ── TemPad device ─────────────────────────────────────────── */}
      <div ref={padRef} className="tempad relative z-20 w-[min(92vw,680px)]">
        <div className="tempad-shell">
          <div className="tempad-bezel">
            <div className="tempad-screen" style={{ backgroundImage: "url(/tempad/screen.png)" }}>
              {/* Status bar */}
              <div className="tempad-status">
                <span>TEMPAD</span>
                <span className="tempad-status-icons">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/tempad/playing.png" alt="" className="tempad-icon" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/tempad/bluetooth.png" alt="" className="tempad-icon" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img ref={batteryRef} src="/tempad/bt1.png" alt="" className="tempad-battery" />
                </span>
              </div>

              <div className="tempad-title">&gt; TIMEDOOR</div>

              {/* Menu: one row per boot step */}
              <ul ref={listRef} className="tempad-list">
                {STEPS.map((step, i) => (
                  <li key={step} data-state={i === 0 ? "active" : "idle"} className="tempad-row">
                    <span className="tempad-row-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="tempad-row-label">{step}</span>
                    <span className="tempad-row-tick" aria-hidden>
                      OK
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/tempad/arrow.png" alt="" className="tempad-arrow" />
                  </li>
                ))}
              </ul>

              {/* Progress, styled from the theme's player config */}
              <div className="tempad-progress">
                <div
                  role="progressbar"
                  aria-label="Loading"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={0}
                  className="tempad-track"
                  style={{ background: TRACK }}
                >
                  <div ref={barRef} className="tempad-fill" style={{ background: ORANGE }} />
                </div>
                <span ref={countRef} className="tempad-count">
                  000%
                </span>
              </div>

              <div className="tempad-sector">
                <span>/EARTH-616</span>
                <span>SACRED TIMELINE</span>
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/tempad/glyphs.png" alt="" className="tempad-glyphs" />

              <div aria-hidden className="tempad-scan" />
            </div>
          </div>

          <div className="tempad-foot" aria-hidden>
            <span className="tempad-led" />
            <span>TVA · TEMPAD</span>
            <span className="tempad-grille" />
          </div>
        </div>
      </div>
    </div>
  )
}
