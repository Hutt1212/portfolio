"use client"

import { useRef } from "react"
import { gsap, SplitText, ScrollTrigger } from "@/lib/gsap"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"
import type React from "react"

type Props = {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span"
  /** "lines" for copy, "chars" for display type you want to pop letter by letter. */
  type?: "lines" | "words" | "chars"
  delay?: number
  stagger?: number
  /** Skip the ScrollTrigger and play straight away (hero copy, above the fold). */
  immediate?: boolean
}

export default function SplitReveal({
  children,
  className,
  as: Tag = "p",
  type = "lines",
  delay = 0,
  stagger = 0.08,
  immediate = false,
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.remove("reveal-pending")
      return
    }

    let split: SplitText | null = null
    let ctx: gsap.Context | null = null
    let cancelled = false

    // Copy starts hidden so the un-split text never flashes. If fonts stall or
    // the split throws, that hiding must not become permanent — show it anyway.
    const safety = window.setTimeout(() => el.classList.remove("reveal-pending"), 2500)

    // Splitting before webfonts land measures the fallback face, so the lines
    // break in the wrong places and never re-flow.
    document.fonts.ready.then(() => {
      if (cancelled || !ref.current) return
      window.clearTimeout(safety)

      ctx = gsap.context(() => {
        split = new SplitText(el, {
          type: type === "lines" ? "lines" : `lines,${type}`,
          linesClass: "split-line",
        })

        const targets = type === "lines" ? split.lines : type === "words" ? split.words : split.chars

        el.classList.remove("reveal-pending")

        gsap.from(targets, {
          yPercent: 118,
          rotate: type === "chars" ? 3 : 0,
          duration: 1.1,
          ease: "y-out",
          stagger,
          delay,
          scrollTrigger: immediate
            ? undefined
            : { trigger: el, start: "top 88%", once: true },
        })
      }, el)

      ScrollTrigger.refresh()
    })

    return () => {
      cancelled = true
      window.clearTimeout(safety)
      split?.revert()
      ctx?.revert()
    }
  }, [type, delay, stagger, immediate])

  return (
    <Tag ref={ref as never} className={`reveal-pending ${className ?? ""}`}>
      {children}
    </Tag>
  )
}
