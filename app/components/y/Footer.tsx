"use client"

import React, { useState, useEffect, useRef } from "react"
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
  const [scrolledDown, setScrolledDown] = useState(false)
  const [footerInView, setFooterInView] = useState(false)
  const footerRef = useRef<HTMLElement>(null)
  // Hidden near the top, and hidden once the footer is on screen — there it
  // sat on top of the email / copy buttons on phones.
  const showFloatingTop = scrolledDown && !footerInView

  // Floating Back to Top Button visibility listener
  useEffect(() => {
    const handleScroll = () => setScrolledDown(window.scrollY > 350)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    const footer = footerRef.current
    const io = footer
      ? new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting), {
          rootMargin: "0px 0px -15% 0px",
        })
      : null
    if (footer && io) io.observe(footer)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      io?.disconnect()
    }
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
      <footer ref={footerRef} className="relative z-10 overflow-hidden border-t border-[#ff8c00]/30 bg-[#050302] text-[#f4ecd8]">
        {/* Cinematic Loki Hand Background Artwork - Covers full footer from top-right down to the bottom */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="/footer.jpg"
            alt="God Loki Weaving the Sacred Timeline"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[78%_28%] md:object-[82%_22%] scale-[1.1] md:scale-100 opacity-90 md:opacity-95 brightness-115 contrast-125 mix-blend-screen transition-transform duration-1000 ease-out"
          />
          {/* Subtle top edge fade for smooth transition from previous section */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050302] to-transparent opacity-85" />
          {/* Left-side reading scrim to keep text razor-sharp over timeline filaments */}
          <div className="absolute inset-y-0 left-0 w-full md:w-[68%] bg-gradient-to-r from-[#050302] via-[#050302]/80 to-transparent" />
          {/* Bottom subtle ambient glow rather than a black mask so filaments run freely */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_35%,rgba(255,200,0,0.16),transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_88%,rgba(255,140,0,0.12),transparent_60%)]" />
        </div>

        <div className="shell relative z-10 pt-20 pb-10 md:pt-28 md:pb-12">
          {/* Top Call To Action with Enlarged Heroic Heading */}
          <div className="max-w-4xl space-y-5">
            <h2 className="t-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black tracking-tight text-white !leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              {vi ? "Cùng nhau kiến tạo sản phẩm đột phá." : "Let's weave the next digital universe."}
            </h2>

            <p className="t-lede text-lg sm:text-xl md:text-2xl text-[#ded4c1] max-w-2xl font-light leading-relaxed pt-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              {vi
                ? "Sẵn sàng đón nhận những cơ hội hợp tác mới, các dự án công nghệ thử thách và các giải pháp phần mềm hiện đại."
                : "Open for new fullstack opportunities, challenging web systems, and innovative engineering collaborations."}
            </p>
          </div>

          {/* Action Cards & Navigation Grid */}
          <div className="grid gap-8 md:grid-cols-12 md:gap-10 pt-12 md:pt-16 border-t border-white/15 mt-12 md:mt-16">
            {/* Email Quick Action Card */}
            <div className="md:col-span-6 space-y-4">
              <span className="t-label text-xs sm:text-sm uppercase font-bold tracking-[0.2em] text-[#ffd700]">
                {vi ? "Hòm thư trực tiếp" : "Direct Inquiries"}
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  data-cursor
                  className="group relative inline-flex items-center gap-3.5 px-6 py-4 rounded-xl border border-[#ff8c00]/60 bg-[#120a04]/90 text-white font-mono text-sm sm:text-base md:text-lg font-semibold shadow-[0_0_35px_rgba(255,140,0,0.3)] hover:border-[#ffd700] hover:bg-[#1f1007] hover:shadow-[0_0_50px_rgba(255,215,0,0.45)] transition-all"
                >
                  <span className="truncate">{EMAIL}</span>
                  <ArrowUpRight size={18} className="text-[#ff8c00] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>

                <button
                  type="button"
                  data-cursor
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-5 py-4 rounded-xl border border-white/20 bg-[#160d06]/85 text-xs sm:text-sm font-mono text-[#e0d6c3] hover:text-white hover:border-[#ffd700] hover:bg-[#221208] transition-all"
                  title={vi ? "Sao chép email" : "Copy email"}
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-[#00ffaa]" />
                      <span className="text-[#00ffaa] font-semibold">{vi ? "Đã chép!" : "Copied!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>{vi ? "Sao chép" : "Copy"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Explore Links */}
            <div className="md:col-span-3 space-y-3 p-4 sm:p-5 rounded-2xl bg-[#0e0a05]/50 backdrop-blur-md border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <span className="t-label text-xs sm:text-sm uppercase font-bold tracking-[0.2em] text-[#ffd700]">
                {vi ? "Khám phá" : "Navigation"}
              </span>
              <ul className="space-y-3 font-medium text-sm sm:text-base">
                <li>
                  <button
                    type="button"
                    data-cursor
                    onClick={openShowcase}
                    className="inline-flex items-center gap-1.5 text-[#e0d6c3] hover:text-[#ffd700] transition-colors"
                  >
                    <span>{t.nav.projects}</span>
                    <ArrowUpRight size={14} className="opacity-75 text-[#ff8c00]" />
                  </button>
                </li>
                <li>
                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    className="inline-flex items-center gap-1.5 text-[#e0d6c3] hover:text-[#ffd700] transition-colors"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={14} className="opacity-75 text-[#ff8c00]" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Location & Status */}
            <div className="md:col-span-3 space-y-3 p-4 sm:p-5 rounded-2xl bg-[#0e0a05]/50 backdrop-blur-md border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <span className="t-label text-xs sm:text-sm uppercase font-bold tracking-[0.2em] text-[#ffd700]">
                {vi ? "Khu vực" : "Location"}
              </span>
              <p className="text-sm sm:text-base text-white font-medium">{t.site.location}</p>
              <p className="text-xs sm:text-sm text-[#00ffaa] flex items-center gap-2 pt-1 font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ffaa] animate-pulse" />
                {t.hero.status}
              </p>
            </div>
          </div>

          {/* Huge Statement Signature Name Display - Preserving Vietnamese diacritics */}
          <div className="pt-16 md:pt-24 pb-4 overflow-visible">
            <h1 className="block text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9.5rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffd700] to-[#ff9900] select-none pt-6 pb-2 !leading-[1.12] drop-shadow-[0_8px_40px_rgba(0,0,0,0.95)] overflow-visible">
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
        tabIndex={showFloatingTop ? 0 : -1}
        aria-hidden={!showFloatingTop}
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
