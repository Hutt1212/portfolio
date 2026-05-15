"use client"

import { motion } from "framer-motion"
import { Code, Brain, Zap, Database, MessageSquare, Shield } from "lucide-react"
import { useLanguage } from "@/app/hooks/useLanguage"

const serviceIcons = [
  <Code className="w-12 h-12 mb-4 text-blue-500" key="code" />,
  <Brain className="w-12 h-12 mb-4 text-purple-500" key="brain" />,
  <MessageSquare className="w-12 h-12 mb-4 text-cyan-500" key="chat" />,
  <Zap className="w-12 h-12 mb-4 text-yellow-500" key="zap" />,
  <Database className="w-12 h-12 mb-4 text-green-500" key="db" />,
  <Shield className="w-12 h-12 mb-4 text-red-500" key="shield" />,
]

export default function Services() {
  const { t } = useLanguage()
  
  const services = t.services.items.map((item, index) => ({
    icon: serviceIcons[index],
    title: item.name,
    description: item.description,
  }))
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="container mx-auto">
        <motion.h2
          className="text-5xl font-black mb-16 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t.services.title}
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {service.icon}
              <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

