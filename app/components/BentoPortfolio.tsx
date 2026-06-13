"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/app/hooks/useLanguage"
import Image from "next/image"
import Link from "next/link"
import RevealText from "./RevealText"
import Magnetic from "./Magnetic"
import { ArrowUpRight, Zap, Code2, Layers, Heart, ArrowRight } from "lucide-react"

// --- Types ---
interface Service {
  name: string
  description: string
}

// --- Sub-component: Animated Counter ---
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const startTime = Date.now()
          const tick = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          tick()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="text-5xl md:text-7xl font-outfit font-black tracking-tighter">
      {count}{suffix}
    </div>
  )
}

// --- Sub-component: Marquee ---
function InfiniteMarquee({ items, speed = 20, reverse = false, className = "" }: { items: string[], speed?: number, reverse?: boolean, className?: string }) {
  return (
    <div className={`overflow-hidden flex w-full select-none ${className}`}>
      <motion.div
        className="flex whitespace-nowrap min-w-full"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
      >
        {/* Double the items to create an infinite loop effect */}
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="mx-4 md:mx-8 text-2xl md:text-5xl font-outfit font-black uppercase tracking-tighter opacity-80 shrink-0">
            {item} •
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// --- Sub-component: BentoCard ---
function BentoCard({
  children,
  className = "",
  span = "md:col-span-12",
  id,
  delay = 0
}: {
  children: React.ReactNode,
  className?: string,
  span?: string,
  id?: string,
  delay?: number
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      onMouseMove={handleMouseMove}
      className={`group bento-card p-6 md:p-10 ${span} ${className} relative overflow-hidden`}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, var(--spotlight-color), transparent 50%)`
        }}
      />
      <div className="relative z-10 h-full w-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  )
}

export default function BentoPortfolio() {
  const { t, language } = useLanguage()
  const [activeService, setActiveService] = useState<Service | null>(null)

  const isVi = language === "vi"
  const allSkills = [...t.skills.core, ...t.skills.secondary, ...t.skills.others]

  return (
    <div className="max-w-[100rem] mx-auto px-4 py-24 md:py-32 sm:px-6 lg:px-8 min-h-screen relative">


      {/* DYNAMIC ASYMMETRICAL GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-auto gap-4 md:gap-6 w-full">

        {/* HERO BLOCK */}
        <BentoCard delay={0.1} span="md:col-span-12 lg:col-span-8" className="bg-primary text-primary-foreground flex flex-col justify-between overflow-hidden relative min-h-[400px]">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <svg width="200" height="200" viewBox="0 0 100 100" className="animate-spin-slow">
              <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 50 50)" />
            </svg>
          </div>
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-outfit uppercase leading-[0.9] tracking-tighter mb-6">
              <RevealText text={t.hero.title} />
            </h1>
            <p className="text-xl md:text-2xl font-medium opacity-90 max-w-md">
              {t.hero.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-12 relative z-10">
            <Magnetic>
              <Link href="/#projects" className="group flex items-center gap-3 bg-background text-foreground px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[hsl(var(--accent))] hover:text-background transition-all">
                {t.hero.viewWork} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/about" className="group flex items-center gap-3 bg-transparent border-2 border-background/30 text-background px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:border-background transition-all">
                {t.nav.about}
              </Link>
            </Magnetic>
          </div>
        </BentoCard>

        {/* PORTRAIT (Sticky right, takes 4 cols) */}
        <BentoCard delay={0.2} span="md:col-span-4 lg:col-span-4" className="!p-0 aspect-[3/4] overflow-hidden group/portrait border-[hsl(var(--emblemo-pink))]/20">
          <Image
            src="/avatar.jpg"
            alt={t.name}
            fill
            className="object-cover filter grayscale group-hover/portrait:grayscale-0 group-hover/portrait:scale-105 transition-all duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-white z-10">
            <p className="font-outfit font-black text-3xl mb-1">{t.name}</p>
            <p className="text-sm font-medium tracking-widest uppercase opacity-80 text-[hsl(var(--accent))]">{t.hero.role}</p>
          </div>
        </BentoCard>

        {/* INFINITE MARQUEE STRIP */}
        <BentoCard delay={0.3} span="md:col-span-12" className="bg-[hsl(var(--emblemo-yellow))] text-black !py-8 !px-0 rounded-full my-4 shadow-[0_0_40px_rgba(254,206,7,0.3)]">
          <InfiniteMarquee items={allSkills} speed={40} reverse={false} />
        </BentoCard>

        {/* METRICS (2 Columns) */}
        <BentoCard delay={0.4} span="md:col-span-6 lg:col-span-3" className="bg-foreground text-background justify-between min-h-[300px]">
          <div className="p-3 bg-background/10 rounded-full w-fit mb-8 text-[hsl(var(--accent))]"><Zap size={24} /></div>
          <div>
            <AnimatedCounter target={t.portfolio.projects.length || 10} suffix="+" />
            <div className="text-sm font-medium text-background/70 mt-2 uppercase tracking-widest">{t.nav.projects}</div>
          </div>
        </BentoCard>
        <BentoCard delay={0.5} span="md:col-span-6 lg:col-span-3" className="bg-primary text-primary-foreground justify-between min-h-[300px]">
          <div className="p-3 bg-background/10 rounded-full w-fit mb-8 text-[hsl(var(--emblemo-yellow))]"><Code2 size={24} /></div>
          <div>
            <AnimatedCounter target={14} suffix="+" />
            <div className="text-sm font-medium text-primary-foreground/80 mt-2 uppercase tracking-widest">{t.skills.title}</div>
          </div>
        </BentoCard>

        {/* ABOUT NARRATIVE (Massive square) */}
        <BentoCard delay={0.6} span="md:col-span-12 lg:col-span-6" className="bg-secondary/60 backdrop-blur-xl text-foreground min-h-[300px] border-[hsl(var(--accent))]/30 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 rounded-full bg-[hsl(var(--emblemo-pink))] text-white flex items-center justify-center">
              <Heart size={28} />
            </div>
            <h3 className="text-4xl font-outfit font-bold text-foreground">{t.about.title}</h3>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10">
            {t.about.description1}
          </p>
          <div className="pl-8 border-l-4 border-[hsl(var(--accent))]">
            <p className="text-lg text-foreground font-medium italic">
              "{t.about.description2}"
            </p>
          </div>
        </BentoCard>

        {/* PROJECTS HEADER STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="md:col-span-12 mt-32 mb-12 flex flex-row items-end justify-between"
        >
          <h2 className="text-6xl md:text-8xl font-outfit font-black tracking-tighter text-foreground uppercase pb-4">
            {isVi ? "Dự Án" : "Work"}
          </h2>
        </motion.div>

        {/* SERVICES PILLAR (Left side, sticky-like, 4 cols) */}
        <BentoCard delay={0.3} span="md:col-span-12 lg:col-span-4" className="bg-secondary/60 backdrop-blur-xl text-foreground flex flex-col justify-start h-full border-[hsl(var(--emblemo-yellow))]/20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-outfit font-black uppercase text-foreground">
              {t.services.title}
            </h3>
            <Layers size={28} className="text-[hsl(var(--emblemo-yellow))]" />
          </div>

          <div className="flex flex-col gap-3">
            {t.services.items.map((service: Service, i: number) => (
              <div
                key={service.name}
                onMouseEnter={() => setActiveService(service)}
                onMouseLeave={() => setActiveService(null)}
                className="group/service p-4 rounded-2xl bg-background border border-transparent hover:border-[hsl(var(--accent))] transition-all cursor-crosshair relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[hsl(var(--accent))]/5 translate-y-full group-hover/service:translate-y-0 transition-transform duration-300 ease-out" />
                <div className="relative z-10 flex flex-col gap-1">
                  <div className="flex justify-between items-center text-muted-foreground group-hover/service:text-[hsl(var(--accent))] transition-colors">
                    <span className="font-outfit font-bold text-lg">0{i + 1}</span>
                    <ArrowUpRight size={18} className="opacity-0 -translate-x-4 group-hover/service:opacity-100 group-hover/service:translate-x-0 transition-all" />
                  </div>
                  <span className="font-outfit font-bold text-xl text-foreground group-hover/service:text-foreground transition-colors">{service.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Service Tooltip Box */}
          <div className="mt-8 p-6 bg-background rounded-2xl border border-border min-h-[120px] flex items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeService ? activeService.name : "empty"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-muted-foreground"
              >
                {activeService ? activeService.description : (isVi ? "Di chuột vào một dịch vụ để xem chi tiết." : "Hover over a service to see details.")}
              </motion.p>
            </AnimatePresence>
          </div>
        </BentoCard>

        {/* PROJECTS GRID (Right side, 8 cols, masonry style) */}
        <div className="md:col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {t.portfolio.projects.map((proj: any, index: number) => (
            <BentoCard
              key={proj.id}
              delay={0.4 + (index * 0.1)}
              span={index === 0 ? "md:col-span-2" : "md:col-span-1"}
              className="group/project flex flex-col !p-0 border-none overflow-hidden"
            >
              <Link href={`/projects/${proj.id}`} className="absolute inset-0 z-30"></Link>

              {/* Image is massive, fills the card */}
              <div className={`w-full relative bg-secondary/60 backdrop-blur-xl flex-shrink-0 ${index === 0 ? 'h-[400px]' : 'h-[300px]'}`}>
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover/project:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover/project:bg-transparent transition-colors duration-500" />

                {/* Floating tags */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20">
                  {proj.tech.slice(0, 3).map((tech: string) => (
                    <span key={tech} className="px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-foreground">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Floating Action Button */}
                <div className="absolute bottom-6 right-6 z-20">
                  <Magnetic>
                    <div className="w-16 h-16 rounded-full bg-background border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                      <ArrowUpRight size={28} className="group-hover:rotate-45 transition-transform" />
                    </div>
                  </Magnetic>
                </div>
              </div>

              {/* Content overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8 pt-32 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10 pointer-events-none">
                <div className="transform transition-transform duration-500 group-hover/project:-translate-y-2">
                  <h3 className="text-2xl md:text-3xl font-outfit font-bold text-white mb-3 leading-tight">
                    {proj.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/80 line-clamp-2 opacity-80 group-hover/project:opacity-100 transition-opacity duration-500 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>

      </div>
    </div>
  )
}
