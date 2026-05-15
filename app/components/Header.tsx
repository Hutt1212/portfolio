"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, useScroll, useTransform } from "framer-motion"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { useLanguage } from "@/app/hooks/useLanguage"
import LanguageToggle from "./LanguageToggle"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { scrollY } = useScroll()

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
        className="pointer-events-auto backdrop-blur-xl border border-transparent rounded-[2rem] shadow-2xl transition-all duration-300 overflow-hidden relative"
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

        <nav className="mx-auto flex items-center justify-between px-6 py-3 lg:px-10 h-16" aria-label="Global">
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
              </div>
            )}
          </div>
        </nav>
      </motion.header>
    </div>
  )
}
