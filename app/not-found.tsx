"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/app/hooks/useLanguage"

const EASE = [0.16, 1, 0.3, 1] as const

export default function NotFound() {
  const { language } = useLanguage()
  const isVi = language === "vi"

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-[110rem] flex-col justify-center px-4 pb-20 pt-28 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="flex items-center gap-3 border-b-2 border-foreground pb-3 md:border-b-[3px]">
          <span className="h-2.5 w-2.5 bg-flare" />
          <span className="t-tag">Error 404</span>
          <span className="t-tag text-muted-foreground">
            / {isVi ? "Không tìm thấy trang" : "Page not found"}
          </span>
        </div>

        <h1 className="font-display t-poster mt-5 md:mt-8">
          <span className="block">404</span>
          <span className="t-outline block">{isVi ? "Lạc rồi" : "Lost"}</span>
        </h1>

        <div className="mt-8 grid grid-cols-12 gap-4 md:mt-12 md:gap-6">
          <div className="slab col-span-12 bg-card p-5 md:col-span-7 md:p-8">
            <p className="text-base leading-relaxed text-muted-foreground md:text-xl">
              {isVi
                ? "Trang này đã đi lạc. Liên kết có thể đã hỏng hoặc nội dung đã được chuyển sang nơi khác."
                : "This page took a wrong turn. The link may be broken, or the content may have moved somewhere else."}
            </p>
          </div>

          <Link
            href="/"
            className="slab press shadow-hard group col-span-12 flex items-center justify-between gap-4 bg-volt p-5 text-volt-foreground md:col-span-5 md:p-8"
          >
            <span className="font-display t-big">{isVi ? "Về trang chủ" : "Back home"}</span>
            <ArrowUpRight
              size={34}
              strokeWidth={2.5}
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
