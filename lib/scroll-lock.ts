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
}

export function lockScroll() {
  if (depth++ > 0) return
  const gutter = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = "hidden"
  if (gutter > 0) document.body.style.paddingRight = `${gutter}px`
  instance?.stop()
}

export function unlockScroll() {
  if (--depth > 0) return
  depth = Math.max(0, depth)
  document.body.style.overflow = ""
  document.body.style.paddingRight = ""
  instance?.start()
}
