"use client"

import { motion } from "framer-motion"

export default function RevealText({ text, className }: { text: string; className?: string }) {
  // Tách text thành các từ
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 80,
      rotateZ: 10,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-flex">
          <motion.span variants={child} className="mr-[0.3em] pb-1 inline-block transform-origin-bottom-left">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  )
}
