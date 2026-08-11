"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { gsap } from "@/lib/gsap"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"
import { useLanguage } from "@/app/hooks/useLanguage"
import { INTRO_DONE } from "./Loader"

/** True once the loader curtain has left (or immediately, if it never ran). */
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

/**
 * Landing hero, floating in the stream. No portrait here on purpose: a
 * photograph in a frame breaks the illusion that you are inside the scene.
 */
export default function Hero() {
  const { t } = useLanguage()
  const s = t.site
  const root = useRef<HTMLElement>(null)
  const introDone = useIntroDone()

  useIsomorphicLayoutEffect(() => {
    const el = root.current
    if (!el || !introDone) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap.from(".hero-rise", { y: 30, autoAlpha: 0, duration: 1.1, stagger: 0.1 })

      // The hero recedes into the stream as the timeline takes over.
      gsap.to(".hero-inner", {
        z: 420,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
      })
    }, el)

    return () => ctx.revert()
  }, [introDone])

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
          <Link href="/work" data-cursor className="ts-cta ts-cta-solid">
            {t.hero.viewWork} →
          </Link>
          <Link href="/contact" data-cursor className="ts-cta">
            {s.contactCta}
          </Link>
        </div>

        <span className="hero-rise t-label mt-16 block text-[hsl(var(--tl-dim))] opacity-70">
          {s.scroll} ↓
        </span>
      </div>
    </section>
  )
}
