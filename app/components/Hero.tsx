"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/app/hooks/useLanguage"
import Image from "next/image"

export default function Hero() {
  const { t } = useLanguage()
  return (
    <div className="relative isolate overflow-hidden bg-background min-h-screen flex items-center">
      {/* Background Animated Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-green-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-x-10 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg lg:flex-shrink-0">
            <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase"
          >
            {t.hero.status}
          </motion.div>
          
          <motion.p
            className="text-lg font-bold text-primary mb-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {t.hero.greeting}
          </motion.p>
          
          <motion.h1
            className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-gradient block">{t.hero.title}</span>
          </motion.h1>
          
          <motion.p
            className="text-lg leading-8 text-muted-foreground mb-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {t.hero.subtitle}
          </motion.p>
          
          <motion.div
            className="flex flex-wrap items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="#projects" className="apple-button">
              {t.hero.viewWork}
            </a>
            <a
              href="#footer"
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors flex items-center gap-2 group"
            >
              {t.hero.getInTouch} 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </div>
        
        <motion.div
          className="mx-auto mt-16 lg:mt-0 flex-1"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          whileHover={{ scale: 1.02, rotate: 1 }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/40 to-teal-600/40 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-50"></div>
            <div className="relative glass-dark rounded-3xl p-10 shadow-2xl border border-white/10 overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl font-bold italic">CODE</div>
              
              <div className="aspect-square flex items-center justify-center">
                <div className="text-center">
                  <motion.div 
                    className="relative w-32 h-32 mx-auto mb-6"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Image 
                      src="/hero-avatar.png"
                      alt="AI Developer Avatar"
                      fill
                      className="object-contain drop-shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                    />
                  </motion.div>
                  <p className="text-white text-2xl font-bold tracking-tight mb-2">{t.hero.role}</p>
                  <p className="text-emerald-400 text-sm font-medium mb-6">{t.hero.specialist}</p>
                  
                  <div className="grid grid-cols-2 gap-3 text-left">
                    {t.hero.techList.map((tech: string) => (
                      <div key={tech} className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

