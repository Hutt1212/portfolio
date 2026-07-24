"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Briefcase, MapPin, Terminal } from "lucide-react"
import { useLanguage } from "@/app/hooks/useLanguage"
import SectionHead from "./SectionHead"

const EASE = [0.16, 1, 0.3, 1] as const

export default function About() {
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
    <section id="about" className="mx-auto w-full max-w-[110rem] px-4 py-16 sm:px-6 md:py-28 lg:px-10">
      <SectionHead index="01" label={s.labels.index} title={t.about.title} accent="cobalt" />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="col-span-12 lg:col-span-7"
        >
          <p className="text-lg font-medium leading-snug sm:text-xl md:text-3xl md:leading-[1.25]">
            {t.about.description1}
          </p>

          <div className="slab shadow-hard-lg relative mt-8 bg-card p-5 md:mt-12 md:p-8">
            <span className="font-display absolute -top-5 left-4 text-6xl leading-none text-volt md:-top-8 md:text-8xl">
              “
            </span>
            <p className="relative text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.about.description2}
            </p>
          </div>
        </motion.div>

        {/* Fact stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className="col-span-12 flex flex-col gap-3 md:gap-4 lg:col-span-5"
        >
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="slab flex items-center gap-4 bg-card p-4 md:p-5"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center border-2 border-foreground bg-volt text-volt-foreground md:h-12 md:w-12">
                <fact.icon size={20} strokeWidth={2.5} />
              </span>
              <span className="min-w-0">
                <span className="t-tag block text-muted-foreground">{fact.label}</span>
                <span className="font-display t-mid mt-1 block truncate-safe">{fact.value}</span>
              </span>
            </div>
          ))}

          <Link
            href="/about"
            className="slab press shadow-hard group mt-auto flex items-center justify-between gap-4 bg-foreground p-5 text-background md:p-7"
          >
            <span className="font-display t-mid">
              {language === "vi" ? "Hồ sơ đầy đủ" : "Full profile"}
            </span>
            <ArrowUpRight
              size={28}
              strokeWidth={2.5}
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
