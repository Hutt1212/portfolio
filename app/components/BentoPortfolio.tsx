"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useLanguage } from "@/app/hooks/useLanguage"
import Image from "next/image"

import Link from "next/link"

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
          let start = 0
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
    <div ref={ref} className="text-4xl md:text-5xl font-black text-primary tracking-tighter">
      {count}{suffix}
    </div>
  )
}

// --- Sub-component: BentoCard ---
function BentoCard({
  children,
  className = "",
  span = "md:col-span-1",
  rows = "md:row-span-1",
  id
}: {
  children: React.ReactNode,
  className?: string,
  span?: string,
  rows?: string,
  id?: string
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-[2rem] md:rounded-[2.5rem] border border-border overflow-hidden transition-all duration-700 bg-card/40 backdrop-blur-md shadow-sm hover:shadow-2xl hover:border-primary/30 hover:-translate-y-1 ${span} ${rows} ${className}`}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--spotlight-color), transparent 40%)`
        }}
      />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  )
}

export default function BentoPortfolio() {
  const { t } = useLanguage()
  const [activeService, setActiveService] = useState<Service | null>(null)

  return (
    <div className="max-w-[90rem] mx-auto px-4 py-20 md:py-32 sm:px-6 lg:px-8 min-h-screen relative">
      <style jsx global>{`
        :root { --spotlight-color: rgba(16, 185, 129, 0.1); }
        .dark { --spotlight-color: rgba(16, 185, 129, 0.2); }
      `}</style>

      {/* Decorative Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] -left-[10%] w-[60%] h-[60%] md:w-[40%] md:h-[40%] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[60%] h-[60%] md:w-[40%] md:h-[40%] bg-emerald-500/10 rounded-full blur-[80px] md:blur-[120px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 w-full auto-rows-auto md:auto-rows-[300px]">

        {/* ROW 1-2: IDENTITY & HERO */}
        <BentoCard span="md:col-span-3" rows="md:row-span-2" className="p-8 md:p-20 flex flex-col justify-center bg-primary/5 border-primary/20 min-h-[400px] md:min-h-full">
          <div className="flex items-center gap-3 mb-6 md:mb-10">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]"></span>
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-primary">{t.hero.status}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-6 md:mb-8 leading-[1.1] md:leading-[1.1]">
            {t.name.split(' ').pop()} <br />
            <span className="text-gradient block md:mt-4">{t.hero.role}</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-xl leading-relaxed max-w-2xl mb-8 md:mb-12 font-medium">
            {t.hero.subtitle}
          </p>

          {/* FIX #3: CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="#projects"
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-black text-sm uppercase tracking-wider transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-primary/40 active:scale-95 flex items-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-primary-foreground/60 animate-pulse"></span>
              {t.hero.viewWork}
            </Link>
            <Link
              href="#footer"
              className="px-8 py-4 rounded-full bg-secondary/50 border border-border text-foreground font-black text-sm uppercase tracking-wider transition-all duration-500 ease-out hover:scale-105 hover:border-primary/50 hover:text-primary active:scale-95"
            >
              {t.nav.contact}
            </Link>
          </div>

        </BentoCard>

        {/* ROW 1-2: PORTRAIT */}
        <BentoCard span="md:col-span-1" rows="md:row-span-2" className="relative group/avatar aspect-square md:aspect-auto">
          <Image src="/avatar.jpg" alt={t.name} fill className="object-cover grayscale-[0.2] group-hover/avatar:grayscale-0 transition-all duration-1000 scale-105 group-hover/avatar:scale-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
          <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-center">
            <div className="px-5 py-2.5 rounded-xl bg-background/60 backdrop-blur-xl border border-white/10 text-[10px] md:text-xs font-black uppercase tracking-widest text-primary shadow-2xl">
              {t.name}
            </div>
          </div>
        </BentoCard>

        {/* ROW 3: EXPERTISE & SKILLS */}
        <BentoCard id="skills" span="md:col-span-2" className="p-8 md:p-10 flex flex-col justify-center min-h-[300px] md:min-h-full">
          <h3 className="text-lg md:text-xl font-black text-foreground mb-6 md:mb-8 flex items-center gap-3">
            <span className="w-8 md:w-10 h-px bg-primary"></span> {t.skills.title}
          </h3>
          <div className="flex flex-col gap-5 md:gap-6">
            <div className="flex flex-wrap gap-2 md:gap-2.5">
              {t.skills.core.map((skill: string) => (
                <span key={skill} className="text-xs md:text-sm font-black px-4 md:px-6 py-2.5 md:py-3 bg-primary/10 text-primary rounded-xl md:rounded-2xl border border-primary/20">
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 md:gap-2.5 opacity-70">
              {t.skills.secondary.concat(t.skills.others).map((skill: string) => (
                <span key={skill} className="text-[10px] md:text-xs font-bold px-3 md:px-4 py-1.5 md:py-2 bg-secondary/50 rounded-lg md:rounded-xl border border-border">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </BentoCard>

        <BentoCard span="md:col-span-2" className="p-8 md:p-10 flex flex-col justify-center relative overflow-visible min-h-[300px] md:min-h-full">
          <h3 className="text-lg md:text-xl font-black text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 md:w-10 h-px bg-primary"></span> {t.services.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
            {t.services.items.map((service: Service) => (
              <div
                key={service.name}
                onMouseEnter={() => setActiveService(service)}
                onMouseLeave={() => setActiveService(null)}
                className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-secondary/40 border border-border text-[12px] md:text-[13px] font-bold text-muted-foreground hover:text-primary transition-all flex items-center gap-3 cursor-help"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                {service.name}
              </div>
            ))}
          </div>
          <AnimatePresence>
            {activeService && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-x-0 bottom-full mb-4 md:mb-6 z-[100] bg-popover/95 backdrop-blur-2xl p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-primary/20 shadow-2xl mx-4"
              >
                <h4 className="text-lg md:text-xl font-black text-primary mb-2 md:mb-3">{activeService.name}</h4>
                <p className="text-[12px] md:text-sm text-muted-foreground leading-relaxed font-medium">{activeService.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </BentoCard>

        {/* FIX #5: STATS COUNTER ROW */}
        <BentoCard span="md:col-span-4" className="p-8 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 h-full items-center">
            {[
              { target: 2, suffix: "+", label: t.nav.projects },
              { target: 8, suffix: "+", label: t.skills.title },
              { target: 100, suffix: "%", label: "Responsive" },
              { target: 98, suffix: "+", label: "PageSpeed" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* SECTION HEADER FOR PROJECTS */}
        <div className="md:col-span-4 flex items-center gap-4 md:gap-6 py-8 md:py-12">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-primary whitespace-nowrap opacity-50">{t.portfolio.featured}</span>
          <div className="h-px w-full bg-gradient-to-r from-primary/30 to-transparent"></div>
        </div>

        {/* ROW 4-5: GRAND PROJECT SHOWCASE */}
        {t.portfolio.projects.map((proj: any, index: number) => (
          <BentoCard
            key={proj.id}
            id={index === 0 ? "projects" : undefined}
            span={t.portfolio.projects.length === 1 ? "md:col-span-4" : "md:col-span-2"}
            rows="md:row-span-2"
            className="relative group/project min-h-[500px] md:min-h-full"
          >
            <Link href={`/projects/${proj.id}`} className="absolute inset-0 z-30"></Link>
            <Image
              src={proj.image}
              alt={proj.title}
              fill
              className="object-cover transition-transform duration-[3s] group-hover/project:scale-110"
            />
            {/* FIX #1: Much stronger gradient overlay for text readability over busy images */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20 z-10"></div>

            <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end z-20">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tighter leading-tight"
                style={{
                  textShadow: "0 4px 16px #16A34A, 0 0 24px #16A34A",
                }}
              >
                {proj.title}
              </h2>

              <div className="p-4 md:p-5 rounded-[1.2rem] md:rounded-[1.5rem] bg-background/20 backdrop-blur-xl border border-white/5 mb-5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/60"></div>
                <p className="text-xs sm:text-sm md:text-base text-foreground leading-relaxed font-medium">
                  {proj.description}
                </p>
              </div>

              {/* FIX #4: Tech stack pills on project cards */}
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {proj.tech.slice(0, 5).map((tech: string) => (
                  <span key={tech} className="px-3 md:px-4 py-1.5 bg-primary/10 backdrop-blur-md border border-primary/20 rounded-full text-[9px] sm:text-[10px] md:text-xs font-bold text-primary">
                    {tech}
                  </span>
                ))}
                {proj.tech.length > 5 && (
                  <span className="px-3 md:px-4 py-1.5 bg-secondary/30 backdrop-blur-md border border-border rounded-full text-[9px] sm:text-[10px] md:text-xs font-bold text-muted-foreground">
                    +{proj.tech.length - 5}
                  </span>
                )}
              </div>
            </div>
          </BentoCard>
        ))}

        {/* ROW 6-7: THE NARRATIVE (CLOSING) */}
        <BentoCard id="about" span="md:col-span-4" rows="md:row-span-2" className="p-8 md:p-24 bg-primary/5 min-h-[500px] md:min-h-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-24 items-start h-full">
            <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
              <div className="flex items-center gap-4 md:gap-5">
                <div className="w-12 md:w-16 h-px bg-primary/30"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-primary">The Narrative</span>
              </div>
              <h3 className="text-4xl md:text-7xl font-black text-foreground leading-[0.9] tracking-tighter italic">
                {t.about.title}
              </h3>
              <p className="text-foreground/60 text-sm md:text-base font-medium leading-relaxed max-w-sm">
                Tôi tin rằng mỗi dòng code đều mang một sứ mệnh: Giải quyết bài toán thực tế và nâng tầm giá trị doanh nghiệp.
              </p>
            </div>
            <div className="md:col-span-7 flex flex-col gap-8 md:gap-12 pt-0 md:pt-4 justify-center h-full">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-medium tracking-tight">
                {t.about.description1}
              </p>
              <div className="relative p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-card border border-border shadow-2xl group/quote">
                <div className="absolute top-0 left-0 w-2 md:w-3 h-full bg-primary rounded-l-full"></div>
                <p className="text-base md:text-lg text-primary font-bold leading-relaxed italic relative z-10">
                  &quot;{t.about.description2}&quot;
                </p>
              </div>
            </div>
          </div>
        </BentoCard>

      </div>
    </div>
  )
}
