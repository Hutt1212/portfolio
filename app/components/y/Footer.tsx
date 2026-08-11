"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/app/hooks/useLanguage"

const EMAIL = "nguyenminhhuy01234@gmail.com"
const GITHUB = "https://github.com/Hutt1212"

export default function Footer() {
  const { t, language } = useLanguage()
  const vi = language === "vi"

  const pages = [
    { href: "/", label: vi ? "Trang chủ" : "Home" },
    { href: "/work", label: t.nav.projects },
    { href: "/expertise", label: t.nav.skills },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ]

  return (
    /* `relative` + z-index is load-bearing: the landing page paints its stream
       on a fixed canvas, and a positioned element outranks a static one in the
       paint order regardless of z-index — without this the footer sits under it. */
    <footer className="footer-dark relative z-10">
      <div className="shell py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <span className="t-label footer-muted">{vi ? "Liên hệ" : "Contact"}</span>

            <a
              href={`mailto:${EMAIL}`}
              data-cursor
              className="t-mid truncate-safe mt-4 block underline decoration-1 underline-offset-8 transition-colors hover:text-[hsl(var(--tl-glow))]"
            >
              {EMAIL}
            </a>

            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="t-label footer-muted mt-5 inline-flex items-center gap-1.5 transition-colors hover:text-[hsl(var(--tl-glow))]"
            >
              GitHub
              <ArrowUpRight size={13} />
            </a>
          </div>

          <nav className="md:col-span-3">
            <span className="t-label footer-muted">{vi ? "Trang" : "Pages"}</span>
            <ul className="mt-4 space-y-2.5">
              {pages.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-cursor
                    className="transition-colors hover:text-[hsl(var(--tl-glow))]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <span className="t-label footer-muted">{vi ? "Vị trí" : "Based in"}</span>
            <p className="mt-4">{t.site.location}</p>
            <p className="footer-muted mt-2 text-sm">{t.hero.status}</p>
          </div>
        </div>

        <p className="t-display t-huge mt-16 md:mt-24">{t.name}</p>

        <div className="footer-rule mt-8 flex flex-wrap items-center justify-between gap-3 pt-6">
          <span className="t-label footer-muted">
            © {new Date().getFullYear()} {t.name}
          </span>
          <span className="t-label footer-muted">Next.js · GSAP · Tailwind</span>
        </div>
      </div>
    </footer>
  )
}
