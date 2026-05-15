"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/app/hooks/useLanguage"

export default function AboutUs() {
  const { t } = useLanguage()
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="container mx-auto">
        <motion.h2
          className="text-5xl font-black mb-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t.about.title}
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h3 className="text-3xl font-bold mb-4 text-white">{t.about.profession}</h3>
            <p className="text-gray-300 mb-6">
              {t.about.description1}
            </p>
            <p className="text-gray-300">
              {t.about.description2}
            </p>
          </motion.div>
          <motion.div
            className="relative mt-16 h-80 lg:mt-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg transform rotate-3"></div>
            <div className="absolute inset-0 bg-secondary rounded-lg transform -rotate-3 transition-transform hover:rotate-0 duration-300 flex items-center justify-center p-8 border border-border">

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

