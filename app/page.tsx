"use client"

import { useRef } from "react"
import { useLanguage } from "@/app/hooks/useLanguage"
import { useTimelineTheme } from "@/app/context/TimelineThemeContext"
import TimeStream from "./components/y/TimeStream"
import Hero from "./components/y/Hero"
import WarpSequence, { type WarpBeat } from "./components/y/WarpSequence"
import ProjectShowcase from "./components/y/ProjectShowcase"

const EMAIL = "nguyenminhhuy01234@gmail.com"

export default function Home() {
  const { t, language } = useLanguage()
  const { isOpenShowcase, openShowcase, closeShowcase } = useTimelineTheme()
  const vi = language === "vi"
  const scene = useRef<HTMLDivElement>(null)

  const beats: WarpBeat[] = [
    {
      kind: "card",
      index: "01",
      title: t.portfolio.title,
      blurb: vi
        ? "Các hệ thống đã xây dựng: thương mại điện tử có trợ lý RAG, và một công cụ sinh kịch bản kiểm thử bằng LLM."
        : "Systems I have shipped: e-commerce with a RAG assistant, and an LLM that writes test scenarios.",
      cta: vi ? "Xem dự án" : "View work",
      action: openShowcase,
    },
    {
      kind: "title",
      eyebrow: t.site.labels.about,
      title: t.about.profession,
      sub: `${t.about.education} · ${t.site.location}`,
    },
    { kind: "lede", text: t.about.description1 },
    {
      kind: "field",
      title: t.skills.title,
      groups: [
        { label: t.site.stackGroups.core, items: t.skills.core },
        { label: t.site.stackGroups.realtime, items: t.skills.realtime },
        { label: t.site.stackGroups.data, items: t.skills.data },
        { label: t.site.stackGroups.ops, items: t.skills.ops },
      ],
    },
    {
      kind: "card",
      index: "02",
      title: t.footer.contactTitle,
      blurb: t.hero.status,
      href: `mailto:${EMAIL}`,
      cta: vi ? "Gửi Email" : "Send Email",
    },
  ]

  return (
    <div ref={scene} className="ts-page">
      <TimeStream variant="fixed" scrollTriggerRef={scene} />
      <Hero />
      <WarpSequence beats={beats} label={vi ? "Dòng thời gian" : "The time stream"} />

      {isOpenShowcase && <ProjectShowcase onClose={closeShowcase} />}
    </div>
  )
}
