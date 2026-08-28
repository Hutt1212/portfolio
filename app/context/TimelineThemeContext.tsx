"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

export type TimelineThemeKey = "sacred" | "multiverse" | "loki" | "quantum" | "nexus"

export interface TimelineThemeConfig {
  id: TimelineThemeKey
  name: string
  nameVi: string
  desc: string
  descVi: string
  code: string
  isTree: boolean
  mainColor: string // hex
  glowColor: string // hex
  coreColor: string // hex
  voidColor: string // hex
  gridColor: string // rgba
  particleColor: string // hex
  baseAmplitude: number
  speedMultiplier: number
  waveTurbulence: number
  frequency: number
  accentHue: number
}

export const TIMELINE_THEMES: Record<TimelineThemeKey, TimelineThemeConfig> = {
  sacred: {
    id: "sacred",
    name: "Sacred Timeline (Standard Gold)",
    nameVi: "Dòng Thời Gian Thiêng Liêng (Sacred Gold)",
    desc: "The pristine braided central timeline cable woven tightly by the TVA.",
    descVi: "Dòng thời gian thiêng liêng nguyên bản với hàng trăm sợi tơ bện chặt tạo thành bó cáp thời gian thống nhất.",
    code: "TIMELINE_ID: SACRED_GOLD_CORE",
    isTree: false,
    mainColor: "#ff8c00",
    glowColor: "#ffd700",
    coreColor: "#ffffff",
    voidColor: "#060402",
    gridColor: "rgba(255, 140, 0, 0.07)",
    particleColor: "#ffcc00",
    baseAmplitude: 45,
    speedMultiplier: 1.0,
    waveTurbulence: 0.35,
    frequency: 0.0018,
    accentHue: 38,
  },
  multiverse: {
    id: "multiverse",
    name: "Multiverse War (Quantum Warp)",
    nameVi: "Chiến Tranh Đa Vũ Trụ (Quantum Warp)",
    desc: "Chaotic diverging dimensional threads surging with violet and electric cyan energy.",
    descVi: "Dòng chảy đa vũ trụ phân nhánh xé rách không gian với luồng năng lượng tím và xanh neon rực rỡ.",
    code: "TIMELINE_ID: MULTIVERSE_WARP_01",
    isTree: false,
    mainColor: "#b026ff",
    glowColor: "#00e5ff",
    coreColor: "#ffffff",
    voidColor: "#070210",
    gridColor: "rgba(176, 38, 255, 0.08)",
    particleColor: "#e066ff",
    baseAmplitude: 58,
    speedMultiplier: 1.3,
    waveTurbulence: 0.65,
    frequency: 0.0024,
    accentHue: 275,
  },
  loki: {
    id: "loki",
    name: "God Loki (Yggdrasil World Tree)",
    nameVi: "Thần Loki (Cây Thế Giới Yggdrasil)",
    desc: "God Loki sitting at the throne, weaving the infinite multiverse into the Tree of Stories.",
    descVi: "Thần Loki nắm giữ các sợi tơ thời gian, bện thành Cây thế giới Yggdrasil màu xanh ngọc bích hùng vĩ.",
    code: "TIMELINE_ID: YGGDRASIL_TREE_LOKI",
    isTree: true,
    mainColor: "#00ffaa",
    glowColor: "#55ffc2",
    coreColor: "#e0ffff",
    voidColor: "#020b06",
    gridColor: "rgba(0, 255, 170, 0.08)",
    particleColor: "#77ffdd",
    baseAmplitude: 50,
    speedMultiplier: 0.85,
    waveTurbulence: 0.45,
    frequency: 0.0016,
    accentHue: 160,
  },
  quantum: {
    id: "quantum",
    name: "Quantum Neural Matrix (Tech Stack)",
    nameVi: "Ma Trận Lượng Tử (Tech Matrix)",
    desc: "High-frequency parallel computational threads carrying pure technical data streams.",
    descVi: "Các luồng tính toán song song tần số cao mang dữ liệu công nghệ và kỹ thuật hiện đại.",
    code: "TIMELINE_ID: QUANTUM_MATRIX_CORE",
    isTree: false,
    mainColor: "#00f0ff",
    glowColor: "#4d79ff",
    coreColor: "#ffffff",
    voidColor: "#020712",
    gridColor: "rgba(0, 240, 255, 0.07)",
    particleColor: "#38bdf8",
    baseAmplitude: 40,
    speedMultiplier: 1.15,
    waveTurbulence: 0.5,
    frequency: 0.0028,
    accentHue: 195,
  },
  nexus: {
    id: "nexus",
    name: "Nexus Redline Event (Critical Threshold)",
    nameVi: "Sự Kiện Nexus Vượt Ngưỡng (Redline Event)",
    desc: "Critical redline threshold breach, flashing high-voltage warning sparks across spacetime.",
    descVi: "Sự kiện Nexus vượt ngưỡng cho phép của TVA, luồng năng lượng đỏ rực bùng nổ báo động toàn hệ thống.",
    code: "TIMELINE_ID: CRITICAL_NEXUS_RED",
    isTree: false,
    mainColor: "#ff2a5f",
    glowColor: "#ff8c00",
    coreColor: "#ffeedd",
    voidColor: "#0f0206",
    gridColor: "rgba(255, 42, 95, 0.09)",
    particleColor: "#ff5577",
    baseAmplitude: 65,
    speedMultiplier: 1.45,
    waveTurbulence: 0.8,
    frequency: 0.0032,
    accentHue: 345,
  },
}

interface TimelineThemeContextType {
  activeTheme: TimelineThemeKey
  themeConfig: TimelineThemeConfig
  setTheme: (theme: TimelineThemeKey) => void
  isOpenShowcase: boolean
  openShowcase: () => void
  closeShowcase: () => void
}

const TimelineThemeContext = createContext<TimelineThemeContextType | undefined>(undefined)

export function TimelineThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveThemeState] = useState<TimelineThemeKey>("sacred")
  const [isOpenShowcase, setIsOpenShowcase] = useState<boolean>(false)

  const setTheme = useCallback((theme: TimelineThemeKey) => {
    if (TIMELINE_THEMES[theme]) {
      setActiveThemeState(theme)

      const cfg = TIMELINE_THEMES[theme]
      if (typeof document !== "undefined") {
        document.documentElement.style.setProperty("--tva-grid", cfg.gridColor)
        document.documentElement.style.setProperty("--tl-glow", `${cfg.accentHue} 100% 62%`)
        document.documentElement.style.setProperty("--tva-main-hex", cfg.mainColor)
        document.documentElement.style.setProperty("--tva-glow-hex", cfg.glowColor)
      }
    }
  }, [])

  const openShowcase = useCallback(() => {
    setIsOpenShowcase(true)
  }, [])

  const closeShowcase = useCallback(() => {
    setIsOpenShowcase(false)
  }, [])

  const themeConfig = TIMELINE_THEMES[activeTheme] || TIMELINE_THEMES.sacred

  return (
    <TimelineThemeContext.Provider
      value={{
        activeTheme,
        themeConfig,
        setTheme,
        isOpenShowcase,
        openShowcase,
        closeShowcase,
      }}
    >
      {children}
    </TimelineThemeContext.Provider>
  )
}

export function useTimelineTheme() {
  const ctx = useContext(TimelineThemeContext)
  if (!ctx) {
    throw new Error("useTimelineTheme must be used within a TimelineThemeProvider")
  }
  return ctx
}
