"use client"

import Link from "next/link"
import { useLanguage } from "@/app/hooks/useLanguage"
import SplitReveal from "@/app/components/y/SplitReveal"

export default function NotFound() {
  const { language } = useLanguage()
  const isVi = language === "vi"

  return (
    <div className="shell flex min-h-[85svh] flex-col justify-center pb-20 pt-32">
      <span className="t-label text-[hsl(var(--orange))]">
        Error 404 / {isVi ? "Không tìm thấy trang" : "Page not found"}
      </span>

      <SplitReveal as="h1" className="t-display t-hero mt-6" type="chars" immediate stagger={0.04}>
        404
      </SplitReveal>

      <div className="mt-10 grid gap-6 md:grid-cols-12">
        <p className="t-lede max-w-[46ch] text-muted-foreground md:col-span-7">
          {isVi
            ? "Trang này đã đi lạc. Liên kết có thể đã hỏng hoặc nội dung đã được chuyển sang nơi khác."
            : "This page took a wrong turn. The link may be broken, or the content may have moved somewhere else."}
        </p>

        <div className="md:col-span-5">
          <Link href="/" data-cursor className="pill pill-solid !px-8 !py-5">
            {isVi ? "Về trang chủ" : "Back home"} →
          </Link>
        </div>
      </div>
    </div>
  )
}
