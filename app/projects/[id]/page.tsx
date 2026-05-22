"use client"

import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useLanguage } from "@/app/hooks/useLanguage"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Github, Layers, Zap, Shield, Cpu } from "lucide-react"

export default function ProjectDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { t, language } = useLanguage()

  const project = t.portfolio.projects.find((p: any) => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center select-none">
        <div className="text-center p-8 parchment-block max-w-md">
          <h1 className="text-3xl font-cinzel font-black mb-4 uppercase">{language === "vi" ? "Không tìm thấy hồ sơ" : "Scroll Not Found"}</h1>
          <p className="font-serif text-muted-foreground mb-6">{language === "vi" ? "Bản tin đặc biệt này không tồn tại trong kho lưu trữ của chúng tôi." : "This special publication does not exist in our archives."}</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 border border-foreground font-cinzel font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-[2px_2px_0px_rgba(0,0,0,0.15)]"
          >
            {language === "vi" ? "Trở về Trang chủ" : "Return to Masthead"}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24 pt-24">
      {/* Warm Magic Candle Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] -left-[10%] w-[60%] h-[60%] md:w-[40%] md:h-[40%] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[100px] md:blur-[150px] animate-blob"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[60%] h-[60%] md:w-[40%] md:h-[40%] bg-orange-600/5 dark:bg-orange-600/10 rounded-full blur-[100px] md:blur-[150px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ========================================================
            CASE FILE MASTHEAD & HEADER INFO
            ======================================================== */}
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="flex justify-between w-full text-[9px] md:text-xs font-cinzel uppercase tracking-[0.2em] px-2 py-1 text-muted-foreground border-b border-foreground/30">
            <span>Special Supplement</span>
            <span>Investigative Case File: #{project.id.toUpperCase()}</span>
            <span>1 Sickle</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-black tracking-tight text-foreground my-4 uppercase">
            {language === "vi" ? "Báo Cáo Chuyên Đề Đặc Biệt" : "Special Investigative Report"}
          </h2>

          <div className="w-full h-1 bg-foreground relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 font-cinzel text-[10px] tracking-[0.3em] text-primary flex items-center gap-1.5">
              <span>✦</span> {language === "vi" ? "BẢN PHÂN TÍCH CHUYÊN SÂU" : "IN-DEPTH TECHNICAL DISSECTION"} <span>✦</span>
            </div>
          </div>
        </div>

        {/* Back Button scroll style */}
        <div className="mb-8 flex justify-start">
          <motion.button
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ x: -4 }}
            onClick={() => router.push("/")}
            className="flex items-center gap-2.5 px-5 py-2.5 border border-foreground/50 font-cinzel font-bold hover:bg-secondary/40 text-[10px] uppercase tracking-widest transition-all duration-300 shadow-[1px_1px_0px_rgba(0,0,0,0.1)]"
          >
            <ArrowLeft size={14} className="text-primary" /> {language === "vi" ? "Quay lại Bản tin chính" : "Return to Front Page"}
          </motion.button>
        </div>

        {/* ========================================================
            IMAGE GRID: MAGICAL MOVING BANNER
            ======================================================== */}
        <div className="relative h-[50vh] md:h-[65vh] w-full moving-picture-container bg-card p-2 mb-16">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover moving-picture grayscale-[0.8] contrast-[1.3] brightness-[0.85] group-hover:grayscale-0 group-hover:scale-105"
              priority
            />
            <div className="halftone-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
          </div>

          <div className="absolute bottom-6 left-6 right-6 md:left-12 md:right-12 z-10">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-black tracking-tight leading-none text-foreground uppercase border-b border-foreground/30 pb-3">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((tech: string) => (
                <span key={tech} className="px-3 py-1 bg-secondary/80 border border-border text-[10px] font-cinzel font-bold text-muted-foreground shadow-[1px_1px_0px_rgba(0,0,0,0.05)]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================
            REPORT CONTENT: NEWSPAPER COLUMNS
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* Main Story (Left/Middle columns) */}
          <div className="lg:col-span-2">

            {/* Overview */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-cinzel font-black mb-6 flex items-center gap-2 border-b-2 border-foreground pb-1.5 uppercase tracking-widest text-primary">
                <span>✒</span> {t.projectDetail.overview}
              </h2>

              <p className="text-base md:text-lg text-muted-foreground font-serif leading-relaxed text-justify drop-cap mb-10">
                {project.longDescription}
              </p>

              {/* Vision testimonial seal */}
              {project.vision && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="mb-12 p-8 md:p-10 border-4 border-double border-primary/40 bg-primary/5 relative overflow-hidden"
                >
                  <h3 className="text-sm font-cinzel font-black mb-3 text-primary uppercase tracking-widest border-b border-primary/20 pb-1.5">
                    ◆ {t.projectDetail.vision} ◆
                  </h3>
                  <p className="text-base text-foreground font-serif leading-relaxed text-justify italic">
                    "{project.vision}"
                  </p>
                </motion.div>
              )}

              {/* Technical Highlights / Spell Categories */}
              <div className="space-y-6 mb-12">
                <h3 className="text-xl font-cinzel font-black border-b border-foreground/20 pb-1.5 uppercase tracking-widest flex items-center gap-2">
                  <span>✙</span> {t.projectDetail.highlights}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(project.highlights || [
                    { title: "Performance", description: "Optimized for speed and core web vitals." },
                    { title: "Security", description: "Enterprise-grade security implementations." },
                    { title: "Scalability", description: "Architected for high-traffic growth." },
                    { title: "Real-time", description: "Live updates via WebSockets/SignalR." }
                  ]).map((feature: any, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="p-6 border border-border bg-card shadow-sm hover:border-primary/60 transition-colors group flex flex-col justify-between"
                    >
                      <div>
                        <div className="mb-3 p-2.5 w-fit border border-foreground/20 bg-secondary/30 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                          {i === 0 ? <Zap size={20} /> : i === 1 ? <Shield size={20} /> : i === 2 ? <Layers size={20} /> : <Cpu size={20} />}
                        </div>
                        <h4 className="text-lg font-cinzel font-black mb-2 uppercase">{feature.title}</h4>
                        <p className="text-muted-foreground font-serif text-xs leading-relaxed text-justify">{feature.description || feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Impact / Results */}
              {project.impact && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 border-4 border-double border-foreground bg-card"
                >
                  <h3 className="text-xl font-cinzel font-black mb-6 uppercase tracking-widest border-b border-foreground pb-2 flex items-center gap-2">
                    <span>✚</span> {t.projectDetail.impact}
                  </h3>

                  <div className="space-y-4">
                    {project.impact.map((item: string, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1.5 w-4 h-4 border border-primary bg-primary/10 flex-shrink-0 flex items-center justify-center rotate-45">
                          <div className="w-1.5 h-1.5 bg-primary" />
                        </div>
                        <p className="text-sm md:text-base text-foreground font-serif leading-relaxed text-justify">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.section>
          </div>

          {/* Sidebar / Investigative File Index (Right Column) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-28 p-8 border-4 border-double border-foreground bg-card shadow-lg"
            >
              <h3 className="text-lg font-cinzel font-black mb-6 uppercase tracking-[0.15em] border-b-2 border-foreground pb-2 flex items-center gap-2 text-primary">
                <span>✦</span> {t.projectDetail.links}
              </h3>

              <div className="flex flex-col gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-3.5 border-2 border-foreground bg-foreground text-background font-cinzel font-bold text-xs uppercase tracking-widest group transition-all duration-300 hover:bg-primary hover:border-primary hover:text-primary-foreground shadow-[2px_2px_0px_rgba(0,0,0,0.15)] hover:shadow-none"
                >
                  {t.projectActions.visit} <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {project.github && project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-5 py-3.5 border border-foreground bg-transparent hover:bg-secondary/40 text-foreground font-cinzel font-bold text-xs uppercase tracking-widest group transition-all duration-300 shadow-[2px_2px_0px_rgba(0,0,0,0.15)] hover:shadow-none"
                  >
                    {t.projectActions.github || "View Source"} <Github size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>

              {/* Technologies index scroll */}
              <div className="mt-8 pt-8 border-t border-foreground/10">
                <h4 className="text-xs font-cinzel font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  {t.projectActions.techStack}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech: string) => (
                    <span key={tech} className="text-[10px] font-serif font-bold px-2 py-0.5 bg-background border border-border">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
