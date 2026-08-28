"use client"

import { useRef, useState, useEffect } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"
import { useLanguage } from "@/app/hooks/useLanguage"
import { useTimelineTheme } from "@/app/context/TimelineThemeContext"
import { INTRO_DONE } from "./Loader"

const EMAIL = "nguyenminhhuy01234@gmail.com"

function useIntroDone() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if ((window as unknown as { __yIntroDone?: boolean }).__yIntroDone) {
      setDone(true)
      return
    }
    const on = () => setDone(true)
    window.addEventListener(INTRO_DONE, on)
    return () => window.removeEventListener(INTRO_DONE, on)
  }, [])

  return done
}

export default function Hero() {
  const { t } = useLanguage()
  const s = t.site
  const root = useRef<HTMLElement>(null)
  const introDone = useIntroDone()
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
      <div className="hero-inner shell">
        <span className="hero-rise t-label block text-[hsl(var(--tl-glow))]">
          {t.hero.role} — {s.location}
        </span>

        <h1 className="hero-rise t-display t-hero mt-6 max-w-[16ch]">{t.name}</h1>

        <p className="hero-rise t-lede mt-7 max-w-[46ch] text-[hsl(var(--tl-dim))]">
          {t.hero.subtitle}
        </p>

        <div className="hero-rise mt-10 flex flex-wrap gap-3">
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

        <span className="hero-rise t-label mt-16 block text-[hsl(var(--tl-dim))] opacity-70">
          {s.scroll} ↓
        </span>
      </div>
    </section>
  )
}
