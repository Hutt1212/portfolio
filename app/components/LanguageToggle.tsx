"use client"

import { useLanguage } from "@/app/hooks/useLanguage"
import { motion } from "framer-motion"

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="relative p-1 bg-secondary/40 flex items-center w-[100px] h-9 shadow-md overflow-hidden border border-foreground/20 rounded-none">
      {/* Dynamic Sliding Capsule */}
      <motion.div
        className="absolute h-6 bg-primary shadow-md z-0 rounded-none"
        initial={false}
        animate={{
          x: language === "en" ? 0 : 46,
          width: 46,
          scale: [1, 1.05, 1], // Stretch effect
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25,
          scale: { duration: 0.2 }
        }}
      />

      <button
        onClick={() => setLanguage("en")}
        className="relative z-10 flex-1 flex items-center justify-center h-full outline-none"
      >
        <motion.span
          animate={{
            scale: language === "en" ? 1.1 : 0.85,
            opacity: language === "en" ? 1 : 0.4,
            color: language === "en" ? "#ffffff" : "var(--muted-foreground)"
          }}
          className="text-[11px] font-black tracking-widest uppercase"
        >
          EN
        </motion.span>
      </button>

      <button
        onClick={() => setLanguage("vi")}
        className="relative z-10 flex-1 flex items-center justify-center h-full outline-none"
      >
        <motion.span
          animate={{
            scale: language === "vi" ? 1.1 : 0.85,
            opacity: language === "vi" ? 1 : 0.4,
            color: language === "vi" ? "#ffffff" : "var(--muted-foreground)"
          }}
          className="text-[11px] font-black tracking-widest uppercase"
        >
          VN
        </motion.span>
      </button>
    </div>
  )
}
