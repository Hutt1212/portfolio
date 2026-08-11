"use client"

import { useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"
import { useLanguage } from "@/app/hooks/useLanguage"
import PageHeader from "@/app/components/y/PageHeader"

export default function ExpertisePage() {
  const { t, language } = useLanguage()
  const root = useRef<HTMLDivElement>(null)

  const groups = [
    { label: t.site.stackGroups.core, items: t.skills.core },
    { label: t.site.stackGroups.secondary, items: t.skills.secondary },
    { label: t.site.stackGroups.others, items: t.skills.others },
  ]

  useIsomorphicLayoutEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ex-row").forEach((row) => {
        gsap.from(row, {
          y: 32,
          autoAlpha: 0,
          duration: 0.9,
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root}>
      <PageHeader
        eyebrow={t.site.labels.expertise}
        title={t.services.title}
        lede={
          language === "vi"
            ? "Những mảng tôi làm sâu, kèm công nghệ dùng thường xuyên trong công việc thực tế."
            : "The areas I work in depth, and the tools I reach for on real projects."
        }
      />

      <section className="shell pb-20 pt-10 md:pb-28 md:pt-14">
        <ul>
          {t.services.items.map((item: { name: string; description: string }, i: number) => (
            <li
              key={item.name}
              className="ex-row grid gap-4 border-b-[1.5px] border-foreground/[0.14] py-8 md:grid-cols-12 md:gap-10 md:py-11"
            >
              <span className="t-label text-muted-foreground md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="t-display t-big md:col-span-5">{item.name}</h2>
              <p className="leading-relaxed text-muted-foreground md:col-span-6">{item.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell pb-28 md:pb-36">
        <h2 className="t-display t-huge">{t.skills.title}</h2>

        <div className="mt-10 md:mt-14">
          {groups.map((group) => (
            <div
              key={group.label}
              className="ex-row grid gap-4 border-t-[1.5px] border-foreground/[0.14] py-7 last:border-b-[1.5px] md:grid-cols-12 md:gap-10"
            >
              <span className="t-label text-muted-foreground md:col-span-3">{group.label}</span>
              <div className="flex flex-wrap gap-2 md:col-span-9">
                {group.items.map((item: string) => (
                  <span key={item} className="pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
