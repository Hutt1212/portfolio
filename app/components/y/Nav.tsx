"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"
import { useLanguage } from "@/app/hooks/useLanguage"
import { useTimelineTheme } from "@/app/context/TimelineThemeContext"

const EMAIL = "nguyenminhhuy01234@gmail.com"

export default function Nav() {
  const { t, language, setLanguage } = useLanguage()
  const { openShowcase } = useTimelineTheme()
  const pathname = usePathname()
  const bar = useRef<HTMLElement>(null)
  const [onDark, setOnDark] = useState(true)
  const isLanding = pathname === "/"

  useIsomorphicLayoutEffect(() => {
    const el = bar.current
    if (!el) return

    const ctx = gsap.context(() => {
      const show = gsap.to(el, { yPercent: -140, duration: 0.5, paused: true })

      let bandBottom = 0
      const measure = () => {
        const band = document.querySelector<HTMLElement>(".ts-page, .page-hero")
        bandBottom = band ? band.offsetTop + band.offsetHeight : 0
      }
      measure()
      ScrollTrigger.addEventListener("refresh", measure)

      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll()
          setOnDark(isLanding || y + el.offsetHeight < bandBottom)

          if (y < 80) return show.reverse()
          self.direction === 1 ? show.play() : show.reverse()
        },
      })

      return () => ScrollTrigger.removeEventListener("refresh", measure)
    }, el)

    return () => ctx.revert()
  }, [isLanding])

  return (
    <header
      ref={bar}
      className={`fixed inset-x-0 top-0 z-[100] pt-4 md:pt-6 ${onDark ? "on-dark" : ""}`}
    >
      <nav className="shell flex items-center justify-between gap-4">
        <Link
          href="/"
          data-cursor
          className="pill pill-solid !px-4 !py-2.5 truncate-safe"
          aria-label={t.name}
        >
          {t.name}
        </Link>

        <div className="nav-group hidden items-center gap-1 rounded-full border-[1.5px] border-foreground bg-background/80 p-1 backdrop-blur md:flex">
          <button
            type="button"
            data-cursor
            onClick={openShowcase}
            className="pill !border-transparent hover:!bg-foreground hover:!text-background"
          >
            {t.nav.projects}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            data-cursor
            onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
            className="pill !px-4 !py-2.5"
            aria-label="Switch language"
          >
            {language === "vi" ? "EN" : "VI"}
          </button>
          <a
            href={`mailto:${EMAIL}`}
            data-cursor
            className="pill pill-solid hidden !py-2.5 sm:inline-flex"
          >
            {t.nav.contact}
          </a>
        </div>
      </nav>
    </header>
  )
}
