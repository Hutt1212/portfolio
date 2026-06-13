"use client"

import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useLanguage } from "@/app/hooks/useLanguage"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Github, Zap, Shield, Layers, Cpu, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function ProjectDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { t, language } = useLanguage()

  const project = t.portfolio.projects.find((p: any) => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center p-8 bento-card max-w-md mx-4">
          <h1 className="text-3xl font-outfit font-bold mb-4">{language === "vi" ? "Không tìm thấy dự án" : "Project Not Found"}</h1>
          <p className="text-muted-foreground mb-8">
            {language === "vi" ? "Dự án bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ." : "The project you are looking for does not exist or has been removed."}
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-transform hover:scale-105 active:scale-95 inline-block"
          >
            {language === "vi" ? "Trở về Trang chủ" : "Return to Home"}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24 pt-24 relative z-10">
      <div className="max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-12">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            {language === "vi" ? "Quay lại" : "Back to projects"}
          </button>
        </div>

        {/* Hero Section */}
        <div className="mb-12 md:mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-outfit font-black tracking-tighter text-foreground mb-6 leading-tight"
          >
            {project.title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2"
          >
            {project.tech.map((tech: string) => (
              <span key={tech} className="px-4 py-2 bg-secondary/60 backdrop-blur-xl rounded-full text-sm font-medium text-secondary-foreground border border-border">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Large Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative w-full aspect-video md:aspect-[21/9] image-container bg-secondary mb-16 shadow-2xl"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Main Story (Left Column - 8 cols) */}
          <div className="lg:col-span-8 space-y-16">
            
            <section>
              <h2 className="text-2xl font-outfit font-bold mb-6 flex items-center gap-2 text-foreground">
                {t.projectDetail.overview}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.longDescription}
              </p>
            </section>

            {project.vision && (
              <section className="p-8 bg-primary/5 border border-primary/20 rounded-[var(--radius)]">
                <h3 className="text-lg font-outfit font-bold mb-4 text-primary">
                  {t.projectDetail.vision}
                </h3>
                <p className="text-lg font-medium italic text-foreground leading-relaxed">
                  "{project.vision}"
                </p>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-outfit font-bold mb-8 flex items-center gap-2">
                {t.projectDetail.highlights}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(project.highlights || [
                  { title: "Performance", description: "Optimized for speed and core web vitals." },
                  { title: "Security", description: "Enterprise-grade security implementations." },
                  { title: "Scalability", description: "Architected for high-traffic growth." },
                  { title: "Real-time", description: "Live updates via WebSockets/SignalR." }
                ]).map((feature: any, i: number) => (
                  <div key={i} className="bento-card p-6 border-none bg-secondary/30">
                    <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary mb-4 shadow-sm border border-border">
                      {i === 0 ? <Zap size={20} /> : i === 1 ? <Shield size={20} /> : i === 2 ? <Layers size={20} /> : <Cpu size={20} />}
                    </div>
                    <h4 className="text-lg font-outfit font-bold mb-2">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description || feature.desc}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar Metadata (Right Column - 4 cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-8">
            
            <div className="bento-card p-6">
              <h3 className="text-lg font-outfit font-bold mb-6">
                {t.projectDetail.links}
              </h3>
              
              <div className="flex flex-col gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-primary text-primary-foreground rounded-full font-medium transition-transform hover:scale-105 active:scale-95"
                >
                  {t.projectActions.visit} <ExternalLink size={18} />
                </a>

                {project.github && project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full font-medium transition-transform hover:scale-105 active:scale-95"
                  >
                    {t.projectActions.github || "View Source"} <Github size={18} />
                  </a>
                )}
              </div>
            </div>

            {project.impact && (
              <div className="bento-card p-6">
                <h3 className="text-lg font-outfit font-bold mb-6">
                  {t.projectDetail.impact}
                </h3>
                <div className="space-y-4">
                  {project.impact.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  )
}
