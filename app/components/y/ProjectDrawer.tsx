"use client"

import { useCallback, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ArrowUpRight } from "lucide-react"
import { gsap } from "@/lib/gsap"
import { lockScroll, unlockScroll } from "@/lib/scroll-lock"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"
import { useLanguage } from "@/app/hooks/useLanguage"

export type DrawerProject = {
  id: string
  title: string
  description: string
  longDescription?: string
  vision?: string
  tech: string[]
  image: string
  highlights?: { title: string; description?: string; desc?: string }[]
}

const FOCUSABLE = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'

/**
 * Slide-over panel. The page behind it is frozen and blurred; the panel keeps
 * its own scroll, which is the whole point — long case-study copy should not
 * move the page underneath.
 */
export default function ProjectDrawer({
  project,
  index,
  onClose,
}: {
  project: DrawerProject
  index: number
  onClose: () => void
}) {
  const { t, language } = useLanguage()
  const vi = language === "vi"
  const panel = useRef<HTMLDivElement>(null)
  const backdrop = useRef<HTMLDivElement>(null)
  const closing = useRef(false)

  const [headline, ...rest] = project.title.split("–")
  const subline = rest.join("–").trim()

  /** Animate out first, then unmount — closing instantly looks like a glitch. */
  const close = useCallback(() => {
    if (closing.current) return
    closing.current = true

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return onClose()

    gsap
      .timeline({ onComplete: onClose })
      .to(panel.current, { xPercent: 100, duration: 0.5, ease: "power3.in" })
      .to(backdrop.current, { autoAlpha: 0, duration: 0.35 }, 0)
  }, [onClose])

  useIsomorphicLayoutEffect(() => {
    lockScroll()

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!reduced) {
      gsap
        .timeline()
        .fromTo(backdrop.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
        .fromTo(
          panel.current,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.7, ease: "power3.out" },
          0
        )
    }

    return () => unlockScroll()
  }, [])

  useEffect(() => {
    // Move focus into the panel so keyboard users are not left behind the overlay.
    panel.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close()
      if (e.key !== "Tab") return

      const items = panel.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!items?.length) return
      const first = items[0]
      const last = items[items.length - 1]

      // Keep Tab inside the dialog while it is open.
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [close])

  return (
    <div className="drawer-root" role="dialog" aria-modal="true" aria-label={project.title}>
      <div ref={backdrop} className="drawer-backdrop" onClick={close} />

      {/* data-lenis-prevent: Lenis is stopped while the drawer is open, and a
          stopped Lenis still preventDefaults every wheel event on the page —
          including ones inside this panel. The attribute exempts this subtree
          so its own overflow can scroll natively. */}
      <div ref={panel} className="drawer-panel no-scrollbar" data-lenis-prevent>
        <div className="drawer-inner">
          <div className="flex items-start justify-between gap-6">
            <span className="t-display text-[clamp(2.5rem,6vw,4rem)] leading-none text-muted-foreground/35">
              {String(index + 1).padStart(2, "0")}
            </span>
            <button type="button" onClick={close} className="drawer-close" aria-label={vi ? "Đóng" : "Close"}>
              <X size={18} />
            </button>
          </div>

          <div className="frame mt-6 aspect-[16/10]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 92vw, 44rem"
              className="object-cover"
            />
          </div>

          <h2 className="t-display t-big mt-8">{headline.trim()}</h2>
          {subline && <p className="t-label mt-3 text-muted-foreground">{subline}</p>}

          <p className="mt-6 leading-relaxed text-muted-foreground">
            {project.longDescription ?? project.description}
          </p>

          {project.vision && (
            <div className="mt-8 border-l-2 border-[hsl(var(--violet))] pl-6">
              <span className="t-label text-muted-foreground">{t.projectDetail.vision}</span>
              <p className="mt-2 leading-relaxed">{project.vision}</p>
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div className="mt-10">
              <span className="t-label text-muted-foreground">{t.projectDetail.highlights}</span>
              <ul className="mt-5 flex flex-col gap-5">
                {project.highlights.slice(0, 3).map((h) => (
                  <li key={h.title} className="border-t-[1.5px] border-foreground/[0.14] pt-4">
                    <h3 className="font-medium">{h.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {h.description ?? h.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10">
            <span className="t-label text-muted-foreground">{t.projectActions.techStack}</span>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <Link href={`/projects/${project.id}`} data-cursor className="pill pill-solid mt-10">
            {t.site.viewCase}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
