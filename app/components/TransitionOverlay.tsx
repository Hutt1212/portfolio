"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const EASE = [0.76, 0, 0.24, 1] as const

export default function TransitionOverlay() {
  const pathname = usePathname()
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [routeName, setRouteName] = useState("")

  const getRouteName = (path: string) => {
    if (path === "/") return "HOME"
    if (path === "/about") return "ABOUT"
    if (path.startsWith("/projects/")) return "PROJECT"
    if (path === "/projects") return "WORK"
    return "M.HUY"
  }

  // 1. MỞ RÈM BẤT CỨ KHI NÀO PATHNAME ĐÃ ĐƯỢC CHUYỂN XONG
  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false) // Trigger 'exit' animation để mở rèm
    }, 100) // Đợi 100ms để DOM trang mới render xong hoàn toàn
    return () => clearTimeout(t)
  }, [pathname])

  // 2. CHẶN CLICK ĐỂ ĐÓNG RÈM TRƯỚC, CHUYỂN TRANG SAU
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a")
      if (!target || !target.href) return
      
      try {
        const url = new URL(target.href)
        
        // Kiểm tra xem đây có phải là Link điều hướng nội bộ sang trang khác không
        if (
          url.origin === window.location.origin && 
          url.pathname !== window.location.pathname &&
          target.target !== "_blank"
        ) {
          e.preventDefault() // Chặn ngay lệnh nhảy trang tức thì của Next.js
          
          setRouteName(getRouteName(url.pathname))
          setShow(true) // Trigger 'enter' animation để ĐÓNG rèm
          
          // Chờ 800ms để đảm bảo 5 tấm rèm đã KÉO XUỐNG KÍN MÀN HÌNH
          setTimeout(() => {
            // Mới bắt đầu ra lệnh đổi trang (khi mọi thứ đã tối thui)
            router.push(url.pathname + url.search + url.hash)
          }, 800) 
        }
      } catch (err) {
        // Bỏ qua lỗi URL
      }
    }

    // Capture phase: Đảm bảo chạy trước onClick của Next.js
    document.addEventListener("click", handleClick, true)
    return () => document.removeEventListener("click", handleClick, true)
  }, [router])

  const columns = 5

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* ── LAYER 1: Staggered Blinds ── */}
          <div
            className="fixed inset-0 pointer-events-none flex"
            style={{ zIndex: 100000 }}
          >
            {Array.from({ length: columns }).map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                initial={{ y: "100%" }}
                animate={{
                  y: "0%",
                  transition: { duration: 0.6, ease: EASE, delay: 0.04 * i },
                }}
                exit={{
                  y: "-100%",
                  transition: { duration: 0.6, ease: EASE, delay: 0.04 * i },
                }}
                className="relative h-full w-full bg-[#0a0a0c] border-r border-white/5 last:border-none shadow-[0_0_20px_rgba(0,0,0,0.8)]"
              />
            ))}
          </div>

          {/* ── LAYER 2: Route Name Typography ── */}
          <div
            className="fixed inset-0 pointer-events-none flex items-center justify-center"
            style={{ zIndex: 300000 }}
          >
            <motion.span
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
              className="font-outfit font-black tracking-tighter uppercase select-none"
              style={{
                fontSize: "clamp(4rem, 12vw, 11rem)",
                color: "white",
                mixBlendMode: "difference",
              }}
            >
              {routeName}
            </motion.span>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
