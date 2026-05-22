"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { Menu, X, ChevronDown } from "lucide-react"
import { useLanguage } from "@/app/hooks/useLanguage"
import LanguageToggle from "./LanguageToggle"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { scrollY } = useScroll()
  const { t, language } = useLanguage()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false)
  const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false)

  // Rolled scroll bar transformation on scroll
  const headerWidth = useTransform(scrollY, [0, 50], ["100%", "92%"])
  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ["rgba(var(--bg-rgb), 0)", "rgba(var(--bg-rgb), 0.95)"]
  )
  const headerBorder = useTransform(
    scrollY,
    [0, 50],
    ["rgba(92, 64, 51, 0)", "rgba(92, 64, 51, 0.3)"]
  )

  useEffect(() => setMounted(true), [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none p-4">
      <motion.header
        style={{
          width: headerWidth,
          backgroundColor: headerBg,
          borderColor: headerBorder,
        }}
        className="pointer-events-auto border-2 border-transparent bg-transparent shadow-md transition-all duration-300 overflow-visible relative rounded-none border-double"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Ancient top border line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>

        {/* Scroll Progress Line (magical gold) */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-primary z-20"
          style={{
            scaleX: useTransform(scrollY, [0, 1000], [0, 1]),
            transformOrigin: "left"
          }}
        />

        <nav className="mx-auto flex items-center justify-between px-6 py-3 lg:px-10 h-16 relative" aria-label="Global">
          
          {/* LEFT: masthead logo brand */}
          <div className="flex items-center gap-12">
            <Link href="/" className="group relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <span className="text-xl font-cinzel font-black tracking-widest text-foreground hover:text-primary transition-colors uppercase">
                  M. Huy
                </span>
                <span className="text-xs font-serif italic text-muted-foreground ml-1.5 hidden sm:inline-block">
                  {language === "vi" ? "◆ Bản tin Công nghệ" : "◆ Daily Dev"}
                </span>
              </motion.div>
            </Link>
          </div>

          {/* CENTER: DESKTOP NAVIGATION (Runes link) */}
          <div className="hidden md:flex items-center gap-8">
            
            {/* Projects dropdown library */}
            <div
              className="relative py-4"
              onMouseEnter={() => setIsHeaderDropdownOpen(true)}
              onMouseLeave={() => setIsHeaderDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 text-xs font-cinzel font-bold text-foreground/80 hover:text-primary transition-colors cursor-pointer uppercase tracking-widest"
              >
                <span>{t.nav.projects}</span>
                <ChevronDown size={12} className="text-muted-foreground group-hover:text-primary" />
              </button>

              <AnimatePresence>
                {isHeaderDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-64 bg-card border-2 border-foreground/30 shadow-2xl p-2 z-50 flex flex-col gap-1 rounded-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`
                    }}
                  >
                    {t.portfolio.projects.map((proj: any) => (
                      <Link
                        key={proj.id}
                        href={`/projects/${proj.id}`}
                        className="py-2.5 px-4 hover:bg-secondary/40 text-sm font-cinzel font-bold text-muted-foreground hover:text-primary transition-all flex items-center gap-2 border border-transparent hover:border-foreground/10"
                      >
                        <span className="w-1.5 h-1.5 bg-primary/60 rotate-45 flex-shrink-0"></span>
                        <span className="truncate">{proj.title.split("–")[0].trim()}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About Editorial scroll */}
            <Link
              href="/#about"
              className="text-xs font-cinzel font-bold text-foreground/80 hover:text-primary transition-colors uppercase tracking-widest"
            >
              {t.about.title}
            </Link>
          </div>

          {/* RIGHT: TOGGLES & SIDEBAR TRIGGER */}
          <div className="flex items-center gap-4">
            {mounted && (
              <div className="flex items-center gap-3">
                <div className="p-0.5 bg-secondary/35 border border-foreground/15 hover:border-primary/30 transition-colors">
                  <LanguageToggle />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-9 h-9 bg-primary/10 text-primary border border-primary/25 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-[1px_1px_0px_rgba(0,0,0,0.1)] rounded-none"
                >
                  {theme === "dark" ? (
                    <SunIcon className="h-4.5 w-4.5" />
                  ) : (
                    <MoonIcon className="h-4.5 w-4.5" />
                  )}
                </motion.button>

                {/* Sidebar Drawer Hamburger */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSidebarOpen(true)}
                  className="w-9 h-9 bg-primary/10 text-primary border border-primary/25 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 md:hidden shadow-[1px_1px_0px_rgba(0,0,0,0.1)] rounded-none"
                >
                  <Menu className="h-4.5 w-4.5" />
                </motion.button>
              </div>
            )}
          </div>
        </nav>
      </motion.header>

      {/* ========================================================
          PARCHMENT SIDEBAR DRAWER (WIZARD DRAWER)
          ======================================================== */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] pointer-events-auto"
            />

            {/* Sidebar Body scroll texture */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[380px] bg-card border-l-4 border-foreground z-[120] pointer-events-auto p-8 flex flex-col justify-between shadow-2xl rounded-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E")`
              }}
            >
              <div>
                {/* Header inside Sidebar */}
                <div className="flex items-center justify-between mb-12 border-b-2 border-foreground pb-4">
                  <span className="text-lg font-cinzel font-black text-primary uppercase tracking-widest">Case Indices</span>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-9 h-9 border border-foreground flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <X size={18} />
                  </motion.button>
                </div>

                {/* Sidebar Navigation links */}
                <div className="flex flex-col gap-6">
                  {/* Collapsible Dropdown Projects in sidebar */}
                  <div className="flex flex-col">
                    <button
                      onClick={() => setIsProjectsDropdownOpen(!isProjectsDropdownOpen)}
                      className="flex items-center justify-between text-2xl font-cinzel font-bold py-2 border-b border-foreground/10 text-foreground hover:text-primary transition-colors group w-full text-left uppercase tracking-wide"
                    >
                      <span>{t.nav.projects}</span>
                      <motion.div
                        animate={{ rotate: isProjectsDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-muted-foreground group-hover:text-primary"
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </button>

                    {/* Collapse list */}
                    <AnimatePresence>
                      {isProjectsDropdownOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden pl-4 border-l-2 border-primary/30 flex flex-col gap-2 mt-2"
                        >
                          {t.portfolio.projects.map((proj: any) => (
                            <Link
                              key={proj.id}
                              href={`/projects/${proj.id}`}
                              onClick={() => {
                                setIsSidebarOpen(false)
                                setIsProjectsDropdownOpen(false)
                              }}
                              className="py-2 px-3 hover:bg-secondary/40 text-xs font-cinzel font-bold text-muted-foreground hover:text-primary transition-all flex items-center gap-2 border border-transparent hover:border-foreground/10"
                            >
                              <span className="w-1.5 h-1.5 bg-primary/60 rotate-45 flex-shrink-0"></span>
                              <span className="line-clamp-1">{proj.title.split("–")[0].trim()}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Skills scroll Link */}
                  <Link
                    href="/#skills"
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-2xl font-cinzel font-bold py-2 border-b border-foreground/10 text-foreground hover:text-primary transition-colors text-left uppercase tracking-wide"
                  >
                    {t.skills.title}
                  </Link>

                  {/* About scroll Link */}
                  <Link
                    href="/#about"
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-2xl font-cinzel font-bold py-2 border-b border-foreground/10 text-foreground hover:text-primary transition-colors text-left uppercase tracking-wide"
                  >
                    {t.about.title}
                  </Link>

                  {/* Services scroll Link */}
                  <Link
                    href="/#skills"
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-2xl font-cinzel font-bold py-2 border-b border-foreground/10 text-foreground hover:text-primary transition-colors text-left uppercase tracking-wide"
                  >
                    {t.services.title}
                  </Link>
                </div>
              </div>

              {/* Bottom Copyright imprint */}
              <div className="pt-8 border-t border-foreground/20 text-[9px] font-cinzel font-bold text-muted-foreground uppercase tracking-widest text-center">
                {t.footer.copyright}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
