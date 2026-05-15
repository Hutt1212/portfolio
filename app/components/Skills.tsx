"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/app/hooks/useLanguage"

export default function Skills() {
  const { t } = useLanguage()
  
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden" id="skills-section">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_70%)] opacity-[0.03] pointer-events-none"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
            <span className="text-gradient">{t.skills.title}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Core Skills */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2rem] bg-primary/5 border border-primary/20 shadow-xl"
          >
            <h3 className="text-xl font-black text-primary mb-6 uppercase tracking-widest">Core Stack</h3>
            <div className="flex flex-wrap gap-3">
              {t.skills.core.map((skill: string) => (
                <span key={skill} className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-xl shadow-lg shadow-primary/20">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Secondary Skills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2rem] bg-card border border-border shadow-lg"
          >
            <h3 className="text-xl font-black text-foreground mb-6 uppercase tracking-widest">Secondary</h3>
            <div className="flex flex-wrap gap-3">
              {t.skills.secondary.map((skill: string) => (
                <span key={skill} className="px-4 py-2 bg-secondary text-foreground text-xs font-bold rounded-xl border border-border">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Others */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2rem] bg-card border border-border shadow-lg"
          >
            <h3 className="text-xl font-black text-foreground mb-6 uppercase tracking-widest">Tooling</h3>
            <div className="flex flex-wrap gap-3">
              {t.skills.others.map((skill: string) => (
                <span key={skill} className="px-4 py-2 bg-secondary/50 text-foreground/70 text-xs font-bold rounded-xl border border-border">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
