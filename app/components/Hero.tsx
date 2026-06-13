"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/app/hooks/useLanguage"

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-x-3 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-emerald-500">{t.hero.status}</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t.hero.subtitle}
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a href="#projects" className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all">
                {t.hero.viewWork}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
