"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react"
import { useLanguage } from "@/app/hooks/useLanguage"
import Rise from "./Rise"
import SplitLines from "./SplitLines"
import Ticker from "./Ticker"

const EASE = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const { t } = useLanguage()
  const s = t.street

  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  // Gentle counter-scroll on the portrait; the poster type stays put so the
  // headline never drifts out of alignment with the rules above and below it.
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"])
  const posterOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  const facts = [
    { k: s.labels.about, v: t.hero.role },
    { k: s.labels.stack, v: "Next.js · .NET · Node" },
    { k: s.labels.contact, v: "nguyenminhhuy01234@gmail.com" },
  ]

  return (
    <section ref={ref} className="relative">
      <div className="mx-auto w-full max-w-[110rem] px-4 pt-24 sm:px-6 sm:pt-28 lg:px-10 lg:pt-32">
        {/* ── Meta bar ───────────────────────────────────────────── */}
        <Rise
          y={-10}
          duration={0.6}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b-2 border-foreground pb-3 md:border-b-[3px]"
        >
          <span className="t-tag">
            {t.name} <span className="text-muted-foreground">— {t.hero.role}</span>
          </span>
          <span className="t-tag flex items-center gap-2">
            <span className="animate-blink h-2 w-2 rounded-full bg-volt ring-1 ring-foreground" />
            {t.hero.status}
          </span>
        </Rise>

        {/* ── Poster headline ────────────────────────────────────── */}
        <motion.h1 style={{ opacity: posterOpacity }} className="font-display t-poster mt-5 md:mt-8">
          <SplitLines
            immediate
            delay={0.12}
            stagger={0.12}
            lines={[s.poster1, s.poster2]}
            lineClassName={(i) => (i === 1 ? "t-outline" : "")}
          />
        </motion.h1>

        {/* ── Portrait · pitch · facts ───────────────────────────── */}
        <div className="mt-8 grid grid-cols-12 gap-4 md:gap-6 lg:mt-14">
          {/* Portrait */}
          <Rise delay={0.45} className="col-span-12 sm:col-span-6 lg:col-span-4">
            <div className="slab shadow-hard relative aspect-[4/5] w-full overflow-hidden bg-secondary">
              <motion.div style={{ y: portraitY }} className="absolute inset-0 scale-[1.16]">
                <Image
                  src="/avatar.jpg"
                  alt={t.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover grayscale contrast-[1.15] transition-[filter] duration-700 hover:grayscale-0"
                />
              </motion.div>

              <div className="bg-halftone pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-multiply dark:mix-blend-screen" />

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 border-t-2 border-foreground bg-background px-3 py-2 md:border-t-[3px] md:px-4">
                <span className="t-tag truncate-safe">{t.name}</span>
                <span className="t-tag shrink-0 text-muted-foreground">/ 2026</span>
              </div>
            </div>
          </Rise>

          {/* Pitch + actions */}
          <Rise
            delay={0.55}
            className="col-span-12 flex flex-col justify-between gap-7 sm:col-span-6 lg:col-span-5"
          >
            <div>
              <span className="t-tag inline-flex border-2 border-foreground bg-volt px-2.5 py-1.5 text-volt-foreground">
                {t.hero.title}
              </span>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg md:mt-7 md:text-xl md:leading-relaxed">
                {t.hero.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 md:gap-4">
              <Link
                href="/#work"
                className="slab press shadow-hard group flex items-center justify-between gap-4 bg-foreground px-5 py-4 text-background md:px-7 md:py-5"
              >
                <span className="font-display t-mid">{t.hero.viewWork}</span>
                <ArrowDown
                  size={26}
                  strokeWidth={2.5}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-y-1"
                />
              </Link>
              <a
                href="mailto:nguyenminhhuy01234@gmail.com"
                className="slab press shadow-hard group flex items-center justify-between gap-4 bg-card px-5 py-4 md:px-7 md:py-5"
              >
                <span className="font-display t-mid">{s.contactCta}</span>
                <ArrowUpRight
                  size={26}
                  strokeWidth={2.5}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>
          </Rise>

          {/* Facts */}
          <Rise
            as="dl"
            delay={0.65}
            className="col-span-12 flex flex-col justify-end lg:col-span-3"
          >
            {facts.map((fact) => (
              <div
                key={fact.k}
                className="flex items-baseline justify-between gap-4 border-t-2 border-foreground py-3 last:border-b-2 md:py-4"
              >
                <dt className="t-tag shrink-0 text-muted-foreground">{fact.k}</dt>
                <dd className="min-w-0 truncate-safe text-right text-sm font-semibold md:text-base">
                  {fact.v}
                </dd>
              </div>
            ))}
          </Rise>
        </div>

        {/* ── Ground line ────────────────────────────────────────── */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t-2 border-foreground pt-3 md:mt-12 md:border-t-[3px]">
          <span className="t-tag flex items-center gap-2">
            <MapPin size={13} strokeWidth={2.5} />
            {s.location}
          </span>
          <span className="t-tag flex items-center gap-2 text-muted-foreground">
            {s.scroll}
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ArrowDown size={13} strokeWidth={2.5} />
            </motion.span>
          </span>
        </div>
      </div>

      {/* ── Ticker band ────────────────────────────────────────── */}
      <div className="tilt-l relative z-10 -ml-[2%] mt-14 w-[104%] md:mt-24">
        <Ticker items={s.tickerWords} variant="ink" speed={34} />
      </div>
    </section>
  )
}
