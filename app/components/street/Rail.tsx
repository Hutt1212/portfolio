"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

/**
 * Full-bleed horizontal scroller.
 *
 * It is a real scroll container, so touch swipe, trackpad, shift+wheel,
 * keyboard and screen readers all work natively. Mouse drag and the arrow
 * buttons are added on top for pointer users; the progress bar reflects actual
 * scroll position rather than a step counter.
 */
export default function Rail({
  children,
  label,
  className = "",
  gap = "gap-3 md:gap-5",
}: {
  children: React.ReactNode
  label: string
  className?: string
  gap?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [scrollable, setScrollable] = useState(false)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const el = ref.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setScrollable(max > 4)
    setProgress(max > 4 ? el.scrollLeft / max : 0)
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft >= max - 4)
  }, [])

  useEffect(() => {
    sync()
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(sync)
    observer.observe(el)
    Array.from(el.children).forEach((child) => observer.observe(child))
    return () => observer.disconnect()
  }, [sync])

  const step = () => {
    const el = ref.current
    if (!el) return 0
    const first = el.firstElementChild as HTMLElement | null
    if (!first) return el.clientWidth
    const styles = getComputedStyle(el)
    const columnGap = parseFloat(styles.columnGap || "0") || 0
    return first.offsetWidth + columnGap
  }

  const nudge = (direction: 1 | -1) => {
    ref.current?.scrollBy({ left: direction * step(), behavior: "smooth" })
  }

  // Mouse drag — pointer-type guarded so touch keeps its native momentum.
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let dragging = false
    let startX = 0
    let startLeft = 0

    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return
      dragging = true
      startX = e.clientX
      startLeft = el.scrollLeft
      el.classList.add("is-dragging")
    }

    const move = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - startX
      // Only hijack the click once the gesture is clearly a drag
      if (Math.abs(dx) > 4) el.setPointerCapture(e.pointerId)
      el.scrollLeft = startLeft - dx
    }

    const up = () => {
      if (!dragging) return
      dragging = false
      el.classList.remove("is-dragging")
    }

    el.addEventListener("pointerdown", down)
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerup", up)
    el.addEventListener("pointercancel", up)
    el.addEventListener("pointerleave", up)
    return () => {
      el.removeEventListener("pointerdown", down)
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerup", up)
      el.removeEventListener("pointercancel", up)
      el.removeEventListener("pointerleave", up)
    }
  }, [])

  return (
    <div className={className}>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={sync}
        // py leaves room for the cards' offset shadows — `overflow-x: auto`
        // makes the cross axis clip too, which would otherwise shear them off.
        className={`rail no-scrollbar py-3 md:py-4 ${gap}`}
      >
        {children}
      </div>

      {scrollable && (
        <div className="mx-auto mt-5 flex w-full max-w-[110rem] items-center gap-4 px-4 sm:px-6 md:mt-7 lg:px-10">
          {/* Scroll progress */}
          <div className="h-[3px] flex-1 bg-foreground/15">
            <div
              className="h-full origin-left bg-volt transition-transform duration-150 ease-out"
              style={{ transform: `scaleX(${Math.max(progress, 0.04)})` }}
            />
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => nudge(-1)}
              disabled={atStart}
              aria-label="Previous"
              className="press grid h-11 w-11 place-items-center border-2 border-foreground bg-card transition-opacity disabled:pointer-events-none disabled:opacity-30 md:h-12 md:w-12 md:border-[3px]"
            >
              <ArrowLeft size={20} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              disabled={atEnd}
              aria-label="Next"
              className="press grid h-11 w-11 place-items-center border-2 border-foreground bg-card transition-opacity disabled:pointer-events-none disabled:opacity-30 md:h-12 md:w-12 md:border-[3px]"
            >
              <ArrowRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
