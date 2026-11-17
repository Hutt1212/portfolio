"use client"

import type Lenis from "lenis"

/**
 * The drawer needs the page behind it to stop moving. Lenis owns the window
 * scroll, so `overflow: hidden` alone is not enough — Lenis would keep writing
 * scroll positions. SmoothScroll registers its instance here so overlays can
 * pause it, and the page keeps its scrollbar gutter so nothing shifts sideways
 * when it disappears.
 */
let instance: Lenis | null = null
let depth = 0

export function registerLenis(l: Lenis | null) {
  instance = l
  // A lock taken before Lenis existed (the preloader mounts first) must still hold.
  if (l && depth > 0) l.stop()
}

export function lockScroll() {
  if (depth++ > 0) return
  const gutter = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = "hidden"
  if (gutter > 0) document.body.style.paddingRight = `${gutter}px`
  instance?.stop()
}

export function unlockScroll() {
  if (depth === 0) return
  if (--depth > 0) return
  document.body.style.overflow = ""
  document.body.style.paddingRight = ""
  instance?.start()
}

/** Smooth scroll to the top through Lenis when it is driving the page. */
export function scrollToTop() {
  if (instance) instance.scrollTo(0, { duration: 1.4 })
  else window.scrollTo({ top: 0, behavior: "smooth" })
}
