"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight, Briefcase, MapPin, Mail, Terminal } from "lucide-react"
import { useLanguage } from "@/app/hooks/useLanguage"
import Ticker from "@/app/components/street/Ticker"
import Rise from "@/app/components/street/Rise"
import SplitLines from "@/app/components/street/SplitLines"

const EASE = [0.16, 1, 0.3, 1] as const

export default function AboutPage() {
  const { t, language } = useLanguage()
  const s = t.street

  const facts = [
    { icon: Terminal, label: language === "vi" ? "Vai trò" : "Role", value: t.about.profession },
    { icon: MapPin, label: language === "vi" ? "Vị trí" : "Location", value: s.location },
    {
      icon: Briefcase,
      label: language === "vi" ? "Kinh nghiệm" : "Experience",
      value: language === "vi" ? "6+ tháng" : "6+ months",
    },
  ]

  return (
    <div className="relative">
      <div className="mx-auto w-full max-w-[110rem] px-4 pt-24 sm:px-6 sm:pt-28 lg:px-10 lg:pt-32">
        {/* Breadcrumb bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-foreground pb-3 md:border-b-[3px]">
          <Link
            href="/"
            className="t-tag group flex items-center gap-2 transition-colors hover:text-flare"
          >
            <ArrowLeft
              size={14}
              strokeWidth={3}
              className="transition-transform group-hover:-translate-x-1"
            />
            {language === "vi" ? "Trang chủ" : "Home"}
          </Link>
          <span className="t-tag text-muted-foreground">/ {s.labels.about}</span>
        </div>

        {/* Poster title */}
        <h1 className="font-display t-poster mt-5 md:mt-8">
          <SplitLines immediate delay={0.08} lines={[t.name]} />
        </h1>

        <div className="mt-8 grid grid-cols-12 gap-4 md:gap-6 lg:mt-12">
          {/* Portrait */}
          <Rise delay={0.2} duration={0.7} className="col-span-12 sm:col-span-6 lg:col-span-4">
            <div className="slab shadow-hard-lg relative aspect-[4/5] w-full overflow-hidden bg-secondary lg:sticky lg:top-28">
              <Image
                src="/avatar.jpg"
                alt={t.name}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover grayscale contrast-[1.15] transition-all duration-700 hover:grayscale-0"
              />
              <div className="bg-halftone pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-multiply dark:mix-blend-screen" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 border-t-2 border-foreground bg-background px-3 py-2 md:border-t-[3px] md:px-4">
                <span className="t-tag truncate-safe">{t.about.profession}</span>
                <span className="t-tag shrink-0 text-muted-foreground">/ 2026</span>
              </div>
            </div>
          </Rise>

          {/* Narrative */}
          <Rise
            delay={0.3}
            duration={0.7}
            className="col-span-12 flex flex-col gap-5 sm:col-span-6 md:gap-7 lg:col-span-8"
          >
            <div className="slab bg-volt text-volt-foreground p-5 md:p-8">
              <span className="t-tag block opacity-70">{t.hero.status}</span>
              <p className="mt-3 text-lg font-medium leading-snug sm:text-xl md:mt-5 md:text-3xl md:leading-[1.25]">
                {t.about.description1}
              </p>
            </div>

            <div className="slab shadow-hard bg-card p-5 md:p-8">
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {t.about.description2}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
              {facts.map((fact) => (
                <div key={fact.label} className="slab flex flex-col gap-3 bg-card p-4 md:p-5">
                  <span className="grid h-10 w-10 place-items-center border-2 border-foreground bg-volt text-volt-foreground">
                    <fact.icon size={18} strokeWidth={2.5} />
                  </span>
                  <span>
                    <span className="t-tag block text-muted-foreground">{fact.label}</span>
                    <span className="font-display t-mid mt-1 block">{fact.value}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 md:gap-4 xs:grid-cols-2">
              <a
                href="mailto:nguyenminhhuy01234@gmail.com"
                className="slab press shadow-hard group flex items-center justify-between gap-4 bg-foreground p-5 text-background md:p-7"
              >
                <span className="font-display t-mid">{t.footer.contactTitle}</span>
                <Mail size={26} strokeWidth={2.5} className="shrink-0" />
              </a>
              <Link
                href="/#work"
                className="slab press shadow-hard group flex items-center justify-between gap-4 bg-card p-5 md:p-7"
              >
                <span className="font-display t-mid">{s.labels.work}</span>
                <ArrowUpRight
                  size={26}
                  strokeWidth={2.5}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </Rise>
        </div>
      </div>

      {/* Skills ticker */}
      <div className="tilt-l -ml-[2%] mt-14 w-[104%] md:mt-24">
        <Ticker
          items={[...t.skills.core, ...t.skills.secondary, ...t.skills.others]}
          variant="ink"
          speed={38}
        />
      </div>
    </div>
  )
}
