"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"
import { useLanguage } from "@/app/hooks/useLanguage"

export default function Nav() {
  const { t, language, setLanguage } = useLanguage()
  const pathname = usePathname()
  const bar = useRef<HTMLElement>(null)
  // Every page opens on a dark band, so the bar starts light-on-dark and flips
  // once it has scrolled onto the cream body. The landing is dark throughout.
  const [onDark, setOnDark] = useState(true)
  const isLanding = pathname === "/"

  useIsomorphicLayoutEffect(() => {
    const el = bar.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Hide going down, reveal going up — the standard scroll-direction bar.
      const show = gsap.to(el, { yPercent: -140, duration: 0.5, paused: true })

      // The dark band's height depends on how long the page title wraps, so a
      // hardcoded threshold leaves the bar dark-on-dark (invisible) on some
      // pages. Measure the real band instead, and re-measure on refresh.
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

  const links = [
    { href: "/work", label: t.nav.projects },
    { href: "/expertise", label: t.nav.skills },
    { href: "/about", label: t.nav.about },
  ]

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
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-cursor
              className={`pill !border-transparent ${
                pathname === link.href ? "!bg-foreground !text-background" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
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
          <Link href="/contact" data-cursor className="pill pill-solid hidden !py-2.5 sm:inline-flex">
            {t.nav.contact}
          </Link>
        </div>
      </nav>
    </header>
  )
}
