"use client"

import { useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"

type Props = {
  /** "fixed" fills the viewport behind a whole page; "contained" fills its section. */
  variant?: "fixed" | "contained"
  /** Element the zoom-in scrub is measured against. Defaults to the canvas box. */
  scrollTriggerRef?: React.RefObject<HTMLElement | null>
  /** 0-1 overall brightness. Page headers run dim so copy stays first. */
  intensity?: number
}

const STRAND_COUNT = 640
const PULSE_COUNT = 60
/** More steps = curvier strands. Too few and they read as straight sparks. */
const STEPS = 30

/* The core sits low so the upper two thirds — where all the copy lives —
   stay dark enough to read against, and off-centre because a bright bar
   centred in frame with strands fanning symmetrically out of it reads as
   anatomy long before it reads as a timeline. Everything below exists to
   break that symmetry. */
const CORE_X = 0.43
const CORE_Y = 0.71
/** The timeline runs on a slant, the way it does in the finale shot. */
const CORE_ANGLE = -0.17
/** Fraction of the frame width the strand origins are spread along. A narrow
    band bunches them into a tuft at one point; the line needs to be a line. */
const CORE_SPREAD = 0.9

/* The baked backdrop is drawn larger than the canvas so that rotating and
   panning it can never swing an edge into frame — that shows up as a hard
   diagonal seam. The margin must cover PAN_MAX plus the rotation swing. */
const OVERSCAN = 1.4
/** Fraction of viewport height the backdrop drifts across the scroll. */
const PAN_MAX = 0.08

type Strand = { pts: Float32Array; hue: number; alpha: number; width: number }

/**
 * The Sacred Timeline, drawn on canvas.
 *
 * Structure is expensive but static, so every strand is rendered once into an
 * offscreen buffer; each frame only composites that buffer (with a slow drift
 * and a scroll-driven zoom) and draws the handful of travelling pulses on top.
 * Re-stroking 600 curved paths per frame would cost far more and look the same.
 */
export default function TimeStream({
  variant = "contained",
  scrollTriggerRef,
  intensity = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const holderRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (!canvasRef.current || !holderRef.current) return

    // Explicitly typed aliases: the hoisted helpers below are function
    // declarations, and TypeScript drops narrowing inside those.
    const canvas: HTMLCanvasElement = canvasRef.current
    const holder: HTMLElement = holderRef.current

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let w = 0
    let h = 0
    let dpr = 1
    let strands: Strand[] = []
    let pulses: Strand[] = []
    let backdrop: HTMLCanvasElement | null = null

    /**
     * Angles cluster around the timeline's own axis so the bundle reads as a
     * stream. Heavily biased downstream: an even split either way produces a
     * mirror-symmetric fan, which is the shape to avoid.
     */
    const pickAngle = () => {
      const side = Math.random() < 0.78 ? 0 : Math.PI
      // Narrower than a symmetric fan, and skewed so the spread is lopsided.
      const off = (Math.random() - 0.42) * Math.PI * 0.44
      return CORE_ANGLE + side + off
    }

    function buildStrand(): Strand {
      const a0 = pickAngle()
      // Short reach: long strands stretch into straight scratches, which read as
      // speed lines rather than filaments.
      const reach = (0.16 + Math.random() * 0.42) * Math.max(w, h) * 0.4
      const pts = new Float32Array((STEPS + 1) * 2)

      // Strands start spread along the whole length of the core, not from a
      // point near its middle — that bunching is what turned the base into a
      // tuft. The range is deliberately lopsided (-0.55 to +1.05 of half the
      // span) so density trails off downstream instead of mirroring.
      const along = (Math.random() * 1.6 - 0.55) * w * CORE_SPREAD * 0.5
      const across = (Math.random() - 0.5) * h * 0.03
      let x = CORE_X * w + Math.cos(CORE_ANGLE) * along - Math.sin(CORE_ANGLE) * across
      let y = CORE_Y * h + Math.sin(CORE_ANGLE) * along + Math.cos(CORE_ANGLE) * across
      let a = a0

      pts[0] = x
      pts[1] = y

      for (let s = 1; s <= STEPS; s++) {
        // Strong wander so every strand curls; this is what separates hair
        // from sparks.
        a += (Math.random() - 0.5) * 0.4
        x += (Math.cos(a) * reach) / STEPS
        // Vertical squash keeps the fan wide and shallow like the reference.
        y += (Math.sin(a) * reach * 0.58) / STEPS
        pts[s * 2] = x
        pts[s * 2 + 1] = y
      }

      return {
        pts,
        hue: 20 + Math.random() * 26,
        alpha: 0.02 + Math.random() * 0.1,
        width: 0.4 + Math.random() * 0.8,
      }
    }

    function strokeStrand(c: CanvasRenderingContext2D, st: Strand, alpha: number, width: number) {
      c.beginPath()
      c.moveTo(st.pts[0], st.pts[1])
      for (let s = 1; s <= STEPS; s++) c.lineTo(st.pts[s * 2], st.pts[s * 2 + 1])
      c.strokeStyle = `hsla(${st.hue}, 100%, ${62 + st.alpha * 90}%, ${alpha})`
      c.lineWidth = width
      c.stroke()
    }

    /** Nebula, core and every strand, baked once. */
    function buildBackdrop() {
      const off = document.createElement("canvas")
      off.width = canvas.width
      off.height = canvas.height
      const c = off.getContext("2d")
      if (!c) return null
      c.scale(dpr, dpr)

      // Deep void base.
      c.fillStyle = "#07060c"
      c.fillRect(0, 0, w, h)

      // Nebula clouds, kept low and dim: they are atmosphere, not subject.
      const clouds: [number, number, number, string][] = [
        [0.34, 0.72, 0.42, "rgba(255,120,40,0.10)"],
        [0.7, 0.8, 0.38, "rgba(180,70,220,0.08)"],
        [0.5, 0.74, 0.5, "rgba(255,170,60,0.07)"],
        [0.86, 0.6, 0.3, "rgba(90,140,255,0.05)"],
      ]
      c.globalCompositeOperation = "lighter"
      for (const [px, py, r, color] of clouds) {
        const g = c.createRadialGradient(w * px, h * py, 0, w * px, h * py, Math.max(w, h) * r)
        g.addColorStop(0, color)
        g.addColorStop(1, "rgba(0,0,0,0)")
        c.fillStyle = g
        c.fillRect(0, 0, w, h)
      }

      // Distant specks, a few tinted like the stray timelines in the shot.
      for (let i = 0; i < 220; i++) {
        const sx = Math.random() * w
        const sy = Math.random() * h
        const r = Math.random() * 1.3
        const tint = Math.random()
        c.fillStyle =
          tint > 0.93
            ? "rgba(120,255,230,0.5)"
            : tint > 0.86
              ? "rgba(140,180,255,0.45)"
              : `rgba(255,225,190,${0.15 + Math.random() * 0.4})`
        c.beginPath()
        c.arc(sx, sy, r, 0, Math.PI * 2)
        c.fill()
      }

      // Strands.
      for (const st of strands) strokeStrand(c, st, st.alpha, st.width)

      // The core. Two things matter here and both are about shape, not colour:
      // it runs past both edges of the frame so it reads as a line passing
      // through rather than an object sitting in the middle, and its bright
      // stretch is off to one side so there is no symmetric hot centre.
      // It also never reaches pure white — a blown-out core swallows the frame.
      const cx = CORE_X * w
      const cy = CORE_Y * h
      const half = w * 0.85

      c.save()
      c.translate(cx, cy)
      c.rotate(CORE_ANGLE)

      const core = c.createLinearGradient(-half, 0, half, 0)
      core.addColorStop(0, "rgba(255,120,30,0)")
      core.addColorStop(0.22, "rgba(255,150,50,0.14)")
      core.addColorStop(0.4, "rgba(255,225,190,0.38)")
      core.addColorStop(0.56, "rgba(255,180,75,0.2)")
      core.addColorStop(0.82, "rgba(255,130,40,0.07)")
      core.addColorStop(1, "rgba(255,120,30,0)")
      c.fillStyle = core
      c.fillRect(-half, -h * 0.01, half * 2, h * 0.02)

      // Glow stretched along the axis instead of a round hotspot, and pushed
      // off the midpoint. A circular bloom centred on the bar is what made the
      // whole thing converge on one point.
      c.save()
      c.translate(-w * 0.1, 0)
      c.scale(1, 0.26)
      const bloom = c.createRadialGradient(0, 0, 0, 0, 0, w * 0.5)
      bloom.addColorStop(0, "rgba(255,225,180,0.17)")
      bloom.addColorStop(0.45, "rgba(255,150,50,0.07)")
      bloom.addColorStop(1, "rgba(0,0,0,0)")
      c.fillStyle = bloom
      c.fillRect(-w, -w, w * 2, w * 2)
      c.restore()

      c.restore()

      // Vignette: pulls the edges down so nothing competes with the copy.
      c.globalCompositeOperation = "source-over"
      const vig = c.createRadialGradient(cx, cy, Math.min(w, h) * 0.2, cx, cy, Math.max(w, h) * 0.78)
      vig.addColorStop(0, "rgba(7,6,12,0)")
      vig.addColorStop(1, "rgba(7,6,12,0.82)")
      c.fillStyle = vig
      c.fillRect(0, 0, w, h)

      return off
    }

    function resize() {
      const rect = holder.getBoundingClientRect()
      w = Math.max(1, rect.width)
      h = Math.max(1, variant === "fixed" ? window.innerHeight : rect.height)
      // Capping DPR keeps the one-time bake affordable on high-density screens.
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      strands = Array.from({ length: STRAND_COUNT }, buildStrand)
      pulses = strands.slice(0, PULSE_COUNT)
      backdrop = buildBackdrop()
    }

    resize()

    // Scroll drives a slow push into the stream.
    const state = { zoom: 1, spin: 0, heat: 1, pan: 0 }
    let st: ScrollTrigger | null = null

    if (!reduced) {
      st = ScrollTrigger.create({
        trigger: scrollTriggerRef?.current ?? holder,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          // Gentle zoom only. A big scale factor stretches every strand into a
          // straight streak, which is what made this read as speed lines.
          state.zoom = 1 + self.progress * 0.16
          state.spin = self.progress * 0.03
          // The core drifts up and cools as you travel, so the scene actually
          // changes instead of looking like a static wallpaper.
          state.pan = -self.progress * PAN_MAX
          state.heat = 1 - self.progress * 0.45
        },
      })
    }

    let t = 0
    const render = () => {
      if (!ctx || !backdrop) return
      t += 0.016

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.globalCompositeOperation = "source-over"
      ctx.fillStyle = "#07060c"
      ctx.fillRect(0, 0, w, h)

      // Composite the baked structure with drift + scroll zoom.
      const breathe = reduced ? 1 : 1 + Math.sin(t * 0.35) * 0.012
      const scale = state.zoom * breathe
      const panY = state.pan * h

      ctx.save()
      ctx.globalAlpha = intensity
      ctx.translate(w / 2, h / 2 + panY)
      ctx.rotate(state.spin)
      ctx.scale(scale * OVERSCAN, scale * OVERSCAN)
      ctx.translate(-w / 2, -h / 2)
      ctx.drawImage(backdrop, 0, 0, w, h)
      ctx.restore()

      if (reduced) return

      // Travelling pulses: a bright head sliding out along real strand paths.
      ctx.save()
      ctx.translate(w / 2, h / 2 + panY)
      ctx.rotate(state.spin)
      ctx.scale(scale * OVERSCAN, scale * OVERSCAN)
      ctx.translate(-w / 2, -h / 2)
      ctx.globalCompositeOperation = "lighter"
      ctx.globalAlpha = intensity

      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i]
        const speed = 0.09 + (i % 7) * 0.014
        const head = (t * speed + i * 0.137) % 1.25
        const seg = Math.floor(head * STEPS)
        if (seg < 1 || seg > STEPS) continue

        const tail = Math.max(0, seg - 4)
        ctx.beginPath()
        ctx.moveTo(p.pts[tail * 2], p.pts[tail * 2 + 1])
        for (let s = tail + 1; s <= seg; s++) ctx.lineTo(p.pts[s * 2], p.pts[s * 2 + 1])
        const fade = 1 - head / 1.25
        ctx.strokeStyle = `hsla(${p.hue + 12}, 100%, 80%, ${0.26 * fade * state.heat})`
        ctx.lineWidth = p.width * 1.5
        ctx.stroke()
      }

      // Core flicker rides on top, kept subtle. Stretched and offset to match
      // the baked glow — a round pulse here would put back the hotspot the
      // bake just got rid of.
      const flick = 0.7 + Math.sin(t * 2.3) * 0.05 + Math.sin(t * 7.1) * 0.025
      ctx.save()
      ctx.translate(CORE_X * w, CORE_Y * h)
      ctx.rotate(CORE_ANGLE)
      ctx.translate(-w * 0.1, 0)
      ctx.scale(1, 0.24)
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 0.42)
      g.addColorStop(0, `rgba(255,240,215,${0.14 * flick * state.heat})`)
      g.addColorStop(0.45, `rgba(255,160,60,${0.06 * flick})`)
      g.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = g
      ctx.fillRect(-w, -w, w * 2, w * 2)
      ctx.restore()

      ctx.restore()
    }

    gsap.ticker.add(render)

    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        resize()
        ScrollTrigger.refresh()
      }, 180)
    }
    window.addEventListener("resize", onResize)

    return () => {
      gsap.ticker.remove(render)
      window.removeEventListener("resize", onResize)
      window.clearTimeout(resizeTimer)
      st?.kill()
    }
  }, [variant, intensity])

  return (
    <div ref={holderRef} className={variant === "fixed" ? "ts-canvas-fixed" : "ts-canvas-contained"}>
      <canvas ref={canvasRef} aria-hidden />
    </div>
  )
}
