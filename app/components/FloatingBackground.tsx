"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plane, Luggage, Camera, Map, Compass, Globe2 } from "lucide-react"

const ICONS = [Plane, Luggage, Camera, Map, Compass, Globe2]
const COLORS = [
  "text-[hsl(var(--accent))]",
  "text-[hsl(var(--emblemo-yellow))]",
  "text-[hsl(var(--emblemo-pink))]",
  "text-primary"
]

interface FloatingIcon {
  id: number
  Icon: any
  color: string
  startX: number
  startY: number
  endX: number
  endY: number
  size: number
  duration: number
  rotation: number
}

export default function FloatingBackground() {
  const [icons, setIcons] = useState<FloatingIcon[]>([])
  const iconIdCounter = useRef(0)

  useEffect(() => {
    // Function to spawn a random icon
    const spawnIcon = () => {
      const newIcon: FloatingIcon = {
        id: iconIdCounter.current++,
        Icon: ICONS[Math.floor(Math.random() * ICONS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        startX: Math.random() * 100, // random start %
        startY: Math.random() * 100 + 10, // spawn slightly lower
        endX: Math.random() * 100, // random end %
        endY: Math.random() * 100 - 10, // drift upwards slightly
        size: Math.random() * 60 + 30, // size between 30 and 90
        duration: Math.random() * 15 + 10, // lives for 10 to 25 seconds
        rotation: Math.random() * 360 // random end rotation
      }

      setIcons(prev => [...prev, newIcon])

      // Auto remove after its duration
      setTimeout(() => {
        setIcons(prev => prev.filter(icon => icon.id !== newIcon.id))
      }, newIcon.duration * 1000)
    }

    // Initial spawn
    for (let i = 0; i < 6; i++) {
      spawnIcon()
    }

    // Spawn new icon every 3 seconds
    const interval = setInterval(spawnIcon, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white dark:bg-[#0f172a]">
      {/* Background Noise for texture */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Randomly appearing and drifting icons */}
      <AnimatePresence>
        {icons.map((item) => {
          const { Icon } = item
          return (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                left: `${item.startX}%`,
                top: `${item.startY}%`,
                scale: 0.5,
                rotate: 0
              }}
              animate={{
                opacity: [0, 0.6, 0.6, 0], // Higher opacity
                left: `${item.endX}%`,
                top: `${item.endY}%`,
                scale: 1,
                rotate: item.rotation
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: item.duration,
                ease: "linear"
              }}
              className={`absolute ${item.color} drop-shadow-xl`}
            >
              <Icon size={item.size} strokeWidth={1} />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
