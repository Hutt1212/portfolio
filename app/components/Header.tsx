"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { Menu, X, Moon, Sun, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/app/hooks/useLanguage"
import LanguageToggle from "./LanguageToggle"

const EASE = [0.16, 1, 0.3, 1] as const

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { t, language } = useLanguage()

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 })

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock the page while the fullscreen menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const links = [
    { label: t.street.labels.work, href: "/#work", index: "01" },
    { label: t.street.labels.expertise, href: "/#expertise", index: "02" },
    { label: t.skills.title, href: "/#skills", index: "03" },
    { label: t.about.title, href: "/about", index: "04" },
  ]

  const isDark = resolvedTheme === "dark"

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100]">
        <div
          className={`border-b-2 transition-colors duration-300 md:border-b-[3px] ${
            scrolled
              ? "border-foreground bg-background/90 backdrop-blur-md"
              : "border-transparent bg-transparent"
          }`}
        >
          <nav
            aria-label="Main"
            className="mx-auto flex w-full max-w-[110rem] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-10"
          >
            {/* Wordmark */}
            <Link href="/" className="shrink-0" aria-label={t.name}>
              <motion.span
                whileTap={{ scale: 0.94 }}
                className="font-display flex items-center border-2 border-foreground bg-foreground px-2.5 py-1 text-xl text-background md:border-[3px] md:px-3.5 md:py-1.5 md:text-2xl"
              >
                M.HUY
                <span className="ml-1.5 h-1.5 w-1.5 bg-volt" />
              </motion.span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden items-center gap-1 lg:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative flex items-center gap-2 border-2 border-transparent px-3 py-2 transition-colors duration-200 hover:border-foreground hover:bg-volt hover:text-volt-foreground"
                >
                  <span className="t-tag opacity-50 group-hover:opacity-100">{link.index}</span>
                  <span className="font-display text-lg uppercase leading-none">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Controls */}
            <div className="flex shrink-0 items-center gap-2">
              <LanguageToggle />

              {mounted && (
                <button
                  type="button"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                  className="press shadow-hard grid h-10 w-10 place-items-center border-2 border-foreground bg-card md:h-11 md:w-11 md:border-[3px]"
                >
                  {isDark ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
                </button>
              )}

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={language === "vi" ? "Mở menu" : "Open menu"}
                /* Desktop already shows the full nav inline — no hamburger there. */
                className="press shadow-hard-volt grid h-10 w-10 place-items-center border-2 border-foreground bg-foreground text-background md:h-11 md:w-11 md:border-[3px] lg:hidden"
              >
                <Menu size={18} strokeWidth={2.5} />
              </button>
            </div>
          </nav>
        </div>

        {/* Scroll progress */}
        <motion.div
          style={{ scaleX: progress }}
          className="h-1 origin-left bg-volt md:h-1.5"
        />
      </header>

      {/* ── Fullscreen menu ─────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-[130] flex flex-col bg-background"
          >
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" />

            {/* Menu bar */}
            <div className="relative flex items-center justify-between gap-3 border-b-2 border-foreground px-4 py-3 sm:px-6 md:border-b-[3px] lg:px-10">
              <span className="font-display border-2 border-foreground bg-volt px-2.5 py-1 text-xl text-volt-foreground md:border-[3px] md:px-3.5 md:py-1.5 md:text-2xl">
                {t.street.labels.index}
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={language === "vi" ? "Đóng menu" : "Close menu"}
                className="press shadow-hard-volt grid h-10 w-10 place-items-center border-2 border-foreground bg-foreground text-background md:h-11 md:w-11 md:border-[3px]"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Links */}
            <div className="no-scrollbar relative flex-1 overflow-y-auto overscroll-contain">
              <div className="mx-auto w-full max-w-[110rem] px-4 py-6 sm:px-6 lg:px-10">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center gap-4 border-b-2 border-foreground py-4 transition-colors duration-300 hover:bg-volt hover:text-volt-foreground md:gap-8 md:py-7"
                    >
                      <span className="t-tag shrink-0 opacity-50">{link.index}</span>
                      <span className="font-display t-huge min-w-0 flex-1">
                        {link.label}
                      </span>
                      <ArrowUpRight
                        className="h-7 w-7 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:h-12 md:w-12"
                        strokeWidth={2.5}
                      />
                    </Link>
                  </motion.div>
                ))}

                {/* Project shortcuts */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
                  className="mt-8 md:mt-12"
                >
                  <span className="t-tag text-muted-foreground">{t.street.allProjects}</span>
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-5 md:gap-4">
                    {t.portfolio.projects.map((project: any) => (
                      <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        onClick={() => setMenuOpen(false)}
                        className="slab press shadow-hard flex items-center justify-between gap-4 bg-card p-4 md:p-5"
                      >
                        <span className="font-display t-mid min-w-0 truncate-safe">
                          {project.title.split("–")[0].trim()}
                        </span>
                        <ArrowUpRight size={22} strokeWidth={2.5} className="shrink-0" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Menu footer */}
            <div className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t-2 border-foreground px-4 py-3 sm:px-6 md:border-t-[3px] lg:px-10">
              <span className="t-tag text-muted-foreground">{t.footer.copyright}</span>
              <a href="mailto:nguyenminhhuy01234@gmail.com" className="t-tag underline underline-offset-4">
                nguyenminhhuy01234@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
