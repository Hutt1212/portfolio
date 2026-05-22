"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
    <div ref={ref} className="text-4xl md:text-5xl font-cinzel font-black text-primary tracking-tighter">
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
      className={`group relative parchment-block ${span} ${rows} ${className}`}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, var(--spotlight-color), transparent 60%)`
        }}
      />
      <div className="absolute inset-0 bg-repeat pointer-events-none opacity-[0.03] dark:opacity-[0.07] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
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

  return (
    <div className="max-w-[90rem] mx-auto px-4 py-24 md:py-36 sm:px-6 lg:px-8 min-h-screen relative">
      <style jsx global>{`
        :root { --spotlight-color: rgba(217, 119, 6, 0.12); }
        .dark { --spotlight-color: rgba(217, 119, 6, 0.22); }
      `}</style>

      {/* Warm Magic Candle Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] -left-[10%] w-[60%] h-[60%] md:w-[40%] md:h-[40%] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[100px] md:blur-[150px] animate-blob"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[60%] h-[60%] md:w-[40%] md:h-[40%] bg-orange-600/5 dark:bg-orange-600/10 rounded-full blur-[100px] md:blur-[150px] animate-blob animation-delay-2000"></div>
      </div>

      {/* DAILY PROPHET NEWSPAPER MASTHEAD */}
      <div className="text-center mb-12 flex flex-col items-center select-none">
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-cinzel font-black tracking-tight text-foreground my-4 transition-all duration-500 hover:scale-[1.01] hover:text-primary">
          {language === "vi" ? "Nhật Báo Tiên Tri" : "The Daily Prophet"}
        </h1>
        <div className="w-full h-1 bg-foreground relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-6 font-cinzel text-[10px] md:text-xs font-black tracking-[0.3em] text-primary flex items-center gap-2">
            <span>◆</span> {language === "vi" ? "PHIÊN BẢN ĐẶC BIỆT" : "SPECIAL EDITION"} <span>◆</span>
          </div>
        </div>
      </div>

      {/* BENTO PORTFOLIO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full auto-rows-auto md:auto-rows-[300px]">
        
        {/* ROW 1-2: IDENTITY & HERO */}
        <BentoCard span="md:col-span-3" rows="md:row-span-2" className="p-8 md:p-12 flex flex-col justify-between bg-primary/5 min-h-[400px] md:min-h-full">
          <div>
            <div className="flex items-center gap-2 mb-4 border-b border-foreground/10 pb-2">
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></span>
              <span className="text-[10px] md:text-xs font-cinzel font-bold uppercase tracking-widest text-primary">{t.hero.status}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-cinzel font-black tracking-tight text-foreground mb-4 leading-none uppercase">
              {t.name.split(' ').pop()} <br />
              <span className="text-primary block text-2xl sm:text-3xl md:text-4xl font-serif italic font-medium tracking-normal lowercase mt-1 md:mt-2">
                — {t.hero.role}
              </span>
            </h2>
            <hr className="newspaper-rule-thin my-4" />
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-serif text-justify drop-cap">
              {t.hero.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-8 pt-4 border-t border-foreground/10">
            <Link
              href="#projects"
              className="px-6 py-3 border border-foreground font-cinzel font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-95 flex items-center gap-2 shadow-[2px_2px_0px_rgba(0,0,0,0.15)] hover:shadow-none animate-pulse"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              {t.hero.viewWork}
            </Link>
            <Link
              href="#footer"
              className="px-6 py-3 border border-dashed border-foreground/50 font-cinzel font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:border-foreground hover:bg-secondary/40 active:scale-95 shadow-[2px_2px_0px_rgba(0,0,0,0.05)] hover:shadow-none"
            >
              {t.nav.contact}
            </Link>
          </div>
        </BentoCard>

        {/* ROW 1-2: PORTRAIT */}
        <BentoCard span="md:col-span-1" rows="md:row-span-2" className="p-4 flex flex-col justify-between group/avatar aspect-square md:aspect-auto">
          <div className="h-full w-full moving-picture-container relative bg-card">
            <Image
              src="/avatar.jpg"
              alt={t.name}
              fill
              className="moving-picture object-cover grayscale-[0.8] contrast-[1.25] brightness-[0.95]"
            />
            <div className="halftone-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/avatar:opacity-20 transition-opacity duration-1000 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.5)_0%,transparent_70%)] z-10" />
          </div>
          <div className="mt-4 text-center border-t border-foreground/30 pt-3">
            <span className="font-cinzel text-xs font-black tracking-[0.2em] text-foreground block">
              ◆ {t.name.toUpperCase()} ◆
            </span>
            <span className="font-serif italic text-[10px] text-muted-foreground block mt-0.5">
              {language === "vi" ? "Chân dung ma thuật di chuyển" : "Magical Animating Portrait"}
            </span>
          </div>
        </BentoCard>

        {/* ROW 3: EXPERTISE & SKILLS */}
        <BentoCard id="skills" span="md:col-span-2" className="p-8 flex flex-col justify-between min-h-[300px] md:min-h-full">
          <div>
            <h3 className="text-xl font-cinzel font-black text-foreground mb-4 uppercase tracking-widest border-b-2 border-foreground pb-2 flex items-center gap-2">
              <span>✙</span> {t.skills.title}
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {t.skills.core.map((skill: string) => (
                  <span
                    key={skill}
                    className="text-[11px] sm:text-xs font-cinzel font-bold px-3 py-1.5 bg-primary/10 text-primary border border-primary/30 rounded-none shadow-[1px_1px_0px_rgba(0,0,0,0.1)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <hr className="newspaper-rule-thin my-1" />
              <div className="flex flex-wrap gap-2 opacity-80">
                {t.skills.secondary.concat(t.skills.others).map((skill: string) => (
                  <span
                    key={skill}
                    className="text-[10px] sm:text-[11px] font-serif font-bold px-2 py-1 bg-secondary/50 rounded-none border border-border shadow-[1px_1px_0px_rgba(0,0,0,0.05)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="text-[10px] font-serif italic text-muted-foreground text-right mt-6 border-t border-foreground/10 pt-2">
            {language === "vi" ? "* Các ký tự cổ được khắc họa" : "* Ancient runes of technology"}
          </div>
        </BentoCard>

        {/* ROW 3: SERVICES */}
        <BentoCard span="md:col-span-2" className="p-8 flex flex-col justify-between min-h-[300px] md:min-h-full">
          <div>
            <h3 className="text-xl font-cinzel font-black text-foreground mb-4 uppercase tracking-widest border-b-2 border-foreground pb-2 flex items-center gap-2">
              <span>✚</span> {t.services.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {t.services.items.map((service: Service) => (
                <div
                  key={service.name}
                  onMouseEnter={() => setActiveService(service)}
                  onMouseLeave={() => setActiveService(null)}
                  className="p-2.5 border border-border bg-secondary/20 font-serif font-bold text-xs text-muted-foreground hover:text-primary hover:border-primary transition-all flex items-center gap-2 cursor-help shadow-[1px_1px_0px_rgba(0,0,0,0.05)]"
                >
                  <div className="w-1.5 h-1.5 bg-primary/60 rotate-45"></div>
                  {service.name}
                </div>
              ))}
            </div>
          </div>
          <AnimatePresence>
            {activeService && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute inset-x-4 bottom-4 z-40 bg-card border-2 border-primary/40 p-4 shadow-xl pointer-events-none"
              >
                <h4 className="text-sm font-cinzel font-black text-primary mb-1 uppercase">{activeService.name}</h4>
                <p className="text-[11px] font-serif text-muted-foreground leading-normal text-justify">{activeService.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="text-[10px] font-serif italic text-muted-foreground mt-4 border-t border-foreground/10 pt-2">
            {language === "vi" ? "Di chuột qua để khám phá bùa phép" : "Hover to dissect each scroll"}
          </div>
        </BentoCard>

        {/* METRICS */}
        <BentoCard span="md:col-span-4" className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full items-center divide-x divide-foreground/20">
            {[
              { target: 2, suffix: "+", label: t.nav.projects },
              { target: 14, suffix: "+", label: t.skills.title },
              { target: 100, suffix: "%", label: "Responsive" },
              { target: 98, suffix: "+", label: "PageSpeed" }
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                <div className="text-[9px] md:text-[10px] font-cinzel font-bold uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>

      {/* SECTION HEADER FOR PROJECTS */}
      <div id="projects" className="flex flex-col items-center py-10 select-none my-6">
        <div className="w-full h-px bg-foreground/20"></div>
        <span className="font-cinzel text-xs font-black uppercase tracking-[0.5em] text-primary my-3">
          {language === "vi" ? "✦ CÁC BẢN THIẾT KẾ ĐÃ HOÀN THÀNH ✦" : "✦ LATEST CONJURED ARTIFACTS ✦"}
        </span>
        <div className="w-full h-1 bg-foreground/10 border-b border-foreground/20"></div>
      </div>

      {/* BENTO PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full auto-rows-auto md:auto-rows-[300px]">
        {/* ROW 4-5: PROJECT SHOWCASE LIST */}
        {t.portfolio.projects.map((proj: any, index: number) => (
          <BentoCard
            key={proj.id}
            span={t.portfolio.projects.length === 1 ? "md:col-span-4" : "md:col-span-2"}
            rows="md:row-span-2"
            className="p-4 flex flex-col justify-between group/project min-h-[500px] md:min-h-[560px]"
          >
            <Link href={`/projects/${proj.id}`} className="absolute inset-0 z-30"></Link>
            <div className="moving-picture-container h-[220px] w-full relative bg-card">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="moving-picture object-cover grayscale-[0.85] contrast-[1.3] brightness-[0.9]"
              />
              <div className="halftone-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40"></div>
            </div>
            <div className="mt-4 flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-cinzel text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-primary rotate-45"></span>
                  {language === "vi" ? "Bản tin đặc biệt" : "Special Feature"}
                </h4>
                <h3 className="text-xl md:text-2xl font-cinzel font-black text-foreground mb-3 uppercase tracking-tight leading-tight border-b border-foreground/10 pb-2">
                  {proj.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-serif leading-relaxed text-justify mb-4">
                  {proj.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 border-t border-dashed border-foreground/20 pt-3">
                {proj.tech.slice(0, 5).map((tech: string) => (
                  <span key={tech} className="px-2 py-0.5 bg-secondary/70 border border-border text-[9px] font-cinzel font-bold text-muted-foreground">
                    {tech}
                  </span>
                ))}
                {proj.tech.length > 5 && (
                  <span className="px-2 py-0.5 bg-background border border-dashed border-foreground/30 text-[9px] font-serif italic text-muted-foreground">
                    +{proj.tech.length - 5} {language === "vi" ? "khác" : "more"}
                  </span>
                )}
              </div>
            </div>
          </BentoCard>
        ))}

        {/* ROW 6-7: THE NARRATIVE (CLOSING EDITORIAL) */}
        <BentoCard id="about" span="md:col-span-4" rows="md:row-span-2" className="p-8 md:p-12 bg-primary/5 min-h-[500px] md:min-h-full justify-between">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start h-full w-full">
            <div className="md:col-span-4 flex flex-col gap-4 border-r border-foreground/10 pr-6 h-full justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-px bg-primary/50"></div>
                  <span className="text-[9px] font-cinzel font-bold uppercase tracking-widest text-primary">The Narrative</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-cinzel font-black text-foreground leading-[0.95] tracking-tighter uppercase my-3">
                  {t.about.title}
                </h3>
              </div>
              <div className="wax-seal w-20 h-20 text-[10px] uppercase tracking-widest flex-shrink-0 mx-auto md:mx-0 my-4">
                <span>Minh Huy</span>
              </div>
            </div>
            <div className="md:col-span-8 flex flex-col gap-6 pl-0 md:pl-6 justify-between h-full">
              <p className="text-sm md:text-base text-muted-foreground font-serif leading-relaxed text-justify drop-cap">
                {t.about.description1}
              </p>
              <div className="relative p-6 border-l-4 border-primary bg-secondary/30 italic">
                <p className="text-xs md:text-sm text-foreground font-serif leading-relaxed text-justify">
                  &quot;{t.about.description2}&quot;
                </p>
                <div className="absolute top-1 right-2 text-primary opacity-20 font-cinzel text-5xl select-none pointer-events-none">”</div>
              </div>
            </div>
          </div>
        </BentoCard>

      </div>
    </div>
  )
}
