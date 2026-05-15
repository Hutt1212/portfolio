"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/app/hooks/useLanguage"

export default function Skills() {
  const { t } = useLanguage()
  
  const skills = t.skills.items
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden" id="skills">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_70%)] opacity-[0.03] pointer-events-none"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            <span className="text-gradient">{t.skills.title}</span>
          </h2>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {skills.map((skill: string, index: number) => (
            <motion.span
              key={skill}
              className="px-6 py-3 bg-secondary/50 backdrop-blur-sm text-secondary-foreground text-sm font-bold rounded-2xl border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.1, 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)"
              }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
