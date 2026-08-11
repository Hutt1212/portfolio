"use client"

import { useRef, useState } from "react"
import { useLanguage } from "@/app/hooks/useLanguage"
import TimeStream from "./components/y/TimeStream"
import Hero from "./components/y/Hero"
import SacredTimeline, { type TimelineNode } from "./components/y/SacredTimeline"
import ProjectShowcase from "./components/y/ProjectShowcase"

export default function Home() {
  const { t, language } = useLanguage()
  const vi = language === "vi"
  const scene = useRef<HTMLDivElement>(null)
  const [showcase, setShowcase] = useState(false)

  const nodes: TimelineNode[] = [
    {
      index: "01",
      title: t.portfolio.title,
      blurb: vi
        ? "Các hệ thống đã xây dựng: thương mại điện tử, chat realtime và trợ lý RAG."
        : "Systems I have shipped: e-commerce, realtime chat, and a RAG assistant.",
      cta: vi ? "Xem dự án" : "View work",
      // Opens the chooser in place instead of navigating: the point is to stay
      // inside the stream and browse from there.
      action: () => setShowcase(true),
    },
    {
      index: "02",
      title: t.services.title,
      blurb: vi
        ? "Fullstack, API, hệ thống thời gian thực, tối ưu hiệu năng và bảo mật."
        : "Fullstack, APIs, realtime systems, performance work and security.",
      href: "/expertise",
      cta: vi ? "Xem chuyên môn" : "View expertise",
    },
    {
      index: "03",
      title: t.about.title,
      blurb: t.about.profession,
      href: "/about",
      cta: vi ? "Xem hồ sơ" : "Read profile",
    },
    {
      index: "04",
      title: t.footer.contactTitle,
      blurb: t.hero.status,
      href: "/contact",
      cta: vi ? "Liên hệ" : "Get in touch",
    },
  ]

  return (
    <div ref={scene} className="ts-page">
      {/* One stream behind the whole landing page, not one per section. */}
      <TimeStream variant="fixed" scrollTriggerRef={scene} />
      <Hero />
      <SacredTimeline
        nodes={nodes}
        label={vi ? "Dòng thời gian" : "The time stream"}
        withCanvas={false}
      />

      {showcase && <ProjectShowcase onClose={() => setShowcase(false)} />}
    </div>
  )
}
