"use client"

import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useLanguage } from "@/app/hooks/useLanguage"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Github, Layers, Zap, Shield, Cpu } from "lucide-react"

export default function ProjectDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { t } = useLanguage()

  const project = t.portfolio.projects.find((p: any) => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Project Not Found</h1>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold"
          >
            Go Back Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        </motion.div>

        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-20 max-w-7xl mx-auto w-full">
          <motion.button
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ x: -5 }}
            onClick={() => router.push("/")}
            className="mb-8 w-fit flex items-center gap-3 px-6 py-3 bg-background/20 backdrop-blur-md border border-white/10 hover:border-primary/50 hover:bg-primary/10 rounded-full text-foreground transition-all duration-300 font-bold uppercase tracking-widest text-[10px]"
          >
            <ArrowLeft size={16} className="text-primary" /> {t.nav.projects}
          </motion.button>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-8xl font-black tracking-tighter leading-none mb-6 text-foreground"
            style={{
              textShadow: "0 4px 20px #16A34A, 0 0 40px #16A34A",
            }}
          >
            {project.title}
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {project.tech.map((tech: string) => (
              <span key={tech} className="px-4 py-2 bg-primary/20 backdrop-blur-md border border-primary/20 rounded-full text-xs font-bold text-primary">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 mt-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-black mb-8 flex items-center gap-4">
              <span className="w-12 h-1 bg-primary rounded-full"></span>
              {t.projectDetail.overview}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium mb-12">
              {project.longDescription}
            </p>

            {project.vision && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mb-16 p-8 md:p-12 rounded-[3rem] bg-primary/5 border border-primary/10 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <Zap size={120} />
                </div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary uppercase tracking-widest">
                  {t.projectDetail.vision}
                </h3>
                <p className="text-lg text-foreground/80 leading-relaxed italic">
                  "{project.vision}"
                </p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 gap-8 mb-16">
              <h3 className="text-2xl font-black flex items-center gap-4">
                <span className="w-8 h-1 bg-primary/30 rounded-full"></span>
                {t.projectDetail.highlights}
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-[2rem] bg-card/40 border border-border backdrop-blur-sm hover:border-primary/50 transition-colors group"
                  >
                    <div className="mb-4 p-3 w-fit rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      {i === 0 ? <Zap size={24} /> : i === 1 ? <Shield size={24} /> : i === 2 ? <Layers size={24} /> : <Cpu size={24} />}
                    </div>
                    <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description || feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {project.impact && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-[3rem] border border-border bg-card/40"
              >
                <h3 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-8 h-1 bg-primary/30 rounded-full"></span>
                  {t.projectDetail.impact}
                </h3>
                <div className="space-y-4">
                  {project.impact.map((item: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="mt-1.5 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <p className="text-lg text-foreground/80">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.section>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticky top-32 p-10 rounded-[2.5rem] bg-primary/5 border border-primary/20 backdrop-blur-xl"
          >
            <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-primary">{t.projectDetail.links}</h3>
            <div className="flex flex-col gap-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 rounded-2xl bg-primary text-primary-foreground font-black group transition-all hover:scale-[1.02]"
              >
                {t.projectActions.visit} <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              {project.github && project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 rounded-2xl bg-card border border-border hover:bg-secondary/40 text-foreground font-black group transition-all hover:scale-[1.02]"
                >
                  {t.projectActions.github || "View Source"} <Github size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              )}
            </div>

            <div className="mt-12 pt-12 border-t border-primary/10">
              <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">{t.projectActions.techStack}</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech: string) => (
                  <span key={tech} className="text-[10px] font-black px-3 py-1.5 bg-background rounded-lg border border-border">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
