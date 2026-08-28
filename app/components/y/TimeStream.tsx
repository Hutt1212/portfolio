"use client"

import React, { useRef, useEffect } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect"
import { useTimelineTheme, TIMELINE_THEMES, type TimelineThemeKey } from "@/app/context/TimelineThemeContext"

type Props = {
  /** "fixed" fills the viewport behind a whole page; "contained" fills its section. */
  variant?: "fixed" | "contained"
  /** Element the zoom-in scrub is measured against. Defaults to the canvas box. */
  scrollTriggerRef?: React.RefObject<HTMLElement | null>
  /** 0-1 overall brightness. */
  intensity?: number
  /** Force a specific theme instead of listening to the global context */
  overrideTheme?: TimelineThemeKey
}

const STRAND_COUNT = 60
const PARTICLE_COUNT = 35

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "")
  if (clean.length === 3) {
    return [
      parseInt(clean[0] + clean[0], 16),
      parseInt(clean[1] + clean[1], 16),
      parseInt(clean[2] + clean[2], 16),
    ]
  }
  return [
    parseInt(clean.substring(0, 2), 16),
    parseInt(clean.substring(2, 4), 16),
    parseInt(clean.substring(4, 6), 16),
  ]
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function lerpRgb(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [
    lerp(a[0], b[0], t),
    lerp(a[1], b[1], t),
    lerp(a[2], b[2], t),
  ]
}

