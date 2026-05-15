"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/app/hooks/useLanguage"

export default function PortfolioGrid() {
  const { t } = useLanguage()
  
  const projects = t.portfolio.projects
  
  return (
    <section className="py-20 bg-background" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            <span className="text-gradient">{t.portfolio.title}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.portfolio.description}
          </p>
        </motion.div>

        <div className="flex justify-center">
          {projects.map((project: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative bg-card rounded-[2.5rem] shadow-2xl overflow-hidden border border-border hover:border-emerald-500/50 transition-all duration-500 max-w-4xl w-full hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)]"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative h-80 md:h-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                </div>
                
                <div className="p-10 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-primary/20">
                      Featured Project
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-foreground mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-8 text-base leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.split(",").map((tech: string) => (
                      <span key={tech} className="text-[10px] font-bold px-3 py-1 bg-secondary text-secondary-foreground rounded-lg border border-border uppercase tracking-wider">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  >
                    Visit Website <span>→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

