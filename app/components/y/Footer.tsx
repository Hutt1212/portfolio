"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowUpRight, Copy, Check, ArrowUp } from "lucide-react"
import { useLanguage } from "@/app/hooks/useLanguage"
import { useTimelineTheme } from "@/app/context/TimelineThemeContext"

const EMAIL = "nguyenminhhuy01234@gmail.com"
const GITHUB = "https://github.com/Hutt1212"

export default function Footer() {
  const { t, language } = useLanguage()
  const { openShowcase } = useTimelineTheme()
  const vi = language === "vi"
  const [copied, setCopied] = useState(false)
  const [showFloatingTop, setShowFloatingTop] = useState(false)

  // Floating Back to Top Button visibility listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowFloatingTop(true)
      } else {
        setShowFloatingTop(false)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    if (navigator.clipboard) {
      navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <footer className="relative z-10 overflow-hidden border-t border-[#ff8c00]/30 bg-[#050302] text-[#f4ecd8]">
        {/* Cinematic Loki Hand Background Artwork - Zoomed on mobile hand, bright & luminous */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="/footer.jpg"
            alt="God Loki Weaving the Sacred Timeline"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[74%_38%] scale-[1.65] md:scale-105 md:object-center opacity-85 brightness-110 contrast-115 mix-blend-lighten transition-transform duration-1000 ease-out"
          />
          {/* Balanced cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050302] via-[#050302]/70 to-[#050302]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050302] via-[#050302]/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(255,215,0,0.12),transparent_65%)]" />
        </div>

        <div className="shell relative z-10 pt-16 pb-8 md:pt-24 md:pb-10">
          {/* Top Call To Action */}
          <div className="max-w-3xl space-y-4">
            <h2 className="t-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {vi ? "Cùng nhau kiến tạo sản phẩm đột phá." : "Let's weave the next digital universe."}
            </h2>

            <p className="t-lede text-base sm:text-lg text-[#e0d6c3] max-w-xl leading-relaxed pt-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {vi
                ? "Sẵn sàng đón nhận những cơ hội hợp tác mới, các dự án công nghệ thử thách và các giải pháp phần mềm hiện đại."
                : "Open for new fullstack opportunities, challenging web systems, and innovative engineering collaborations."}
            </p>
          </div>

          {/* Action Cards & Navigation Grid */}
          <div className="grid gap-8 md:grid-cols-12 md:gap-10 pt-10 md:pt-14 border-t border-white/15 mt-10">
            {/* Email Quick Action Card */}
            <div className="md:col-span-6 space-y-4">
              <span className="t-label text-xs uppercase tracking-widest text-[#ffd700]">
                {vi ? "Hòm thư trực tiếp" : "Direct Inquiries"}
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  data-cursor
                  className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-xl border border-[#ff8c00]/50 bg-[#120a04]/90 text-white font-mono text-sm sm:text-base font-semibold shadow-[0_0_30px_rgba(255,140,0,0.25)] hover:border-[#ffd700] hover:bg-[#1f1007] hover:shadow-[0_0_40px_rgba(255,215,0,0.35)] transition-all"
                >
                  <span className="truncate">{EMAIL}</span>
                  <ArrowUpRight size={16} className="text-[#ff8c00] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>

                <button
                  type="button"
                  data-cursor
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl border border-white/20 bg-[#160d06]/80 text-xs font-mono text-[#e0d6c3] hover:text-white hover:border-[#ffd700] hover:bg-[#221208] transition-all"
                  title={vi ? "Sao chép email" : "Copy email"}
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-[#00ffaa]" />
                      <span className="text-[#00ffaa] font-semibold">{vi ? "Đã chép!" : "Copied!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>{vi ? "Sao chép" : "Copy"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Explore Links */}
            <div className="md:col-span-3 space-y-3">
              <span className="t-label text-xs uppercase tracking-widest text-[#ffd700]">
                {vi ? "Khám phá" : "Navigation"}
              </span>
              <ul className="space-y-2.5 font-medium text-sm">
                <li>
                  <button
                    type="button"
                    data-cursor
                    onClick={openShowcase}
                    className="inline-flex items-center gap-1 text-[#e0d6c3] hover:text-[#ffd700] transition-colors"
                  >
                    <span>{t.nav.projects}</span>
                    <ArrowUpRight size={13} className="opacity-70 text-[#ff8c00]" />
                  </button>
                </li>
                <li>
                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    className="inline-flex items-center gap-1 text-[#e0d6c3] hover:text-[#ffd700] transition-colors"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={13} className="opacity-70 text-[#ff8c00]" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Location & Status */}
            <div className="md:col-span-3 space-y-3">
              <span className="t-label text-xs uppercase tracking-widest text-[#ffd700]">
                {vi ? "Khu vực" : "Location"}
              </span>
              <p className="text-sm text-white font-medium">{t.site.location}</p>
              <p className="text-xs text-[#00ffaa] flex items-center gap-2 pt-1 font-mono">
                <span className="w-2 h-2 rounded-full bg-[#00ffaa] animate-pulse" />
                {t.hero.status}
              </p>
            </div>
          </div>

          {/* Huge Aesthetic Name Display - Dedicated line height & padding to preserve Vietnamese accents (dấu ngã) */}
          <div className="pt-16 pb-2 overflow-visible">
            <h1 className="block text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#ffd700] to-[#ff8c00]/85 select-none pt-4 pb-2 !leading-[1.35] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] overflow-visible">
              {t.name}
            </h1>
          </div>
        </div>
      </footer>

      {/* Floating Dynamic "Back To Top" Button (Follows the viewport) */}
      <button
        type="button"
        data-cursor
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#ff8c00]/60 bg-[#0e0a05]/90 text-xs font-mono text-[#ffd700] shadow-[0_0_25px_rgba(255,140,0,0.35)] backdrop-blur-md transition-all duration-300 hover:border-[#ffd700] hover:bg-[#1a0f06] hover:scale-105 active:scale-95 ${
          showFloatingTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <span>{vi ? "Đầu trang" : "Back to top"}</span>
        <ArrowUp size={14} className="text-[#ff8c00]" />
      </button>
    </>
  )
}
