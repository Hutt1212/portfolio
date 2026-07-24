"use client"

import { useLanguage } from "@/app/hooks/useLanguage"
import SectionHead from "./SectionHead"
import TechLoop from "./TechLoop"

export default function Stack() {
  const { t } = useLanguage()
  const s = t.street

  const all = [...t.skills.core, ...t.skills.secondary, ...t.skills.others]
  // Second row runs the same list from a different offset, so both rows stay
  // wide enough to fill an ultrawide viewport while still looking different.
  const offset = Math.floor(all.length / 2)
  const rowA = all
  const rowB = [...all.slice(offset), ...all.slice(0, offset)]

  return (
    <section id="skills" className="py-16 md:py-28">
      <div className="mx-auto w-full max-w-[110rem] px-4 sm:px-6 lg:px-10">
        <SectionHead
          index="04"
          label={s.labels.stack}
          title={t.skills.title}
          accent="cobalt"
          action={
            <span className="t-tag border-2 border-foreground px-3 py-2 md:px-4">
              {String(all.length).padStart(2, "0")} {s.labels.stack}
            </span>
          }
        />
      </div>

      <div className="flex flex-col gap-2.5 md:gap-4">
        <TechLoop items={rowA} speed={45} highlight />
        <TechLoop items={rowB} speed={55} reverse />
      </div>
    </section>
  )
}
