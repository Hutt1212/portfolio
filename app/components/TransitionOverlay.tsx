"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const EASE = [0.76, 0, 0.24, 1] as const
const COLUMNS = 5
const CLOSE_MS = 620

/**
 * Poster "blinds" wipe between routes. Falls back to an instant navigation when
 * the user prefers reduced motion.
 */
export default function TransitionOverlay() {
  const pathname = usePathname()
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [routeName, setRouteName] = useState("")
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const getRouteName = (path: string) => {
    if (path === "/") return "HOME"
    if (path === "/about") return "ABOUT"
    if (path.startsWith("/projects/")) return "WORK"
    return "M.HUY"
  }

  // Open the blinds once the new route has painted
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 100)
    return () => clearTimeout(t)
  }, [pathname])

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")

    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return

      const anchor = (e.target as HTMLElement).closest("a")
      if (!anchor || !anchor.href || anchor.target === "_blank") return
      if (anchor.hasAttribute("download")) return

      try {
        const url = new URL(anchor.href)
        if (url.origin !== window.location.origin) return
        if (url.pathname === window.location.pathname) return
        if (reduced.matches) return

        e.preventDefault()
        setRouteName(getRouteName(url.pathname))
        setShow(true)

        timer.current = setTimeout(() => {
          router.push(url.pathname + url.search + url.hash)
        }, CLOSE_MS)
      } catch {
        /* not a parseable URL — let the browser handle it */
      }
    }

    document.addEventListener("click", handleClick, true)
    return () => {
      document.removeEventListener("click", handleClick, true)
      if (timer.current) clearTimeout(timer.current)
    }
  }, [router])

  return (
    <AnimatePresence>
      {show && (
        <>
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 flex"
            style={{ zIndex: 100000 }}
          >
            {Array.from({ length: COLUMNS }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: "100%" }}
                animate={{ y: "0%", transition: { duration: 0.5, ease: EASE, delay: 0.03 * i } }}
                exit={{ y: "-100%", transition: { duration: 0.5, ease: EASE, delay: 0.03 * i } }}
                className={`h-full w-full ${i % 2 === 0 ? "bg-foreground" : "bg-volt"}`}
              />
            ))}
          </div>

          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 300000 }}
          >
            <motion.span
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
              className="font-display t-poster select-none text-background mix-blend-difference"
            >
              {routeName}
            </motion.span>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
