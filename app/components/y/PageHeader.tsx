"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/app/hooks/useLanguage"
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
}

/**
 * Every sub-page opens with the same dark band: the landing's stream, dimmed
 * far down so it is atmosphere behind the title rather than a competitor to it.
 */
export default function PageHeader({ eyebrow, title, lede, backHref = "/", backLabel }: Props) {
  const { language } = useLanguage()
  const root = useRef<HTMLElement>(null)

  return (
    <header ref={root} className="page-hero on-dark">
      <TimeStream variant="contained" intensity={0.5} scrollTriggerRef={root} />

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
