"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a")) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  return (
    <>
      {/* Small dot (instant follow) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        animate={{
          x: mousePosition.x - (isHovered ? 40 : 6),
          y: mousePosition.y - (isHovered ? 40 : 6),
          width: isHovered ? 80 : 12,
          height: isHovered ? 80 : 12,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.2 }}
      >
        <div className={`bg-white rounded-full transition-all duration-300 w-full h-full ${isHovered ? 'opacity-20 scale-150' : 'opacity-100'}`} />
      </motion.div>

      {/* Trailing circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        animate={{
          x: mousePosition.x - (isHovered ? 40 : 20),
          y: mousePosition.y - (isHovered ? 40 : 20),
          width: isHovered ? 80 : 40,
          height: isHovered ? 80 : 40,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.8 }}
      >
        <div className={`rounded-full transition-all duration-300 w-full h-full ${isHovered ? 'border-none bg-white opacity-10' : 'border border-white opacity-30'}`} />
      </motion.div>
    </>
  )
}


