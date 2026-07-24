"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/app/hooks/useLanguage"
import SectionHead from "./SectionHead"

const EASE = [0.16, 1, 0.3, 1] as const

/** Cover art drifts slightly slower than the page as the card passes through. */
function Cover({ src, alt, className }: { src: string; alt: string; className: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.18]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
      </motion.div>
      <div className="bg-halftone pointer-events-none absolute inset-0 opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-[0.12] dark:mix-blend-screen" />
    </div>
  )
}

export default function Work() {
  const { t } = useLanguage()
  const s = t.street

  return (
    <section id="work" className="mx-auto w-full max-w-[110rem] px-4 py-16 sm:px-6 md:py-28 lg:px-10">
      <SectionHead
        index="02"
        label={s.selected}
        title={s.labels.work}
        accent="flare"
        action={
          <span className="t-tag border-2 border-foreground px-3 py-2 md:px-4">
            {String(t.portfolio.projects.length).padStart(2, "0")} {s.allProjects}
          </span>
        }
      />

      <div className="flex flex-col gap-6 md:gap-10">
        {t.portfolio.projects.map((project: any, index: number) => {
          const [headline, ...rest] = project.title.split("–")
          const subline = rest.join("–").trim()
          const flip = index % 2 === 1

          return (
            /* The reveal animation lives on the wrapper: framer-motion writes an
               inline transform, which would otherwise cancel the .press hover. */
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <article className="slab shadow-hard-lg press group relative bg-card">
                <Link
                  href={`/projects/${project.id}`}
                  className="absolute inset-0 z-20"
                  aria-label={project.title}
                />

                <div className="grid grid-cols-12">
                  {/* Cover */}
                  <div
                    className={`relative col-span-12 aspect-[16/10] border-b-2 border-foreground md:border-b-[3px] lg:col-span-7 lg:aspect-[16/11] lg:border-b-0 ${
                      flip ? "lg:order-2 lg:border-l-[3px]" : "lg:border-r-[3px]"
                    }`}
                  >
                    <Cover
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 overflow-hidden"
                    />

                    {/* Index sticker */}
                    <span className="font-display tilt-l-hard absolute left-3 top-3 z-10 grid h-12 w-12 place-items-center border-2 border-foreground bg-volt text-2xl text-volt-foreground md:left-5 md:top-5 md:h-16 md:w-16 md:text-4xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Meta */}
                  <div
                    className={`col-span-12 flex flex-col gap-5 p-5 sm:p-7 md:gap-7 md:p-10 lg:col-span-5 ${
                      flip ? "lg:order-1" : ""
                    }`}
                  >
                    <div>
                      <h3 className="font-display t-big">{headline.trim()}</h3>
                      {subline && (
                        <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground md:text-base">
                          {subline}
                        </p>
                      )}
                    </div>

                    <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech: string) => (
                        <span
                          key={tech}
                          className="t-tag border-2 border-foreground bg-background px-2.5 py-1.5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-4 border-t-2 border-foreground pt-4 md:border-t-[3px] md:pt-6">
                      <span className="font-display t-mid">{s.viewCase}</span>
                      <span className="grid h-12 w-12 shrink-0 place-items-center border-2 border-foreground bg-foreground text-background transition-colors duration-300 group-hover:bg-volt group-hover:text-volt-foreground md:h-14 md:w-14">
                        <ArrowUpRight size={26} strokeWidth={2.5} />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
