"use client"

import { useLanguage } from "@/app/hooks/useLanguage"
import PageHeader from "@/app/components/y/PageHeader"
import Projects from "@/app/components/y/Projects"

export default function WorkPage() {
  const { t, language } = useLanguage()

  return (
    <>
      <PageHeader
        eyebrow={t.site.labels.work}
        title={t.portfolio.title}
        lede={
          language === "vi"
            ? "Các hệ thống đã xây dựng và vận hành, kèm ghi chú về quyết định kỹ thuật đằng sau mỗi dự án."
            : "Systems I have built and shipped, with notes on the engineering decisions behind each one."
        }
      />
      <Projects />
    </>
  )
}
