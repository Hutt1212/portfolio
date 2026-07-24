"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

type Mode = "idle" | "interactive" | "drag"

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary"

/**
 * Crosshair cursor: a hard dot that tracks exactly, plus a trailing frame that
 * springs behind it and reshapes over links and horizontal rails.
 *
 * Painted in `mix-blend-mode: difference` against white, so it inverts whatever
 * is underneath — it stays visible over the aurora backdrop, dark slabs and
 * photography alike, in both themes.
 *
 * Only mounts for real pointers; touch devices and reduced-motion users render
 * nothing at all and keep their native cursor.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<Mode>("idle")
  const [visible, setVisible] = useState(false)
  const moved = useRef(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const ringX = useSpring(x, { stiffness: 380, damping: 30, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 380, damping: 30, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setEnabled(fine.matches && !reduced.matches)

    update()
    fine.addEventListener("change", update)
    reduced.addEventListener("change", update)
    return () => {
      fine.removeEventListener("change", update)
      reduced.removeEventListener("change", update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    // Hide the OS cursor only now that we are definitely rendering ours.
    document.documentElement.dataset.cursor = "custom"

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)

      if (!moved.current) {
        moved.current = true
        // Jump the trailing ring to the pointer so it doesn't fly in from 0,0
        ringX.jump(e.clientX)
        ringY.jump(e.clientY)
        setVisible(true)
      }

      const target = e.target as HTMLElement | null
      if (!target) return
      if (target.closest(".rail")) setMode("drag")
      else if (target.closest(INTERACTIVE)) setMode("interactive")
      else setMode("idle")
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => moved.current && setVisible(true)

    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    return () => {
      delete document.documentElement.dataset.cursor
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
    }
  }, [enabled, x, y, ringX, ringY])

  if (!enabled) return null

  const ring =
    mode === "drag"
      ? { width: 92, height: 44, rotate: 0, borderRadius: 999 }
      : mode === "interactive"
        ? { width: 56, height: 56, rotate: 45, borderRadius: 0 }
        : { width: 30, height: 30, rotate: 0, borderRadius: 0 }

  return (
    <>
      {/* Trailing frame */}
      <motion.div
        aria-hidden
        className="cursor-layer z-[9998] grid place-items-center border-2 border-white"
        style={{ x: ringX, y: ringY }}
        animate={{ ...ring, opacity: visible ? 1 : 0 }}
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 30,
          opacity: { duration: 0.18 },
        }}
      >
        {mode === "drag" && (
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            Drag
          </span>
        )}
      </motion.div>

      {/* Exact-tracking dot */}
      <motion.div
        aria-hidden
        className="cursor-layer z-[9999] bg-white"
        style={{ x, y }}
        animate={{
          width: mode === "idle" ? 6 : 0,
          height: mode === "idle" ? 6 : 0,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.18 }}
      />
    </>
  )
}
