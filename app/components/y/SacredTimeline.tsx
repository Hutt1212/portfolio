"use client"

import { useRef } from "react"
import Link from "next/link"
import { gsap } from "@/lib/gsap"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"
import TimeStream from "./TimeStream"

export type TimelineNode = {
  index: string
  title: string
  blurb: string
  href?: string
  cta?: string
  /** Given instead of `href` when the card opens an overlay rather than navigating. */
  action?: () => void
}

/**
 * Trailer title-card timing. Copy arrives dead centre, pushes in slightly,
 * holds long enough to read, then dissolves — flying it off at an angle both
 * clipped it against the viewport edge and made it unreadable in motion.
 */
const IN = 0.5
const HOLD = 0.45
const OUT = 0.45

type Props = {
  nodes: TimelineNode[]
  label: string
  /** Off when the page already paints the stream behind everything. */
  withCanvas?: boolean
}

/**
 * Title cards cut over the time stream, one at a time, while the section is
 * pinned. The stream itself is canvas (see TimeStream); this owns only the copy
 * and its timing.
 */
export default function SacredTimeline({ nodes, label, withCanvas = true }: Props) {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const el = root.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".ts-card", el)
      if (!cards.length) return

      gsap.set(cards, { xPercent: -50, yPercent: -50, autoAlpha: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * (cards.length * 0.95 + 0.4)}`,
          pin: stage.current,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      cards.forEach((card, i) => {
        const at = i * (IN + HOLD + OUT)

        tl
          // Push in: slightly oversized and soft, settling to sharp and still.
          .fromTo(
            card,
            { scale: 1.07, autoAlpha: 0, filter: "blur(9px)", y: 18 },
            {
              scale: 1,
              autoAlpha: 1,
              filter: "blur(0px)",
              y: 0,
              ease: "power2.out",
              duration: IN,
            },
            at
          )
          // Hold: a slow creep, the way a trailer lets a card sit on screen.
          .to(card, { scale: 1.015, ease: "none", duration: HOLD }, at + IN)
          // Dissolve: pulls back and softens rather than flying past.
          .to(
            card,
            { scale: 0.97, autoAlpha: 0, filter: "blur(7px)", ease: "power2.in", duration: OUT },
            at + IN + HOLD
          )
      })

      return () => tl.kill()
    })

    mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".ts-card", el)
      gsap.set(cards, { clearProps: "all" })

      const tweens = cards.map((card) =>
        gsap.from(card, {
          y: 36,
          autoAlpha: 0,
          duration: 0.8,
          scrollTrigger: { trigger: card, start: "top 86%", once: true },
        })
      )

      return () => tweens.forEach((tw) => tw.kill())
    })

    return () => mm.revert()
  }, [nodes.length])

  return (
    <section ref={root} className={`ts-block ${withCanvas ? "ts-section" : ""}`}>
      <div ref={stage} className="ts-stage">
        {withCanvas && <TimeStream variant="contained" scrollTriggerRef={root} />}

        <div className="ts-label shell">
          <span className="t-label">{label}</span>
        </div>

        <div className="ts-space">
          {nodes.map((node) => (
            <article key={node.index} className="ts-card">
              <span className="t-label text-[hsl(var(--tl-glow))]">{node.index}</span>
              <h3 className="t-display t-huge mt-4">{node.title}</h3>
              <p className="mx-auto mt-5 max-w-[46ch] leading-relaxed text-[hsl(var(--tl-dim))]">
                {node.blurb}
              </p>
              {node.cta && node.action && (
                <button
                  type="button"
                  data-cursor
                  onClick={node.action}
                  aria-haspopup="dialog"
                  className="ts-cta mt-8"
                >
                  {node.cta} →
                </button>
              )}

              {node.cta && !node.action && node.href && (
                <Link href={node.href} data-cursor className="ts-cta mt-8">
                  {node.cta} →
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
