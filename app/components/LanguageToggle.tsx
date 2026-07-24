"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/app/hooks/useLanguage"
import type { Language } from "@/app/context/LanguageContext"

const OPTIONS: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "vi", label: "VI" },
]

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const index = Math.max(
    0,
    OPTIONS.findIndex((option) => option.code === language)
  )

  return (
    <div
      role="group"
      aria-label="Language"
      className="press shadow-hard relative flex h-10 items-stretch overflow-hidden border-2 border-foreground bg-card md:h-11 md:border-[3px]"
    >
      {/* Volt block slides between the two halves instead of the label boxes
          swapping fill — the swap read as a flicker next to the neighbouring
          buttons, which all animate. */}
      <motion.span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1/2 bg-volt"
        initial={false}
        animate={{ x: `${index * 100}%` }}
        transition={{ type: "spring", stiffness: 500, damping: 36, mass: 0.6 }}
      />

      {OPTIONS.map((option) => {
        const active = language === option.code
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLanguage(option.code)}
            aria-pressed={active}
            className={`relative z-10 flex w-9 items-center justify-center font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-200 md:w-10 ${
              active ? "text-volt-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {/* Letter-spacing also applies after the final glyph, which shoves
                a 2-letter label off-centre in a square. Cancel it back out. */}
            <span className="-mr-[0.16em]">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
