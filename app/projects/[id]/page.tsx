"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Github,
  Layers,
  Shield,
  Zap,
} from "lucide-react"
import { useLanguage } from "@/app/hooks/useLanguage"
import Rise from "@/app/components/street/Rise"
import Ticker from "@/app/components/street/Ticker"

const EASE = [0.16, 1, 0.3, 1] as const
const HIGHLIGHT_ICONS = [Zap, Shield, Layers, Cpu]

export default function ProjectDetailPage() {
  const { id } = useParams()
  const { t, language } = useLanguage()

  const project = t.portfolio.projects.find((p: any) => p.id === id)

  if (!project) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-[110rem] items-center justify-center px-4 py-32 sm:px-6 lg:px-10">
        <div className="slab shadow-hard-lg max-w-lg bg-card p-6 md:p-10">
          <span className="t-tag text-flare">404</span>
          <h1 className="font-display t-big mt-3">
            {language === "vi" ? "Không tìm thấy dự án" : "Project not found"}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {language === "vi"
              ? "Dự án bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ."
              : "The project you are looking for does not exist or has been removed."}
          </p>
          <Link
            href="/"
            className="slab press shadow-hard mt-8 flex items-center justify-between gap-4 bg-foreground p-4 text-background md:p-5"
          >
            <span className="font-display t-mid">
              {language === "vi" ? "Về trang chủ" : "Back home"}
            </span>
            <ArrowUpRight size={24} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    )
  }

  const [headline, ...rest] = project.title.split("–")
  const subline = rest.join("–").trim()

  return (
    <div className="relative">
      <div className="mx-auto w-full max-w-[110rem] px-4 pt-24 sm:px-6 sm:pt-28 lg:px-10 lg:pt-32">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-foreground pb-3 md:border-b-[3px]">
          <Link
            href="/#work"
            className="t-tag group flex items-center gap-2 transition-colors hover:text-flare"
          >
            <ArrowLeft
              size={14}
              strokeWidth={3}
              className="transition-transform group-hover:-translate-x-1"
            />
            {language === "vi" ? "Quay lại dự án" : "Back to work"}
          </Link>
          <span className="t-tag text-muted-foreground">/ {t.street.labels.work}</span>
        </div>

        {/* Title block */}
        <Rise y={30} duration={0.7} className="mt-6 md:mt-10">
          <h1 className="font-display t-mega">{headline.trim()}</h1>
          {subline && (
            <p className="mt-4 max-w-3xl text-base font-semibold uppercase leading-snug tracking-wide text-muted-foreground md:mt-6 md:text-xl">
              {subline}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-2 md:mt-8">
            {project.tech.map((tech: string) => (
              <span
                key={tech}
                className="t-tag border-2 border-foreground bg-card px-2.5 py-1.5 md:px-3 md:py-2"
              >
                {tech}
              </span>
            ))}
          </div>
        </Rise>

        {/* Cover */}
        <Rise
          delay={0.15}
          duration={0.7}
          className="slab shadow-hard-lg relative mt-8 aspect-[16/10] w-full overflow-hidden bg-secondary md:mt-12 md:aspect-[21/9]"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </Rise>

        {/* Body */}
        <div className="mt-10 grid grid-cols-12 gap-4 md:mt-16 md:gap-6">
          {/* Main column */}
          <div className="col-span-12 flex flex-col gap-6 md:gap-10 lg:col-span-8">
            <section>
              <div className="flex items-center gap-3 border-b-2 border-foreground pb-3 md:border-b-[3px]">
                <span className="h-2.5 w-2.5 bg-volt" />
                <span className="t-tag">{t.projectDetail.overview}</span>
              </div>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:mt-7 md:text-xl md:leading-relaxed">
                {project.longDescription}
              </p>
            </section>

            {project.vision && (
              <section className="slab shadow-hard bg-volt text-volt-foreground p-5 md:p-8">
                <span className="t-tag block opacity-70">{t.projectDetail.vision}</span>
                <p className="mt-3 text-lg font-medium leading-snug md:mt-5 md:text-2xl md:leading-[1.3]">
                  {project.vision}
                </p>
              </section>
            )}

            <section>
              <div className="flex items-center gap-3 border-b-2 border-foreground pb-3 md:border-b-[3px]">
                <span className="h-2.5 w-2.5 bg-flare" />
                <span className="t-tag">{t.projectDetail.highlights}</span>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 md:mt-7 md:gap-5 sm:grid-cols-2">
                {(project.highlights || []).map((feature: any, i: number) => {
                  const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
                      className="slab shadow-hard flex flex-col gap-4 bg-card p-5 md:p-7"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="grid h-11 w-11 place-items-center border-2 border-foreground bg-background">
                          <Icon size={20} strokeWidth={2.5} />
                        </span>
                        <span className="t-tag text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="font-display t-mid">{feature.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                        {feature.description || feature.desc}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 flex flex-col gap-4 md:gap-6 lg:col-span-4">
            <div className="flex flex-col gap-3 md:gap-4 lg:sticky lg:top-28">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="slab press shadow-hard group flex items-center justify-between gap-4 bg-foreground p-5 text-background md:p-7"
              >
                <span className="font-display t-mid">{t.projectActions.visit}</span>
                <ExternalLink size={24} strokeWidth={2.5} className="shrink-0" />
              </a>

              {project.github && project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slab press shadow-hard group flex items-center justify-between gap-4 bg-card p-5 md:p-7"
                >
                  <span className="font-display t-mid">{t.projectActions.github}</span>
                  <Github size={24} strokeWidth={2.5} className="shrink-0" />
                </a>
              )}

              {project.impact && (
                <div className="slab bg-card p-5 md:p-7">
                  <span className="t-tag block text-muted-foreground">
                    {t.projectDetail.impact}
                  </span>
                  <ul className="mt-4 flex flex-col gap-4 md:mt-6">
                    {project.impact.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          size={20}
                          strokeWidth={2.5}
                          className="mt-0.5 shrink-0 text-flare"
                        />
                        <span className="text-sm leading-relaxed md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Other projects */}
        <div className="mt-14 md:mt-24">
          <div className="flex items-center gap-3 border-b-2 border-foreground pb-3 md:border-b-[3px]">
            <span className="h-2.5 w-2.5 bg-cobalt" />
            <span className="t-tag">{t.street.allProjects}</span>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-5">
            {t.portfolio.projects
              .filter((p: any) => p.id !== project.id)
              .map((other: any) => (
                <Link
                  key={other.id}
                  href={`/projects/${other.id}`}
                  className="slab press shadow-hard group flex items-center justify-between gap-4 bg-card p-5 md:p-7"
                >
                  <span className="font-display t-mid min-w-0 truncate-safe">
                    {other.title.split("–")[0].trim()}
                  </span>
                  <ArrowUpRight
                    size={26}
                    strokeWidth={2.5}
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>

      <div className="tilt-r -ml-[2%] mt-14 w-[104%] md:mt-24">
        <Ticker items={project.tech} variant="volt" speed={30} />
      </div>
    </div>
  )
}
