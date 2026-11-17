"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import ShotImage from "./ShotImage"
import { X, ExternalLink, Github } from "lucide-react"
import { gsap } from "@/lib/gsap"
import { lockScroll, unlockScroll } from "@/lib/scroll-lock"
import { galleryFor } from "@/lib/project-gallery"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"
import { useLanguage } from "@/app/hooks/useLanguage"

export type DrawerProject = {
  id: string
  title: string
  description: string
  longDescription?: string
  tech: string[]
  image: string
  highlights?: { title: string; description?: string; desc?: string }[]
  impact?: string[]
  /** "#" means there is nothing public to link to, so the button is dropped. */
  link?: string
  github?: string
}

const FOCUSABLE = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'

/** Several projects carry "#" as a placeholder rather than a real URL. */
const hasLink = (url?: string) => Boolean(url && url !== "#")

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
  const stage = useRef<HTMLDivElement>(null)
  const closing = useRef(false)

  const [headline, ...rest] = project.title.split("–")
  const subline = rest.join("–").trim()

  const shots = galleryFor(project.id, project.image)
  const [shot, setShot] = useState(0)

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

  // Cross-fade the main shot when a thumbnail is picked. Swapping the src with
  // no transition reads as a glitch rather than a deliberate change.
  useEffect(() => {
    if (!stage.current) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    gsap.fromTo(stage.current, { autoAlpha: 0.35 }, { autoAlpha: 1, duration: 0.35 })
  }, [shot])

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
          {/* TemPad status bar */}
          <div className="drawer-status">
            <span>
              TEMPAD // {vi ? "HỒ SƠ" : "FILE"} {String(index + 1).padStart(2, "0")}
            </span>
            <button type="button" onClick={close} className="drawer-close" aria-label={vi ? "Đóng" : "Close"}>
              ESC <X size={14} aria-hidden />
            </button>
          </div>

          <div ref={stage} className="frame drawer-shot mt-5 aspect-[16/10]">
            <ShotImage
              key={shots[shot]}
              src={shots[shot]}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 92vw, 44rem"
              className="object-cover object-top"
            />
            {shots.length > 1 && (
              <span className="drawer-shot-tag" aria-hidden>
                {vi ? "ẢNH" : "SHOT"} {String(shot + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
              </span>
            )}
          </div>

          {shots.length > 1 && (
            <div className="drawer-thumbs">
              {shots.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  data-cursor
                  onClick={() => setShot(i)}
                  aria-label={`${vi ? "Ảnh" : "Image"} ${i + 1}`}
                  aria-current={i === shot}
                  className={`frame drawer-thumb ${i === shot ? "is-active" : ""}`}
                >
                  <ShotImage src={src} alt="" fill sizes="7rem" className="object-cover object-top" />
                </button>
              ))}
            </div>
          )}

          <h2 className="t-display drawer-title">{headline.trim()}</h2>
          {subline && <p className="drawer-subline">{subline}</p>}

          <p className="drawer-body">{project.longDescription ?? project.description}</p>

          {project.highlights && project.highlights.length > 0 && (
            <section className="drawer-section">
              <h3 className="drawer-label">&gt; {t.projectDetail.highlights}</h3>
              <ol className="drawer-highlights">
                {project.highlights.slice(0, 3).map((h, i) => (
                  <li key={h.title}>
                    <span className="drawer-hl-num" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="drawer-hl-title">{h.title}</h4>
                      <p className="drawer-hl-desc">{h.description ?? h.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {project.impact && project.impact.length > 0 && (
            <section className="drawer-section">
              <h3 className="drawer-label">&gt; {t.projectDetail.impact}</h3>
              <ul className="drawer-impact">
                {project.impact.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="drawer-section">
            <h3 className="drawer-label">&gt; {t.projectActions.techStack}</h3>
            <ul className="drawer-tech">
              {project.tech.map((tech) => (
                <li key={tech} className="warp-chip">
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          {(hasLink(project.link) || hasLink(project.github)) && (
            <div className="drawer-actions">
              {hasLink(project.link) && (
                <a href={project.link} target="_blank" rel="noreferrer" data-cursor className="drawer-btn is-solid">
                  {t.projectActions.visit}
                  <ExternalLink size={14} aria-hidden />
                </a>
              )}
              {hasLink(project.github) && (
                <a href={project.github} target="_blank" rel="noreferrer" data-cursor className="drawer-btn">
                  {t.projectActions.github}
                  <Github size={14} aria-hidden />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
