"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { gsap } from "@/lib/gsap"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"
import { useLanguage } from "@/app/hooks/useLanguage"
import ProjectDrawer, { type DrawerProject } from "./ProjectDrawer"

type Project = {
  id: string
  title: string
  description: string
  tech: string[]
  image: string
}

/**
 * The project list. Its heading lives on the page, not here.
 *
 * Cards open the same drawer the home page uses rather than routing to a
 * detail page — there is one place a project is read in full, and this is it.
 */
export default function Projects() {
  const { t } = useLanguage()
  const s = t.site
  const root = useRef<HTMLElement>(null)
  const [selected, setSelected] = useState<number | null>(null)

  useIsomorphicLayoutEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-row").forEach((row) => {
        gsap.from(row, {
          y: 48,
          autoAlpha: 0,
          duration: 1,
          scrollTrigger: { trigger: row, start: "top 84%", once: true },
        })

        const art = row.querySelector(".project-art")
        if (art) {
          gsap.to(art, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
          })
        }
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="shell pb-24 pt-12 md:pb-32 md:pt-16">
      <ul className="flex flex-col gap-20 md:gap-32">
        {t.portfolio.projects.map((project: Project, i: number) => {
          const [headline, ...rest] = project.title.split("–")
          const subline = rest.join("–").trim()

          return (
            <li key={project.id} className="project-row">
              <button
                type="button"
                data-cursor
                onClick={() => setSelected(i)}
                aria-haspopup="dialog"
                className="group block w-full text-left"
              >
                <div className="frame aspect-[16/9]">
                  <div className="project-art absolute inset-0 scale-[1.12]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 90vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                <div className="mt-7 grid gap-6 md:grid-cols-12 md:gap-10">
                  <div className="md:col-span-1">
                    <span className="t-label text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  </div>

                  <div className="md:col-span-6">
                    <h2 className="t-display t-big flex items-start gap-3">
                      {headline.trim()}
                      <ArrowUpRight
                        size={22}
                        className="mt-1.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </h2>
                    {subline && <p className="mt-3 text-sm text-muted-foreground">{subline}</p>}
                  </div>

                  <div className="md:col-span-5">
                    <p className="leading-relaxed text-muted-foreground">{project.description}</p>
                    <p className="t-label mt-5 text-muted-foreground">{project.tech.join("  ·  ")}</p>
                    <span className="t-label mt-6 inline-block underline decoration-1 underline-offset-4">
                      {s.viewCase}
                    </span>
                  </div>
                </div>
              </button>
            </li>
          )
        })}
      </ul>

      {selected !== null && (
        <ProjectDrawer
          project={t.portfolio.projects[selected] as DrawerProject}
          index={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}
