"use client"

import { motion } from "framer-motion"

export default function Template({ children }: { children: React.ReactNode }) {
  // Trang sẽ trượt từ dưới lên (frame slide in)
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 25, 
        mass: 0.5 
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}
