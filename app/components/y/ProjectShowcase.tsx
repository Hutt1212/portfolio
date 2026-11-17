"use client"

import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import ShotImage from "./ShotImage"
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
  const listRef = useRef<HTMLUListElement>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [active, setActive] = useState(0)
  const closing = useRef(false)

  const projects: DrawerProject[] = t.portfolio.projects
  const current = projects[active]
  const [headline, ...rest] = current.title.split("–")
  const subline = rest.join("–").trim()
  const total = String(projects.length).padStart(2, "0")

  const close = () => {
    if (closing.current) return
    closing.current = true

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return onClose()

    gsap.timeline({ onComplete: onClose }).to(root.current, { autoAlpha: 0, duration: 0.35 })
  }

  useIsomorphicLayoutEffect(() => {
    lockScroll()

    // Warm the cache so hovering through the list swaps the preview instantly.
    projects.forEach((p) => {
      const img = new window.Image()
      img.src = p.image
    })

    // Focus the first file so the keyboard works straight away. It has to wait
    // until the dialog is visible: GSAP holds it at visibility:hidden while
    // its opacity is 0, and a hidden element cannot take focus.
    const focusFirst = () =>
      listRef.current?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true })

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      focusFirst()
    } else {
      // fromTo, not from: the end state is stated outright and cannot be
      // inferred wrong from a mid-animation measurement.
      gsap
        .timeline()
        .fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 })
        // The device "switches on": a CRT line that opens into the panel.
        .fromTo(
          ".casefile-screen",
          { scaleY: 0.015, scaleX: 0.7, filter: "brightness(2.6)" },
          { scaleY: 1, scaleX: 1, filter: "brightness(1)", duration: 0.55, ease: "expo.out" },
          0.05
        )
        .fromTo(
          ".casefile-row, .casefile-reveal",
          { autoAlpha: 0, x: -10 },
          { autoAlpha: 1, x: 0, stagger: 0.06, duration: 0.3, ease: "steps(3)" },
          0.35
        )
        // After the rows themselves have been revealed (they start hidden too).
        .call(focusFirst)
    }

    return () => unlockScroll()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // While the drawer is open it owns the keyboard; this layer only reacts
      // when it is the top one.
      if (selected !== null) return
      if (e.key === "Escape") return close()

      // ↑ / ↓ walk the menu like the device's wheel, wherever focus is; focus
      // follows the highlight so Enter opens it.
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault()
        const next = (active + (e.key === "ArrowDown" ? 1 : -1) + projects.length) % projects.length
        setActive(next)
        listRef.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus({ preventScroll: true })
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  })

  /**
   * Touch has no hover: the first tap previews a file, the second opens it.
   * Whether the row was already highlighted is read at pointerdown — by the
   * time `click` fires, the tap's own focus event has highlighted it.
   */
  const wasActive = useRef(false)
  const touch = useRef(false)
  const onRowPointerDown = (e: React.PointerEvent, i: number) => {
    touch.current = e.pointerType !== "mouse"
    wasActive.current = i === active
  }
  const onRowClick = (i: number) => {
    setActive(i)
    if (touch.current && !wasActive.current) return
    setSelected(i)
  }

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
        <div data-lenis-prevent className={`showcase-stage ${selected !== null ? "is-dimmed" : ""}`}>
          <div className="tempad casefile">
            <div className="tempad-shell">
              <div className="tempad-bezel">
                <div className="casefile-screen" style={{ backgroundImage: "url(/tempad/screen.png)" }}>
                  {/* Status bar */}
                  <div className="casefile-status">
                    <span>
                      <span className="casefile-brand">TEMPAD // </span>
                      {vi ? "HỒ SƠ DỰ ÁN" : "CASE FILES"}
                    </span>
                    <span className="casefile-status-icons">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/tempad/playing.png" alt="" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/tempad/bluetooth.png" alt="" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/tempad/bt4.png" alt="" className="casefile-battery" />
                      <button type="button" onClick={close} className="casefile-close" aria-label={vi ? "Đóng" : "Close"}>
                        ESC ✕
                      </button>
                    </span>
                  </div>

                  {/* Menu */}
                  <div className="casefile-menu">
                    <div className="casefile-title casefile-reveal">
                      &gt; {vi ? "CHỌN MỘT DÒNG THỜI GIAN" : "SELECT A TIMELINE"}
                    </div>

                    <ul ref={listRef} className="casefile-list" aria-label={t.portfolio.title}>
                      {projects.map((project, i) => (
                        <li key={project.id}>
                          <button
                            type="button"
                            data-cursor
                            aria-haspopup="dialog"
                            aria-current={i === active ? "true" : undefined}
                            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                            onPointerDown={(e) => onRowPointerDown(e, i)}
                            onFocus={() => setActive(i)}
                            onClick={() => onRowClick(i)}
                            className={`casefile-row ${i === active ? "is-active" : ""}`}
                          >
                            <span className="casefile-row-num">{String(i + 1).padStart(2, "0")}</span>
                            <span className="casefile-row-label">{project.title.split("–")[0].trim()}</span>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/tempad/arrow.png" alt="" className="casefile-arrow" />
                          </button>
                        </li>
                      ))}
                    </ul>

                    <dl className="casefile-meta casefile-reveal" aria-live="polite">
                      <div>
                        <dt>{vi ? "HỒ SƠ" : "FILE"}</dt>
                        <dd>{headline.trim()}</dd>
                      </div>
                      {subline && (
                        <div>
                          <dt>{vi ? "MÔ TẢ" : "BRIEF"}</dt>
                          <dd>{subline}</dd>
                        </div>
                      )}
                      <div>
                        <dt>STACK</dt>
                        <dd>{current.tech.slice(0, 4).join(" · ")}</dd>
                      </div>
                      <div className="casefile-log">
                        <dt>LOG</dt>
                        <dd>{current.description}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Preview */}
                  <button
                    type="button"
                    data-cursor
                    tabIndex={-1}
                    onClick={() => setSelected(active)}
                    className="casefile-preview casefile-reveal"
                    aria-label={`${vi ? "Mở" : "Open"} ${headline.trim()}`}
                  >
                    <span className="frame casefile-frame">
                      <ShotImage
                        key={current.image}
                        src={current.image}
                        alt={current.title}
                        fill
                        sizes="(max-width: 768px) 90vw, 560px"
                        className="casefile-art object-cover object-top"
                      />
                    </span>
                    <span className="casefile-tag">
                      {vi ? "HỒ SƠ" : "FILE"} {String(active + 1).padStart(2, "0")} / {total} · {vi ? "MỞ" : "OPEN"} ▸
                    </span>
                  </button>

                  <div className="casefile-keys" aria-hidden>
                    ▲▼ {vi ? "CHỌN" : "SELECT"} &nbsp; ENTER {vi ? "MỞ" : "OPEN"} &nbsp; ESC {vi ? "THOÁT" : "BACK"}
                  </div>
                  <div className="casefile-sector" aria-hidden>
                    <span>/EARTH-616</span>
                    <span>SACRED TIMELINE</span>
                  </div>

                  <div aria-hidden className="tempad-scan" />
                </div>
              </div>

              <div className="tempad-foot" aria-hidden>
                <span className="tempad-led" />
                <span>TVA · TEMPAD</span>
                <span className="tempad-grille" />
              </div>
            </div>
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
