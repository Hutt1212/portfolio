"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const particleId = useRef(0)
  const lastPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Calculate distance moved
      const dx = e.clientX - lastPosition.current.x
      const dy = e.clientY - lastPosition.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Spawn a magical spark particle if mouse moved enough
      if (distance > 15) {
        spawnParticle(e.clientX, e.clientY)
        lastPosition.current = { x: e.clientX, y: e.clientY }
      }
    }

    const spawnParticle = (x: number, y: number) => {
      const colors = ["#d97706", "#f59e0b", "#fbbf24", "#fef3c7"] // Golden wizard sparks
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      const size = Math.random() * 8 + 4 // 4px to 12px

      const newParticle: Particle = {
        id: particleId.current++,
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        size,
        color: randomColor
      }

      setParticles((prev) => [...prev.slice(-15), newParticle]) // Keep last 15 particles
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("button") || target.closest("a") || target.tagName === "BUTTON" || target.tagName === "A" || target.style.cursor === "pointer") {
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

  // Clean up particles over time
  useEffect(() => {
    if (particles.length === 0) return
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1))
    }, 600)
    return () => clearTimeout(timer)
  }, [particles])

  return (
    <>
      {/* Golden wand spark particles trailing */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.8, scale: 1, x: p.x - p.size / 2, y: p.y - p.size / 2 }}
            animate={{ opacity: 0, scale: 0, y: p.y + 15 + (Math.random() - 0.5) * 10 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed pointer-events-none z-[9999]"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: "50%",
              boxShadow: `0 0 8px ${p.color}`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main wand tip core (instant follow) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        animate={{
          x: mousePosition.x - (isHovered ? 12 : 6),
          y: mousePosition.y - (isHovered ? 12 : 6),
          width: isHovered ? 24 : 12,
          height: isHovered ? 24 : 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.1 }}
      >
        <div 
          className="rounded-full transition-all duration-300 w-full h-full"
          style={{
            backgroundColor: "#fbbf24",
            boxShadow: isHovered 
              ? "0 0 20px #fbbf24, 0 0 35px #d97706" 
              : "0 0 10px #fbbf24, 0 0 20px #d97706",
            transform: isHovered ? "scale(1.5)" : "scale(1)"
          }}
        />
      </motion.div>

      {/* Trailing spell halo */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - (isHovered ? 30 : 16),
          y: mousePosition.y - (isHovered ? 30 : 16),
          width: isHovered ? 60 : 32,
          height: isHovered ? 60 : 32,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.6 }}
      >
        <div 
          className="rounded-full transition-all duration-300 w-full h-full border"
          style={{
            borderColor: isHovered ? "rgba(251, 191, 36, 0.4)" : "rgba(217, 119, 6, 0.2)",
            backgroundColor: isHovered ? "rgba(217, 119, 6, 0.05)" : "transparent",
            boxShadow: isHovered ? "0 0 15px rgba(217, 119, 6, 0.1)" : "none"
          }}
        />
      </motion.div>
    </>
  )
}