export default function TimeStream({
  variant = "contained",
  scrollTriggerRef,
  intensity = 1,
  overrideTheme,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const holderRef = useRef<HTMLDivElement>(null)
  const { activeTheme } = useTimelineTheme()
  const currentThemeKey = overrideTheme || activeTheme

  const themeKeyRef = useRef<TimelineThemeKey>(currentThemeKey)
  useEffect(() => {
    themeKeyRef.current = currentThemeKey
  }, [currentThemeKey])

  useIsomorphicLayoutEffect(() => {
    if (!canvasRef.current || !holderRef.current) return

    const canvas: HTMLCanvasElement = canvasRef.current
    const holder: HTMLElement = holderRef.current
    const raw = canvas.getContext("2d", { alpha: false })
    if (!raw) return
    const ctx: CanvasRenderingContext2D = raw

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let w = 0
    let h = 0

    // Theme Lerp State
    const initialConfig = TIMELINE_THEMES[themeKeyRef.current] || TIMELINE_THEMES.sacred
    const themeState = {
      mainRGB: hexToRgb(initialConfig.mainColor),
      glowRGB: hexToRgb(initialConfig.glowColor),
      coreRGB: hexToRgb(initialConfig.coreColor),
      voidRGB: hexToRgb(initialConfig.voidColor),
      particleRGB: hexToRgb(initialConfig.particleColor),
      treeFactor: initialConfig.isTree ? 1.0 : 0.0,
      amplitude: initialConfig.baseAmplitude,
      speedMultiplier: initialConfig.speedMultiplier,
      waveTurbulence: initialConfig.waveTurbulence,
      frequency: initialConfig.frequency,
    }

    let previousThemeKey = themeKeyRef.current

    // Fiber strands class
    class FiberStrand {
      index: number
      total: number
      radiusOffset: number
      freq: number
      phase: number
      spiralSpeed: number
      thickness: number
      alpha: number
      isCoreHighlight: boolean

      constructor(index: number, total: number) {
        this.index = index
        this.total = total
        this.radiusOffset = (Math.random() - 0.5) * 44
        this.freq = 0.0014 + Math.random() * 0.001
        this.phase = (this.index / this.total) * Math.PI * 4 + Math.random() * 0.6
        this.spiralSpeed = 0.8 + Math.random() * 0.55
        this.thickness = 0.8 + Math.random() * 1.5
        this.alpha = 0.22 + Math.random() * 0.55
        this.isCoreHighlight = index % 8 === 0
      }

      draw(time: number, scrollZoom: number, scrollPanY: number, mainStyle: string, coreStyle: string, glowStyle: string) {
        ctx.beginPath()

        const centerY = h * 0.52 + scrollPanY
        const step = 8
        const treeF = themeState.treeFactor
        const amp = themeState.amplitude * scrollZoom
        const speed = themeState.speedMultiplier
        const turb = themeState.waveTurbulence

        for (let x = 0; x <= w; x += step) {
          const progress = x / w

          // 1. Cable Braided Wave Math
          const wave1 = Math.sin(x * this.freq + time * 0.0009 * this.spiralSpeed * speed + this.phase) * (amp * 0.65)
          const wave2 = Math.cos(x * 0.0007 + time * 0.0003 * speed) * (amp * 0.35)
          const braidOffset = Math.sin(x * 0.0045 + this.phase) * this.radiusOffset

          const cableY = centerY + wave1 + wave2 + braidOffset

          // 2. Yggdrasil Tree Geometry Math
          const trunkCurve = Math.sin(progress * Math.PI) * (115 * scrollZoom)
          const branchSpread = Math.pow(Math.abs(progress - 0.5) * 2, 2) * (this.radiusOffset * 3.8)
          const treeNoise = Math.sin(x * 0.0028 + time * 0.0008 * speed + this.phase) * (amp * 0.4)
          const treeY = centerY - trunkCurve + branchSpread + treeNoise

          // Continuous blend between cable and Yggdrasil tree
          let y = (1 - treeF) * cableY + treeF * treeY

          if (turb > 0.4) {
            y += Math.sin(x * 0.006 + time * 0.0014 * speed + this.phase * 2) * (turb * 7)
          }

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.strokeStyle = this.isCoreHighlight ? coreStyle : mainStyle
        ctx.lineWidth = this.isCoreHighlight ? this.thickness + 1.2 : this.thickness
        ctx.globalAlpha = this.isCoreHighlight ? 0.9 * intensity : this.alpha * intensity

        if (this.isCoreHighlight) {
          ctx.shadowColor = glowStyle
          ctx.shadowBlur = 10
        } else {
          ctx.shadowBlur = 0
        }

        ctx.stroke()
      }
    }

    // Time Particles
    class ChronoParticle {
      x: number = 0
      y: number = 0
      vx: number = 0
      vy: number = 0
      size: number = 0

      constructor() {
        this.reset(true)
      }

      reset(initial = false) {
        this.x = initial ? Math.random() * w : -5
        this.y = Math.random() * h
        this.vx = 0.35 + Math.random() * 1.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.size = 0.8 + Math.random() * 2.0
      }

      update() {
        this.x += this.vx * themeState.speedMultiplier
        this.y += this.vy * themeState.speedMultiplier

        if (this.x > w + 10) {
          this.reset(false)
        }
      }
    }

    let fibers: FiberStrand[] = []
    let particles: ChronoParticle[] = []
    let stars: { x: number; y: number; r: number }[] = []

    function rebuildScene() {
      const rect = holder.getBoundingClientRect()
      w = canvas.width = Math.max(1, rect.width)
      h = canvas.height = Math.max(1, variant === "fixed" ? window.innerHeight : rect.height)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      fibers = Array.from({ length: STRAND_COUNT }, (_, i) => new FiberStrand(i, STRAND_COUNT))
      particles = Array.from({ length: PARTICLE_COUNT }, () => new ChronoParticle())
      stars = Array.from({ length: 80 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.4 + Math.pow(Math.random(), 3) * 1.4,
      }))
    }

    rebuildScene()

    // Scroll scrub driver
    const scrollState = { zoom: 1, panY: 0 }
    let st: ScrollTrigger | null = null

    if (!reduced) {
      st = ScrollTrigger.create({
        trigger: scrollTriggerRef?.current ?? holder,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          scrollState.zoom = 1 + self.progress * 0.16
          scrollState.panY = -self.progress * h * 0.08
        },
      })
    }

    // Render loop
    let startTime = Date.now()
    const render = () => {
      if (!ctx) return
      const time = Date.now() - startTime

      const targetKey = themeKeyRef.current
      const targetConfig = TIMELINE_THEMES[targetKey] || TIMELINE_THEMES.sacred

      if (targetKey !== previousThemeKey) {
        previousThemeKey = targetKey
      }

      // Continuous Smooth Lerp
      const lerpSpeed = 0.045
      const targetMain = hexToRgb(targetConfig.mainColor)
      const targetGlow = hexToRgb(targetConfig.glowColor)
      const targetCore = hexToRgb(targetConfig.coreColor)
      const targetVoid = hexToRgb(targetConfig.voidColor)
      const targetParticle = hexToRgb(targetConfig.particleColor)
      const targetTree = targetConfig.isTree ? 1.0 : 0.0

      themeState.mainRGB = lerpRgb(themeState.mainRGB, targetMain, lerpSpeed)
      themeState.glowRGB = lerpRgb(themeState.glowRGB, targetGlow, lerpSpeed)
      themeState.coreRGB = lerpRgb(themeState.coreRGB, targetCore, lerpSpeed)
      themeState.voidRGB = lerpRgb(themeState.voidRGB, targetVoid, lerpSpeed)
      themeState.particleRGB = lerpRgb(themeState.particleRGB, targetParticle, lerpSpeed)
      themeState.treeFactor = lerp(themeState.treeFactor, targetTree, lerpSpeed)
      themeState.amplitude = lerp(themeState.amplitude, targetConfig.baseAmplitude, lerpSpeed)
      themeState.speedMultiplier = lerp(themeState.speedMultiplier, targetConfig.speedMultiplier, lerpSpeed)
      themeState.waveTurbulence = lerp(themeState.waveTurbulence, targetConfig.waveTurbulence, lerpSpeed)
      themeState.frequency = lerp(themeState.frequency, targetConfig.frequency, lerpSpeed)

      // Solid void fill
      ctx.globalCompositeOperation = "source-over"
      ctx.shadowBlur = 0
      const vr = Math.round(themeState.voidRGB[0])
      const vg = Math.round(themeState.voidRGB[1])
      const vb = Math.round(themeState.voidRGB[2])
      ctx.fillStyle = `rgb(${vr},${vg},${vb})`
      ctx.fillRect(0, 0, w, h)

      // Cached Color Strings
      const mr = Math.round(themeState.mainRGB[0])
      const mg = Math.round(themeState.mainRGB[1])
      const mb = Math.round(themeState.mainRGB[2])
      const mainColorStyle = `rgb(${mr},${mg},${mb})`

      const cr = Math.round(themeState.coreRGB[0])
      const cg = Math.round(themeState.coreRGB[1])
      const cb = Math.round(themeState.coreRGB[2])
      const coreColorStyle = `rgb(${cr},${cg},${cb})`

      const gr = Math.round(themeState.glowRGB[0])
      const gg = Math.round(themeState.glowRGB[1])
      const gb = Math.round(themeState.glowRGB[2])
      const glowColorStyle = `rgb(${gr},${gg},${gb})`

      const pr = Math.round(themeState.particleRGB[0])
      const pg = Math.round(themeState.particleRGB[1])
      const pb = Math.round(themeState.particleRGB[2])
      const particleColorStyle = `rgb(${pr},${pg},${pb})`

      ctx.globalCompositeOperation = "lighter"

      // 1. Batch Distant Stars (1 draw call)
      ctx.fillStyle = "rgba(255,255,255,0.35)"
      ctx.globalAlpha = 0.8
      ctx.beginPath()
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        ctx.moveTo(s.x + s.r, s.y)
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      }
      ctx.fill()

      // 2. Draw Fibers
      fibers.forEach((f) => f.draw(time, scrollState.zoom, scrollState.panY, mainColorStyle, coreColorStyle, glowColorStyle))

      // 3. Batch Particles (1 draw call)
      ctx.fillStyle = particleColorStyle
      ctx.globalAlpha = 0.65 * intensity
      ctx.shadowBlur = 0
      ctx.beginPath()
      particles.forEach((p) => {
        p.update()
        ctx.moveTo(p.x + p.size, p.y)
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      })
      ctx.fill()

      // 4. Central Timeline Soft Core Glow
      const glowRadius = Math.max(w, h) * 0.32
      const coreGlow = ctx.createRadialGradient(
        w * 0.5,
        h * 0.52 + scrollState.panY,
        0,
        w * 0.5,
        h * 0.52 + scrollState.panY,
        glowRadius
      )
      coreGlow.addColorStop(0, `rgba(${gr},${gg},${gb},${0.12 * intensity})`)
      coreGlow.addColorStop(0.5, `rgba(${mr},${mg},${mb},${0.03 * intensity})`)
      coreGlow.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = coreGlow
      ctx.globalAlpha = 1
      ctx.fillRect(0, 0, w, h)
    }

    gsap.ticker.add(render)

    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        rebuildScene()
        ScrollTrigger.refresh()
      }, 120)
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
    <div
      ref={holderRef}
      className={variant === "fixed" ? "ts-canvas-fixed" : "ts-canvas-contained"}
    >
      {/* Fast 60-120fps Native Canvas Engine */}
      <canvas ref={canvasRef} aria-hidden className="block" />

      {/* Pure CSS Hardware-Accelerated TVA Grid & Vignette Overlay */}
      <div className="fixed inset-0 tva-bg-grid tva-vignette pointer-events-none z-0 opacity-80" />
    </div>
  )
}
