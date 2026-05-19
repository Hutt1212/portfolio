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
  const { t } = useLanguage()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false)
  const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false)

  // High-end scroll animations
  const headerWidth = useTransform(scrollY, [0, 50], ["100%", "90%"])
  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ["rgba(var(--bg-rgb), 0)", "rgba(var(--bg-rgb), 0.7)"]
  )
  const headerBorder = useTransform(
    scrollY,
    [0, 50],
    ["rgba(16, 185, 129, 0)", "rgba(16, 185, 129, 0.2)"]
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
        className="pointer-events-auto backdrop-blur-xl border border-transparent rounded-[2rem] shadow-2xl transition-all duration-300 overflow-visible relative"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Neon Top Glow Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-emerald-500/50 z-20"
          style={{
            scaleX: useTransform(scrollY, [0, 1000], [0, 1]),
            transformOrigin: "left"
          }}
        />

        <nav className="mx-auto flex items-center justify-between px-6 py-3 lg:px-10 h-16 relative" aria-label="Global">
          {/* LEFT: LOGO */}
          <div className="flex items-center gap-12">
            <Link href="/" className="group relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <span className="text-2xl font-black text-gradient inline-block">
                  Minh Huy.
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            </Link>
          </div>

          {/* CENTER: DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-8">
            {/* Projects Dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => setIsHeaderDropdownOpen(true)}
              onMouseLeave={() => setIsHeaderDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 text-xs font-black text-foreground/80 hover:text-primary transition-colors cursor-pointer uppercase tracking-wider"
              >
                <span>{t.nav.projects}</span>
                <ChevronDown size={12} className="text-muted-foreground group-hover:text-primary" />
              </button>

              <AnimatePresence>
                {isHeaderDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-60 bg-card/95 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl p-2 z-50 flex flex-col gap-1"
                  >
                    {t.portfolio.projects.map((proj: any) => (
                      <Link
                        key={proj.id}
                        href={`/projects/${proj.id}`}
                        className="py-2.5 px-4 rounded-xl hover:bg-primary/10 text-base font-black text-muted-foreground hover:text-primary transition-all flex items-center gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                        <span className="truncate">{proj.title.split("–")[0].trim()}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About */}
            <Link
              href="/#about"
              className="text-xs font-black text-foreground/80 hover:text-primary transition-colors uppercase tracking-wider"
            >
              {t.about.title}
            </Link>
          </div>

          {/* RIGHT: TOGGLES & HAMBURGER */}
          <div className="flex items-center gap-6">
            {mounted && (
              <div className="flex items-center gap-3">
                <div className="p-1 bg-white/5 rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-colors">
                  <LanguageToggle />
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                >
                  {theme === "dark" ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </motion.button>

                {/* Hamburger Sidebar Trigger (only visible on mobile/tablet) */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSidebarOpen(true)}
                  className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)] md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </motion.button>
              </div>
            )}
          </div>
        </nav>
      </motion.header>

      {/* Sidebar Navigation Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-[110] pointer-events-auto"
            />

            {/* Sidebar Body */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[380px] bg-card/90 backdrop-blur-3xl border-l border-border z-[120] pointer-events-auto p-8 flex flex-col justify-between shadow-2xl"
            >
              <div>
                {/* Header inside Sidebar */}
                <div className="flex items-center justify-between mb-12">
                  <span className="text-xl font-black text-gradient uppercase tracking-widest">Navigation</span>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-10 h-10 rounded-full bg-secondary/50 border border-border flex items-center justify-center text-foreground hover:bg-emerald-500 hover:text-white transition-all duration-300"
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                {/* Sidebar Navigation items */}
                <div className="flex flex-col gap-6">
                  {/* Dropdown Projects section */}
                  <div className="flex flex-col">
                    <button
                      onClick={() => setIsProjectsDropdownOpen(!isProjectsDropdownOpen)}
                      className="flex items-center justify-between text-2xl font-black py-2.5 text-foreground hover:text-primary transition-colors group w-full text-left"
                    >
                      <span>{t.nav.projects}</span>
                      <motion.div
                        animate={{ rotate: isProjectsDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-muted-foreground group-hover:text-primary"
                      >
                        <ChevronDown size={24} />
                      </motion.div>
                    </button>

                    {/* Collapsible Drop List */}
                    <AnimatePresence>
                      {isProjectsDropdownOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden pl-4 border-l border-primary/20 flex flex-col gap-3 mt-2"
                        >
                          {t.portfolio.projects.map((proj: any) => (
                            <Link
                              key={proj.id}
                              href={`/projects/${proj.id}`}
                              onClick={() => {
                                setIsSidebarOpen(false)
                                setIsProjectsDropdownOpen(false)
                              }}
                              className="py-2.5 px-4 rounded-xl hover:bg-primary/10 text-sm font-black text-muted-foreground hover:text-primary transition-all flex items-center gap-2.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                              <span className="line-clamp-1">{proj.title.split("–")[0].trim()}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Skills Section Link */}
                  <Link
                    href="/#skills"
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-2xl font-black py-2.5 text-foreground hover:text-primary transition-colors text-left"
                  >
                    {t.skills.title}
                  </Link>

                  {/* About Section Link */}
                  <Link
                    href="/#about"
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-2xl font-black py-2.5 text-foreground hover:text-primary transition-colors text-left"
                  >
                    {t.about.title}
                  </Link>

                  {/* Services Section Link */}
                  <Link
                    href="/#skills"
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-2xl font-black py-2.5 text-foreground hover:text-primary transition-colors text-left"
                  >
                    {t.services.title}
                  </Link>
                </div>
              </div>

              {/* Bottom Copyright info */}
              <div className="pt-8 border-t border-border/50 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">
                {t.footer.copyright}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
