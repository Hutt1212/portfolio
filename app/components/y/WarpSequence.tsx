"use client"

import { useRef } from "react"
import Link from "next/link"
import { gsap } from "@/lib/gsap"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"
import { useTimelineTheme, type TimelineThemeKey } from "@/app/context/TimelineThemeContext"

export type WarpBeat =
  | { kind: "title"; eyebrow?: string; title: string; sub?: string }
  | { kind: "lede"; text: string }
  | {
      kind: "card"
      index: string
      title: string
      blurb: string
      cta?: string
      href?: string
      /** Given instead of `href` when the CTA opens an overlay. */
      action?: () => void
    }
  | { kind: "field"; title: string; groups: { label: string; items: string[] }[] }

type Props = {
  beats: WarpBeat[]
  label?: string
}

/** Theme mapping for each beat */
const BEAT_THEMES: TimelineThemeKey[] = [
  "multiverse", // 0: Projects card -> Multiverse Quantum Warp
  "loki",       // 1: About title -> God Loki Yggdrasil
  "loki",       // 2: Lede -> God Loki Yggdrasil
  "quantum",    // 3: Tech skills -> Quantum Neural Matrix
  "nexus",      // 4: Contact card -> Nexus Redline Event
]

export default function WarpSequence({ beats, label }: Props) {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const { setTheme } = useTimelineTheme()

  useIsomorphicLayoutEffect(() => {
    const el = root.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const beatEls = gsap.utils.toArray<HTMLElement>(".warp-beat", el)
      if (!beatEls.length) return

      // Set initial positions: centered & hidden
      gsap.set(beatEls, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.94 })

      const stepDuration = 1.0
      const totalSteps = beatEls.length

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * totalSteps * 0.95}`,
          pin: stage.current,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeaveBack: () => setTheme("sacred"), // Return to Sacred Gold when at Hero
        },
      })

      beatEls.forEach((beat, i) => {
        const at = i * stepDuration
        const beatTheme = BEAT_THEMES[i] || "multiverse"

        // Trigger background theme morph at each beat
        tl.call(() => setTheme(beatTheme), [], at)

        // Smooth 2D Scale + Fade + Glide
        tl.fromTo(
          beat,
          { autoAlpha: 0, scale: 0.94, y: 30 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.35, ease: "power2.out" },
          at
        )
          .to(beat, { scale: 1.02, duration: 0.35, ease: "none" }, at + 0.35)
          .to(
            beat,
            { autoAlpha: 0, scale: 1.05, y: -25, duration: 0.3, ease: "power2.in" },
            at + 0.7
          )
      })

      return () => tl.kill()
    })

    mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
      const beatEls = gsap.utils.toArray<HTMLElement>(".warp-beat", el)
      gsap.set(beatEls, { clearProps: "all" })

      const tweens = beatEls.map((beat, i) => {
        const beatTheme = BEAT_THEMES[i] || "multiverse"
        return gsap.from(beat, {
          y: 28,
          autoAlpha: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: beat,
            start: "top 75%",
            end: "bottom 25%",
            onEnter: () => setTheme(beatTheme),
            onEnterBack: () => setTheme(beatTheme),
          },
        })
      })

      return () => tweens.forEach((tw) => tw.kill())
    })

    return () => mm.revert()
  }, [beats.length, label, setTheme])

  return (
    <section ref={root} className="warp-block">
      <div ref={stage} className="warp-stage">
        {label && (
          <div className="ts-label shell">
            <span className="t-label">{label}</span>
          </div>
        )}

        {beats.map((beat, i) => {
          if (beat.kind === "field") {
            return (
              <div key={i} className="warp-beat warp-scrim">
                <span className="t-label block text-[hsl(var(--tl-glow))]">
                  {beat.title}
                </span>

                <div className="warp-grid">
                  {beat.groups.map((g) => (
                    <div key={g.label} className="warp-group">
                      <span className="warp-group-label">{g.label}</span>
                      <ul className="warp-chips">
                        {g.items.map((item) => (
                          <li key={item} className="warp-chip">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )
          }

          if (beat.kind === "lede") {
            return (
              <div key={i} className="warp-beat warp-scrim">
                <p className="t-lede mx-auto max-w-[52ch] leading-relaxed">{beat.text}</p>
              </div>
            )
          }

          if (beat.kind === "title") {
            return (
              <div key={i} className="warp-beat warp-scrim">
                {beat.eyebrow && (
                  <span className="t-label text-[hsl(var(--tl-glow))]">{beat.eyebrow}</span>
                )}
                <h2 className="t-display t-huge mt-5">{beat.title}</h2>
                {beat.sub && (
                  <p className="t-label mt-6 text-[hsl(var(--tl-dim))]">{beat.sub}</p>
                )}
              </div>
            )
          }

          return (
            <div key={i} className="warp-beat warp-scrim">
              <span className="t-label text-[hsl(var(--tl-glow))]">{beat.index}</span>
              <h2 className="t-display t-huge mt-4">{beat.title}</h2>
              <p className="mx-auto mt-5 max-w-[46ch] leading-relaxed text-[hsl(var(--tl-dim))]">
                {beat.blurb}
              </p>

              {beat.cta && beat.action && (
                <button
                  type="button"
                  data-cursor
                  onClick={beat.action}
                  aria-haspopup="dialog"
                  className="ts-cta mt-8"
                >
                  {beat.cta} →
                </button>
              )}

              {beat.cta && !beat.action && beat.href && (
                <Link href={beat.href} data-cursor className="ts-cta mt-8">
                  {beat.cta} →
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
