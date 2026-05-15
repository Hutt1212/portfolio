"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/app/hooks/useLanguage"
import Image from "next/image"

// --- Types ---
interface Service {
  name: string
  description: string
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
      className={`group relative rounded-[2.5rem] border border-border overflow-hidden transition-all duration-700 bg-card/40 backdrop-blur-md shadow-sm hover:shadow-2xl ${span} ${rows} ${className}`}
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
  const project = t.portfolio.projects[0]

  return (
    <div className="max-w-[90rem] mx-auto px-4 py-32 sm:px-6 lg:px-8 min-h-screen relative">
      <style jsx global>{`
        :root { --spotlight-color: rgba(16, 185, 129, 0.1); }
        .dark { --spotlight-color: rgba(16, 185, 129, 0.2); }
      `}</style>

      {/* Decorative Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full auto-rows-[300px]">

        {/* ROW 1-2: IDENTITY & HERO */}
        <BentoCard span="md:col-span-3" rows="md:row-span-2" className="p-12 sm:p-20 flex flex-col justify-center bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]"></span>
            <span className="text-xs font-black uppercase tracking-[0.4em] text-primary">{t.hero.status}</span>
          </div>
          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-foreground mb-8 leading-[0.85]">
            {t.name.split(' ').pop()} <br />
            <span className="text-gradient">{t.hero.role}</span>
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mb-12 font-medium">
            {t.hero.subtitle}
          </p>
        </BentoCard>

        {/* ROW 1-2: PORTRAIT */}
        <BentoCard span="md:col-span-1" rows="md:row-span-2" className="relative group/avatar">
          <Image src="/avatar.jpg" alt={t.name} fill className="object-cover grayscale-[0.2] group-hover/avatar:grayscale-0 transition-all duration-1000 scale-105 group-hover/avatar:scale-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-0 right-0 flex justify-center">
            <div className="px-6 py-3 rounded-2xl bg-background/60 backdrop-blur-xl border border-white/10 text-xs font-black uppercase tracking-widest text-primary shadow-2xl">
              {t.name}
            </div>
          </div>
        </BentoCard>

        {/* ROW 3: EXPERTISE & SKILLS */}
        <BentoCard id="skills" span="md:col-span-2" className="p-10 flex flex-col justify-center">
          <h3 className="text-xl font-black text-foreground mb-8 flex items-center gap-3">
            <span className="w-10 h-px bg-primary"></span> {t.skills.title}
          </h3>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2.5">
              {t.skills.core.map((skill: string) => (
                <span key={skill} className="text-sm font-black px-6 py-3 bg-primary/10 text-primary rounded-2xl border border-primary/20 hover:bg-primary hover:text-white transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2.5 opacity-70">
              {t.skills.secondary.concat(t.skills.others).map((skill: string) => (
                <span key={skill} className="text-xs font-bold px-4 py-2 bg-secondary/50 rounded-xl border border-border">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </BentoCard>

        <BentoCard span="md:col-span-2" className="p-10 flex flex-col justify-center relative overflow-visible">
          <h3 className="text-xl font-black text-foreground mb-6 flex items-center gap-3">
            <span className="w-10 h-px bg-primary"></span> {t.services.title}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {t.services.items.map((service: Service) => (
              <div
                key={service.name}
                onMouseEnter={() => setActiveService(service)}
                onMouseLeave={() => setActiveService(null)}
                className="p-4 rounded-2xl bg-secondary/40 border border-border text-[13px] font-bold text-muted-foreground hover:text-primary hover:border-primary/30 transition-all flex items-center gap-3 cursor-help"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary"></div>
                {service.name}
              </div>
            ))}
          </div>
          <AnimatePresence>
            {activeService && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-x-0 bottom-full mb-6 z-[100] bg-popover/95 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-primary/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] mx-4"
              >
                <h4 className="text-xl font-black text-primary mb-3">{activeService.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">{activeService.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </BentoCard>

        {/* SECTION HEADER FOR PROJECTS */}
        <div className="md:col-span-4 flex items-center gap-6 py-12">
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary whitespace-nowrap opacity-50">01 / {t.portfolio.featured}</span>
          <div className="h-px w-full bg-gradient-to-r from-primary/30 to-transparent"></div>
        </div>

        {/* ROW 4-5: GRAND PROJECT SHOWCASE (UNAGI.VN) */}
        <BentoCard id="projects" span="md:col-span-4" rows="md:row-span-2" className="relative group/project">
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-30"></a>
          <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-[3s] group-hover/project:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10"></div>

          <div className="absolute inset-0 p-12 sm:p-24 flex flex-col justify-center z-20 md:w-3/5">
            <h2 className="text-5xl sm:text-7xl font-black text-foreground mb-6 tracking-tighter leading-tight group-hover/project:text-primary transition-colors duration-500">
              {project.title}
            </h2>

            <div className="inline-flex p-6 sm:p-8 rounded-[2rem] bg-background/20 backdrop-blur-xl border border-white/5 mb-8 shadow-2xl relative overflow-hidden group-hover/project:bg-background/30 transition-colors w-fit">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/60"></div>
              <p className="text-lg sm:text-xl text-foreground leading-relaxed font-medium">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              {project.tech.map(tech => (
                <span key={tech} className="px-5 py-2 bg-primary/10 backdrop-blur-md border border-primary/20 rounded-full text-xs font-bold text-primary">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* ROW 6-7: THE NARRATIVE (CLOSING) */}
        <BentoCard id="about" span="md:col-span-4" rows="md:row-span-2" className="p-12 sm:p-24 bg-primary/5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
            <div className="md:col-span-5 flex flex-col gap-8">
              <div className="flex items-center gap-5">
                <div className="w-16 h-px bg-primary/30"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">The Narrative</span>
              </div>
              <h3 className="text-6xl sm:text-7xl font-black text-foreground leading-[0.9] tracking-tighter italic">
                {t.about.title}
              </h3>
              <p className="text-foreground/60 text-base font-medium leading-relaxed max-w-sm">
                Tôi tin rằng mỗi dòng code đều mang một sứ mệnh: Giải quyết bài toán thực tế và nâng tầm giá trị doanh nghiệp.
              </p>
            </div>
            <div className="md:col-span-7 flex flex-col gap-10 pt-4">
              <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed font-medium tracking-tight">
                {t.about.description1}
              </p>
              <div className="relative p-10 rounded-[3rem] bg-card border border-border shadow-2xl group/quote">
                <div className="absolute top-0 left-0 w-2 h-full bg-primary rounded-l-full"></div>
                <p className="text-base sm:text-lg text-primary font-bold leading-relaxed italic relative z-10">
                  "{t.about.description2}"
                </p>
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover/quote:opacity-10 transition-all duration-700">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 6.79086 11.8079 5 14.017 5H17.017C19.2261 5 21.017 6.79086 21.017 9V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V12C6.017 12.5523 5.5693 13 5.017 13H2.017C1.46472 13 1.017 12.5523 1.017 12V9C1.017 6.79086 2.80787 5 5.017 5H8.017C10.2261 5 12.017 6.79086 12.017 9V15C12.017 18.3137 9.33071 21 6.017 21H5.017Z" /></svg>
                </div>
              </div>
            </div>
          </div>
        </BentoCard>

      </div>
    </div>
  )
}
