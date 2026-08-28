"use client"

import React, { useRef, useState } from "react"
import { gsap } from "@/lib/gsap"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"

export const INTRO_DONE = "y:intro-done"
const SEEN_KEY = "tva:tempad-seen"

function announce() {
  if (typeof window !== "undefined") {
    ;(window as unknown as { __yIntroDone?: boolean }).__yIntroDone = true
    window.dispatchEvent(new Event(INTRO_DONE))
  }
}

export default function Loader() {
  const root = useRef<HTMLDivElement>(null)
  const padRef = useRef<HTMLDivElement>(null)
  const doorRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const logRef = useRef<HTMLDivElement>(null)

  const [visible, setVisible] = useState(true)

  useIsomorphicLayoutEffect(() => {
    const el = root.current
    if (!el) return

    const seen = sessionStorage.getItem(SEEN_KEY) === "1"
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduced) {
      announce()
      setVisible(false)
      return
    }

    sessionStorage.setItem(SEEN_KEY, "1")
    document.body.style.overflow = "hidden"

    const logs = [
      "INITIALIZING TEMPORAL DRIVE...",
      "SCANNING CHRONAL FREQUENCIES...",
      "LOCKING SACRED TIMELINE COORDINATES...",
      "GENERATING TIMEDOOR QUANTUM FIELD...",
      "PORTAL ENGAGED - STEPPING THROUGH...",
    ]

    const finish = () => {
      document.body.style.overflow = ""
      announce()
      setVisible(false)
    }

    // Safety failsafe
    const safety = window.setTimeout(finish, seen ? 1800 : 3000)

    const counter = { val: 0 }
    const duration = seen ? 0.7 : 1.3

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          window.clearTimeout(safety)
          finish()
        },
      })

      // 1. Digital segmented counter & progress bar
      tl.to(counter, {
        val: 100,
        duration: duration,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.round(counter.val)
          if (countRef.current) {
            countRef.current.textContent = `${String(v).padStart(3, "0")}%`
          }
          if (barRef.current) {
            barRef.current.style.width = `${v}%`
          }
          if (logRef.current) {
            const stepIdx = Math.min(logs.length - 1, Math.floor((v / 100) * logs.length))
            logRef.current.textContent = `> ${logs[stepIdx]}`
          }
        },
      })

      // 2. TemPad Chassis glint / shake before portal release
      tl.to(
        padRef.current,
        {
          scale: 1.04,
          duration: 0.12,
          yoyo: true,
          repeat: 2,
          ease: "power1.inOut",
        },
        duration - 0.2
      )

      // 3. Step 1: Timedoor portal materializes in the center
      tl.fromTo(
        doorRef.current,
        { scaleX: 0.02, scaleY: 0.1, autoAlpha: 0 },
        {
          scaleX: 1,
          scaleY: 1,
          autoAlpha: 1,
          duration: 0.35,
          ease: "power3.out",
        }
      )
        // Step 2: Timedoor explosively expands outward until it covers 100% of the entire viewport!
        .to(doorRef.current, {
          scaleX: 8,
          scaleY: 8,
          duration: 0.5,
          ease: "power3.in",
        })
        // Step 3: Full-screen golden flash reaches peak (100% covering the screen)
        .to(
          flashRef.current,
          {
            autoAlpha: 1,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.25"
        )
        // Disappear the TemPad UI behind the golden flash
        .set(padRef.current, { autoAlpha: 0 })
        // Announce Hero ready underneath
        .call(() => announce())
        // Step 4: Golden Timedoor light veil smoothly dissolves, revealing the Sacred Timeline!
        .to(flashRef.current, {
          autoAlpha: 0,
          duration: 0.65,
          ease: "power2.out",
        })
        .to(
          el,
          {
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.4"
        )
    }, el)

    return () => {
      window.clearTimeout(safety)
      document.body.style.overflow = ""
      ctx.revert()
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#070402] px-4 select-none font-mono text-[#ffd700] overflow-hidden"
    >
      {/* Background CRT Scanlines */}
      <div className="absolute inset-0 crt-scanlines opacity-90 pointer-events-none z-10" />

      {/* Retro TVA Ambient Grid */}
      <div className="absolute inset-0 tva-bg-grid opacity-40 pointer-events-none z-0" />

      {/* Iconic TVA Timedoor Portal (Expands to engulf the screen) */}
      <div
        ref={doorRef}
        className="absolute w-72 h-[34rem] rounded-2xl pointer-events-none opacity-0 z-40 bg-gradient-to-b from-[#ffffff] via-[#ffb700] to-[#ff7700] shadow-[0_0_120px_#ff8c00,0_0_220px_#ffd700,inset_0_0_60px_#ffffff]"
        style={{ transformOrigin: "center center" }}
      />

      {/* Fullscreen Golden Temporal Energy Veil (Ensures 100% seamless full-screen coverage) */}
      <div
        ref={flashRef}
        className="fixed inset-0 pointer-events-none opacity-0 z-50 bg-gradient-to-b from-[#ffe79a] via-[#ff9900] to-[#ffd700] shadow-[inset_0_0_100px_#ffffff]"
      />

      {/* Main TemPad Device Chassis */}
      <div
        ref={padRef}
        className="relative z-20 w-full max-w-md rounded-2xl bg-[#0e0a05] border-2 border-[#ff8c00]/60 p-6 md:p-8 shadow-[0_0_50px_rgba(255,140,0,0.25),inset_0_0_25px_rgba(255,140,0,0.1)] backdrop-blur-md space-y-6"
      >
        {/* TemPad Top Header */}
        <div className="flex items-center justify-between border-b border-[#ff8c00]/30 pb-3.5 text-xs text-[#ffb700]/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff8c00] animate-ping" />
            <span className="font-bold tracking-widest text-[#ffcc00]">T.V.A // TEMPAD</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#ff8c00]/20 border border-[#ff8c00]/40 text-[#ffd700]">
            TIMEDOOR LINK
          </span>
        </div>

        {/* Center CRT Hologram Display */}
        <div className="rounded-xl bg-black/80 border border-[#ff8c00]/40 p-4 space-y-4 shadow-inner">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#ff9900]/70 uppercase tracking-wider text-[10px]">Portal Initialization</span>
            <span ref={countRef} className="font-bold text-base text-[#ffd700] glow-orange tracking-widest">
              000%
            </span>
          </div>

          {/* Glowing Energy Bar */}
          <div className="w-full h-2.5 rounded-full bg-[#1a0f05] border border-[#ff8c00]/40 overflow-hidden p-0.5">
            <div
              ref={barRef}
              className="h-full rounded-full bg-gradient-to-r from-[#ff6a00] via-[#ffb700] to-[#ffd700] shadow-[0_0_12px_#ff8c00] transition-all duration-75"
              style={{ width: "0%" }}
            />
          </div>

          {/* Chronal Coordinate Telemetry */}
          <div className="grid grid-cols-2 gap-2 text-[10px] text-[#ff9900]/60 pt-1 border-t border-[#ff8c00]/20">
            <div>
              <span className="block text-[#ff9900]/40">TARGET SECTOR:</span>
              <span className="text-[#ffcc00] font-bold">SACRED TIMELINE</span>
            </div>
            <div className="text-right">
              <span className="block text-[#ff9900]/40">VARIANCE FLUX:</span>
              <span className="text-[#00ffaa] font-bold">0.0000 %</span>
            </div>
          </div>
        </div>

        {/* Live System Log Stream */}
        <div className="text-[11px] text-[#ffb700]/80 h-5 overflow-hidden font-mono">
          <div ref={logRef} className="truncate tracking-wide text-[#ffd700]/90">
            &gt; INITIALIZING TEMPORAL DRIVE...
          </div>
        </div>
      </div>
    </div>
  )
}
