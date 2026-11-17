"use client"

import { useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"
import { useLanguage } from "@/app/hooks/useLanguage"
import { useTimelineTheme } from "@/app/context/TimelineThemeContext"
import { useAppReady } from "@/app/hooks/useAppReady"

const EMAIL = "nguyenminhhuy01234@gmail.com"

export default function Hero() {
  const { t } = useLanguage()
  const s = t.site
  const root = useRef<HTMLElement>(null)
  const introDone = useAppReady()
  const { setTheme, openShowcase } = useTimelineTheme()

  useIsomorphicLayoutEffect(() => {
    const el = root.current
    if (!el || !introDone) return

    setTheme("sacred")

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap.from(".hero-rise", { y: 30, autoAlpha: 0, duration: 1.1, stagger: 0.1 })

      gsap.to(".hero-inner", {
        z: 420,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          onEnterBack: () => setTheme("sacred"),
        },
      })
    }, el)

    return () => ctx.revert()
  }, [introDone, setTheme])

  return (
    <section ref={root} className="hero-scene">
      {/* Two bands: the name above the time stream, the pitch and CTAs below
          it. The stream is drawn at 52% of the viewport (TimeStream), so copy
          centred in the hero used to sit right on its brightest strands. */}
      <div className="hero-inner shell">
        <div className="hero-top">
          <span className="hero-rise t-label block text-[hsl(var(--tl-glow))]">
            {t.hero.role} — {s.location}
          </span>

          <h1 className="hero-rise t-display t-hero mt-6 max-w-[16ch]">{t.name}</h1>
        </div>

        <div className="hero-bottom">
          <p className="hero-rise t-lede max-w-[46ch] text-[hsl(var(--tl-dim))]">
            {t.hero.subtitle}
          </p>

          <div className="hero-rise mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              data-cursor
              onClick={openShowcase}
              className="ts-cta ts-cta-solid"
            >
              {t.hero.viewWork} →
            </button>
            <a
              href={`mailto:${EMAIL}`}
              data-cursor
              className="ts-cta"
            >
              {s.contactCta}
            </a>
          </div>

          <span className="hero-rise hero-scroll t-label mt-10 block text-[hsl(var(--tl-dim))] opacity-70">
            {s.scroll} ↓
          </span>
        </div>
      </div>
    </section>
  )
}
