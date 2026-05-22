"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24 pb-24 relative overflow-hidden">
      {/* Magical candle glow effects */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-orange-600/5 dark:bg-orange-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center p-8 parchment-block relative"
      >
        {/* Newspaper Issue Details Header */}
        <div className="flex justify-between w-full text-[9px] font-cinzel uppercase tracking-[0.2em] px-2 py-1 text-muted-foreground border-b border-foreground/30 mb-6">
          <span>Daily Prophet Special Bulletin</span>
          <span>404 - Lost Scroll</span>
        </div>

        {/* Big gothic title */}
        <h1 className="text-4xl md:text-5xl font-cinzel font-black mb-4 uppercase tracking-tight text-foreground">
          Scroll Lost
        </h1>
        
        <div className="w-full h-1 bg-foreground/30 relative mb-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 font-cinzel text-[9px] tracking-[0.25em] text-primary">
            ✦ DEPT. OF MYSTERIES ✦
          </div>
        </div>

        {/* Flavour text */}
        <p className="font-serif text-muted-foreground mb-8 text-sm md:text-base leading-relaxed text-justify italic">
          "The specific scroll or edition you are seeking seems to have been misplaced in the restricted section of the library, or swept away by a rogue Scourgify spell. Rest assured, our owls are searching the archives."
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="inline-block px-6 py-3 border-2 border-foreground bg-foreground text-background font-cinzel font-bold text-xs uppercase tracking-widest hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300 shadow-[2px_2px_0px_rgba(0,0,0,0.15)] hover:shadow-none"
        >
          Return to Front Page
        </Link>
      </motion.div>
    </div>
  )
}
