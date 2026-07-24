"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/app/hooks/useLanguage"

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const done = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduced) {
      setValue(target)
      return
    }

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return
        done.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1400, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(Math.round(eased * target))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target])

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const { t } = useLanguage()
  const s = t.street
  const techCount =
    t.skills.core.length + t.skills.secondary.length + t.skills.others.length

  const cells = [
    { value: t.portfolio.projects.length, suffix: "+", label: s.stats.projects, tone: "bg-card" },
    { value: techCount, suffix: "+", label: s.stats.tech, tone: "bg-volt text-volt-foreground" },
    { value: 6, suffix: "+", label: s.stats.months, tone: "bg-card" },
    { value: 98, suffix: "", label: s.stats.score, tone: "bg-flare text-flare-foreground" },
  ]

  return (
    <section className="mx-auto w-full max-w-[110rem] px-4 py-16 sm:px-6 md:py-28 lg:px-10">
      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
        {cells.map((cell, i) => (
          <motion.div
            key={cell.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            className={`slab shadow-hard flex flex-col justify-between gap-4 p-4 sm:p-6 md:p-8 ${cell.tone}`}
          >
            <span className="t-tag block leading-relaxed">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="font-display text-[clamp(2.75rem,9vw,6rem)] leading-[0.85]">
                <Counter target={cell.value} suffix={cell.suffix} />
              </div>
              <div className="t-tag mt-2 block leading-relaxed">{cell.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
