"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/app/hooks/useLanguage"
import { useTimelineTheme, type TimelineThemeKey } from "@/app/context/TimelineThemeContext"
import SplitReveal from "./SplitReveal"
import TimeStream from "./TimeStream"

type Props = {
  /** Section name shown in the breadcrumb, e.g. "Work". */
  eyebrow: string
  title: string
  lede?: string
  /** Where the back link points. Defaults to the landing page. */
  backHref?: string
  backLabel?: string
  /** Explicit timeline theme for this page header */
  theme?: TimelineThemeKey
}

/**
 * Every sub-page opens with the same dark band: the landing's stream, dimmed
 * far down so it is atmosphere behind the title rather than a competitor to it.
 */
export default function PageHeader({ eyebrow, title, lede, backHref = "/", backLabel, theme }: Props) {
  const { language } = useLanguage()
  const { setTheme } = useTimelineTheme()
  const root = useRef<HTMLElement>(null)

  // Determine appropriate theme based on section if not provided explicitly
  const pageTheme: TimelineThemeKey =
    theme ||
    (eyebrow.toLowerCase().includes("work") || eyebrow.toLowerCase().includes("dự án")
      ? "multiverse"
      : eyebrow.toLowerCase().includes("contact") || eyebrow.toLowerCase().includes("liên hệ")
        ? "nexus"
        : "sacred")

  useEffect(() => {
    setTheme(pageTheme)
  }, [pageTheme, setTheme])

  return (
    <header ref={root} className="page-hero on-dark">
      <TimeStream variant="contained" intensity={0.65} scrollTriggerRef={root} overrideTheme={pageTheme} />

      <div className="shell">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href={backHref} data-cursor className="pill group !py-2.5">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            {backLabel ?? (language === "vi" ? "Trang chủ" : "Home")}
          </Link>
          <span className="t-label">/ {eyebrow}</span>
        </div>

        <SplitReveal as="h1" className="t-display t-huge mt-10 md:mt-14" type="lines" immediate>
          {title}
        </SplitReveal>

        {lede && <p className="t-lede mt-6 max-w-[54ch] text-[hsl(var(--tl-dim))]">{lede}</p>}
      </div>
    </header>
  )
}
