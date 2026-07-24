"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowUp, Github, Facebook, Instagram, Mail, Phone } from "lucide-react"
import { useLanguage } from "@/app/hooks/useLanguage"
import Ticker from "./street/Ticker"
import SplitLines from "./street/SplitLines"

const EASE = [0.16, 1, 0.3, 1] as const

const SOCIALS = [
  { key: "github", label: "GitHub", href: "https://github.com/Hutt1212", Icon: Github },
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/minh.huy.604520",
    Icon: Facebook,
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/m_hii204/",
    Icon: Instagram,
  },
]

export default function Footer() {
  const { t, language } = useLanguage()
  const s = t.street

  const navLinks = [
    { label: s.labels.work, href: "/#work" },
    { label: s.labels.expertise, href: "/#expertise" },
    { label: t.skills.title, href: "/#skills" },
    { label: t.about.title, href: "/about" },
  ]

  const contactWords = [s.contactCta, t.footer.available, "nguyenminhhuy01234@gmail.com"]

  return (
    <footer id="contact" className="relative z-10 mt-16 md:mt-28">
      <div className="tilt-r -ml-[2%] w-[104%]">
        <Ticker items={contactWords} variant="flare" speed={28} />
      </div>

      <div className="mt-12 border-t-2 border-foreground bg-foreground text-background md:mt-20 md:border-t-[3px]">
        <div className="mx-auto w-full max-w-[110rem] px-4 py-14 sm:px-6 md:py-20 lg:px-10">
          {/* Big CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="t-tag flex items-center gap-2 opacity-70">
              <span className="animate-blink h-2 w-2 rounded-full bg-volt" />
              {t.footer.available}
            </div>

            <h2 className="font-display t-huge mt-4 max-w-[16ch] md:mt-6">
              <SplitLines lines={[t.footer.slogan]} delay={0.1} />
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-3 md:mt-12 md:gap-4 lg:grid-cols-2">
              <a
                href="mailto:nguyenminhhuy01234@gmail.com"
                className="press shadow-hard-invert group flex items-center justify-between gap-4 border-2 border-background bg-volt p-5 text-volt-foreground md:border-[3px] md:p-8"
              >
                <span className="min-w-0">
                  <span className="t-tag block opacity-70">{t.footer.contactTitle}</span>
                  <span className="font-display t-big mt-1 block truncate-safe">nguyenminhhuy01234@gmail.com</span>
                </span>
                <Mail size={30} strokeWidth={2.5} className="shrink-0" />
              </a>

              <a
                href="tel:0357210049"
                className="press shadow-hard-invert group flex items-center justify-between gap-4 border-2 border-background bg-transparent p-5 md:border-[3px] md:p-8"
              >
                <span className="min-w-0">
                  <span className="t-tag block opacity-70">
                    {language === "vi" ? "Điện thoại" : "Phone"}
                  </span>
                  <span className="font-display t-big mt-1 block truncate-safe">0357 210 049</span>
                </span>
                <Phone size={30} strokeWidth={2.5} className="shrink-0" />
              </a>
            </div>
          </motion.div>

          {/* Link grid */}
          <div className="mt-14 grid grid-cols-1 gap-8 border-t-2 border-background/25 pt-8 sm:grid-cols-2 md:mt-20 md:gap-10 md:pt-12 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-2">
              <Link href="/" className="font-display inline-flex items-center text-3xl md:text-5xl">
                M.HUY
                <span className="ml-2 h-2.5 w-2.5 bg-volt md:h-3 md:w-3" />
              </Link>
              <p className="mt-3 max-w-sm text-sm leading-relaxed opacity-60 md:text-base">
                {t.hero.role} — {s.location}
              </p>
            </div>

            <nav aria-label="Footer">
              <span className="t-tag block opacity-50">{s.labels.index}</span>
              <ul className="mt-4 flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-display group inline-flex items-center gap-1.5 text-xl uppercase leading-none transition-colors hover:text-volt md:text-2xl"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={16}
                        strokeWidth={3}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <span className="t-tag block opacity-50">Social</span>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {SOCIALS.map(({ key, label, href, Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="press grid h-12 w-12 place-items-center border-2 border-background transition-colors hover:bg-volt hover:text-volt-foreground md:h-14 md:w-14 md:border-[3px]"
                  >
                    <Icon size={20} strokeWidth={2.5} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Baseline */}
          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t-2 border-background/25 pt-6 sm:flex-row sm:items-center md:mt-16">
            <p className="t-tag opacity-50">{t.footer.copyright}</p>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="t-tag group flex items-center gap-2 opacity-70 transition-opacity hover:opacity-100"
            >
              {language === "vi" ? "Lên đầu trang" : "Back to top"}
              <ArrowUp
                size={14}
                strokeWidth={3}
                className="transition-transform group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
