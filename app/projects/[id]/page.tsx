"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowUpRight, CheckCircle2, ExternalLink, Github } from "lucide-react"
import { useLanguage } from "@/app/hooks/useLanguage"
import PageHeader from "@/app/components/y/PageHeader"
import SacredTimeline from "@/app/components/y/SacredTimeline"

/** Extra screenshots per project, used by the sticky story column. */
const GALLERY: Record<string, string[]> = {
  unagi: ["/projects/unagi-hero.png", "/projects/unagi-features.png", "/projects/unagi-combo.png"],
  bddwriter: [
    "/projects/bddwriter-chat.png",
    "/projects/bddwriter-landing.jpg",
    "/projects/bddwriter-features.jpg",
  ],
  portfolio: ["/projects/portfolio-hero.png"],
}

export default function ProjectDetailPage() {
  const { id } = useParams()
  const { t, language } = useLanguage()
  const vi = language === "vi"

  const project = t.portfolio.projects.find((p: any) => p.id === id)

  if (!project) {
    return (
      <div className="shell flex min-h-screen flex-col justify-center py-32">
        <span className="t-label text-muted-foreground">404</span>
        <h1 className="t-display t-huge mt-4">
          {vi ? "Không tìm thấy dự án" : "Project not found"}
        </h1>
        <p className="t-lede mt-5 max-w-[46ch] text-muted-foreground">
          {vi
            ? "Dự án bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ."
            : "The project you are looking for does not exist or has been removed."}
        </p>
        <Link href="/work" data-cursor className="pill pill-solid mt-9 self-start">
          {vi ? "Xem tất cả dự án" : "See all work"} →
        </Link>
      </div>
    )
  }

  const [headline, ...rest] = project.title.split("–")
  const subline = rest.join("–").trim()
  const shots = GALLERY[project.id as string] ?? [project.image]

  return (
    <>
      <PageHeader
        eyebrow={t.site.labels.work}
        title={headline.trim()}
        lede={subline || undefined}
        backHref="/work"
        backLabel={vi ? "Quay lại dự án" : "Back to work"}
      />

      <div className="shell">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech: string) => (
            <span key={tech} className="pill">
              {tech}
            </span>
          ))}
        </div>

        <div className="frame mt-10 aspect-[16/9] md:mt-14">
          <Image src={project.image} alt={project.title} fill priority sizes="100vw" className="object-cover" />
        </div>

        {/* Overview */}
        <section className="grid gap-6 pt-16 md:grid-cols-12 md:gap-10 md:pt-24">
          <span className="t-label text-muted-foreground md:col-span-3">{t.projectDetail.overview}</span>
          <div className="md:col-span-9">
            <p className="t-lede text-muted-foreground">{project.longDescription}</p>

            {project.vision && (
              <div className="mt-10 border-l-2 border-[hsl(var(--violet))] pl-6 md:pl-8">
                <span className="t-label text-muted-foreground">{t.projectDetail.vision}</span>
                <p className="t-mid mt-3 !leading-[1.4]">{project.vision}</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="pt-16 md:pt-24">
        <SacredTimeline
          label={t.projectDetail.highlights}
          nodes={(project.highlights ?? []).map((h: any, i: number) => ({
            index: String(i + 1).padStart(2, "0"),
            title: h.title,
            blurb: h.description ?? h.desc ?? "",
          }))}
        />
      </div>

      {shots.length > 1 && (
        <div className="shell pt-20 md:pt-28">
          <span className="t-label text-muted-foreground">
            {vi ? "Hình ảnh" : "Gallery"}
          </span>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {shots.map((src, i) => (
              <div key={src} className="frame aspect-[16/10]">
                <Image
                  src={src}
                  alt={`${project.title} — ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="shell pb-28 md:pb-40">
        {project.impact && (
          <section className="grid gap-6 md:grid-cols-12 md:gap-10">
            <span className="t-label text-muted-foreground md:col-span-3">{t.projectDetail.impact}</span>
            <ul className="flex flex-col gap-5 md:col-span-9">
              {project.impact.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0 text-[hsl(var(--violet))]" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-14 flex flex-wrap gap-3">
          {/* "#" means there is no public deployment — render nothing rather
              than a button that goes nowhere. */}
          {project.link && project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="pill pill-solid"
            >
              {t.projectActions.visit}
              <ExternalLink size={16} />
            </a>
          )}

          {project.github && project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="pill"
            >
              {t.projectActions.github}
              <Github size={16} />
            </a>
          )}
        </div>

        <section className="mt-20 md:mt-28">
          <div className="hairline" />
          <span className="t-label mt-8 block text-muted-foreground">{t.site.allProjects}</span>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {t.portfolio.projects
              .filter((p: any) => p.id !== project.id)
              .map((other: any) => (
                <Link
                  key={other.id}
                  href={`/projects/${other.id}`}
                  data-cursor
                  className="group flex items-center justify-between gap-4 border-t-[1.5px] border-foreground/[0.14] py-6"
                >
                  <span className="t-display t-big truncate-safe">
                    {other.title.split("–")[0].trim()}
                  </span>
                  <ArrowUpRight
                    size={22}
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              ))}
          </div>
        </section>
      </div>
    </>
  )
}
