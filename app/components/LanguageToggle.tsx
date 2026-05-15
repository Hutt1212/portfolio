"use client"

import { useLanguage } from "@/app/hooks/useLanguage"
import { motion } from "framer-motion"

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="relative p-1.5 bg-secondary/40 backdrop-blur-xl rounded-full border border-white/10 flex items-center w-[100px] h-10 shadow-lg overflow-hidden">
      {/* Dynamic Sliding Capsule */}
      <motion.div
        className="absolute h-7 rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] z-0"
        initial={false}
        animate={{
          x: language === "en" ? 0 : 44,
          width: 44,
          scale: [1, 1.1, 1], // Stretch effect
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
