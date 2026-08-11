"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/app/hooks/useLanguage"
import PageHeader from "@/app/components/y/PageHeader"
import SplitReveal from "@/app/components/y/SplitReveal"

export default function AboutPage() {
  const { t, language } = useLanguage()
  const vi = language === "vi"
  const s = t.site

  // Deliberately no "months of experience" figure: for anyone early in their
  // career it invites the wrong comparison. The projects carry the evidence.
  const facts = [
    { label: vi ? "Vai trò" : "Role", value: t.about.profession },
    { label: vi ? "Vị trí" : "Location", value: s.location },
    { label: vi ? "Tập trung" : "Focus", value: vi ? "Realtime & tích hợp AI" : "Realtime & AI integration" },
    { label: vi ? "Tình trạng" : "Availability", value: t.hero.status },
  ]

  return (
    <>
      <PageHeader eyebrow={s.labels.about} title={t.about.title} />

      <section className="shell pb-28 pt-12 md:pb-40 md:pt-16">
        <div className="grid gap-12 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5 lg:col-span-4">
            <div className="frame aspect-[4/5] md:sticky md:top-28">
              <Image
                src="/draw.jpg"
                alt={t.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 34vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-8">
            <SplitReveal as="p" className="t-display t-big" type="lines">
              {t.about.description1}
            </SplitReveal>

            <SplitReveal as="p" className="t-lede mt-8 max-w-[56ch] text-muted-foreground" type="lines">
              {t.about.description2}
            </SplitReveal>

            <dl className="mt-14">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid gap-2 border-t-[1.5px] border-foreground/[0.14] py-5 last:border-b-[1.5px] md:grid-cols-12 md:gap-6"
                >
                  <dt className="t-label text-muted-foreground md:col-span-4">{fact.label}</dt>
                  <dd className="truncate-safe font-medium md:col-span-8">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 flex flex-wrap gap-3">
              <Link href="/work" data-cursor className="pill pill-solid">
                {s.labels.work} →
              </Link>
              <Link href="/expertise" data-cursor className="pill">
                {s.labels.expertise}
              </Link>
              <Link href="/contact" data-cursor className="pill">
                {t.nav.contact}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
