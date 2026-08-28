"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { X } from "lucide-react"
import { gsap } from "@/lib/gsap"
import { lockScroll, unlockScroll } from "@/lib/scroll-lock"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"
import { useLanguage } from "@/app/hooks/useLanguage"
import ProjectDrawer, { type DrawerProject } from "./ProjectDrawer"

/**
 * Step one of the project flow: a full-screen chooser that fades up over the
 * page. Picking a card opens the detail drawer on top of it, and the chooser
 * blurs back so the two layers read as foreground and background rather than
 * two competing screens.
 */
export default function ProjectShowcase({ onClose }: { onClose: () => void }) {
  // Rendered into <body>. As a child of .ts-page it inherited that section's
  // `position: relative` rule — which outranks the overlay's own `fixed` on
  // specificity — and collapsed to a zero-height box at the end of the page.
  const [host, setHost] = useState<HTMLElement | null>(null)
  useEffect(() => setHost(document.body), [])

  if (!host) return null
  return createPortal(<ShowcaseContent onClose={onClose} />, host)
}

function ShowcaseContent({ onClose }: { onClose: () => void }) {
  const { t, language } = useLanguage()
  const vi = language === "vi"
  const root = useRef<HTMLDivElement>(null)
  const grid = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const closing = useRef(false)

  const projects: DrawerProject[] = t.portfolio.projects

  const close = () => {
    if (closing.current) return
    closing.current = true

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return onClose()

    gsap.timeline({ onComplete: onClose }).to(root.current, { autoAlpha: 0, duration: 0.35 })
  }

  useIsomorphicLayoutEffect(() => {
    lockScroll()

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // fromTo, not from: `from` animates towards whatever it measures as the
      // current value, so a mis-measure leaves the cards stuck at autoAlpha 0.
      // The end state here is stated outright and cannot be inferred wrong.
      gsap
        .timeline()
        .fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
        .fromTo(
          ".showcase-card",
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.09, duration: 0.7 },
          0.1
        )
    }

    return () => unlockScroll()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // While the drawer is open it owns Escape; this layer only closes when
      // it is the top one.
      if (e.key === "Escape" && selected === null) close()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  })

  return (
    <>
      <div
        ref={root}
        className="showcase-root"
        role="dialog"
        aria-modal="true"
        aria-label={t.portfolio.title}
      >
        <div className="showcase-backdrop" onClick={close} />

        {/* See ProjectDrawer: a stopped Lenis blocks wheel events everywhere, so
            any overlay that scrolls itself has to opt out. */}
        <div
          ref={grid}
          data-lenis-prevent
          className={`showcase-stage ${selected !== null ? "is-dimmed" : ""}`}
        >
          <div className="shell flex items-start justify-between gap-6">
            <div>
              <span className="t-label text-[hsl(var(--tl-glow))]">{t.site.selected}</span>
              <h2 className="t-display t-huge mt-3">{t.portfolio.title}</h2>
              <p className="mt-4 max-w-[46ch] text-[hsl(var(--tl-dim))]">
                {vi ? "Chọn một dự án để xem chi tiết." : "Pick a project to see the detail."}
              </p>
            </div>

            <button
              type="button"
              onClick={close}
              className="showcase-close"
              aria-label={vi ? "Đóng" : "Close"}
            >
              <X size={18} />
            </button>
          </div>

          <div className="showcase-grid no-scrollbar">
            {projects.map((project, i) => {
              const headline = project.title.split("–")[0].trim()

              return (
                <button
                  key={project.id}
                  type="button"
                  data-cursor
                  onClick={() => setSelected(i)}
                  aria-haspopup="dialog"
                  className="showcase-card"
                >
                  <span className="frame block aspect-[16/10]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 78vw, 30vw"
                      className="showcase-art object-cover"
                    />
                  </span>

                  <span className="mt-5 flex items-end justify-between gap-4">
                    <span className="min-w-0 text-left">
                      <span className="t-display t-mid truncate-safe block">{headline}</span>
                      <span className="t-label mt-2 block text-[hsl(var(--tl-dim))]">
                        {project.tech.slice(0, 3).join(" · ")}
                      </span>
                    </span>
                    <span className="t-display text-[2.25rem] leading-none text-[hsl(var(--tl-dim))]/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {selected !== null && (
        <ProjectDrawer
          project={projects[selected]}
          index={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  )
}
