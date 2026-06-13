"use client"

import { useLanguage } from "@/app/hooks/useLanguage"
import { motion } from "framer-motion"
import Image from "next/image"
import Magnetic from "@/app/components/Magnetic"
import Link from "next/link"
import { ArrowLeft, Mail, MapPin, Briefcase, GraduationCap } from "lucide-react"
import RevealText from "@/app/components/RevealText"

export default function AboutPage() {
  const { t, language } = useLanguage()

  return (
    <div className="min-h-screen pt-24 pb-24 relative z-10">
      <div className="max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-12">
          <Link href="/" className="inline-block">
            <Magnetic>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 bg-secondary/50 backdrop-blur-md rounded-full border border-border">
                <ArrowLeft size={16} />
                {language === "vi" ? "Trở về" : "Back home"}
              </div>
            </Magnetic>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

          {/* Portrait Column */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-border/50 shadow-2xl sticky top-24"
            >
              <Image
                src="/avatar.jpg"
                alt={t.name}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-outfit font-black tracking-tighter uppercase mb-2">
                <RevealText text={"NGUEN MINH HUY"} />
              </h1>
              <p className="text-xl md:text-2xl text-[hsl(var(--accent))] font-medium mb-12">
                {t.about.profession}
              </p>

              <div className="space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p className="text-foreground">{t.about.description1}</p>
                <p>{t.about.description2}</p>
              </div>

              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-secondary/60 backdrop-blur-xl border border-border flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl"><Briefcase /></div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{language === "vi" ? "Kinh nghiệm" : "Experience"}</h3>
                    <p className="text-muted-foreground">6+ {language === "vi" ? "Tháng" : "Months"}</p>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-secondary/60 backdrop-blur-xl border border-border flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl"><MapPin /></div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{language === "vi" ? "Vị trí" : "Location"}</h3>
                    <p className="text-muted-foreground">Ho Chi Minh City, VN</p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </div>
  )
}
