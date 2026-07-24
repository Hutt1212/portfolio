"use client"

import { motion } from "framer-motion"
import { Boxes, Database, Gauge, PlugZap, Radio, ShieldCheck } from "lucide-react"
import { useLanguage } from "@/app/hooks/useLanguage"
import SectionHead from "./SectionHead"
import Rail from "./Rail"

interface Service {
  name: string
  description: string
}

const EASE = [0.16, 1, 0.3, 1] as const
const ICONS = [Boxes, PlugZap, Radio, Gauge, Database, ShieldCheck]

export default function Expertise() {
  const { t } = useLanguage()
  const s = t.street

  return (
    <section id="expertise" className="py-16 md:py-28">
      <div className="mx-auto w-full max-w-[110rem] px-4 sm:px-6 lg:px-10">
        <SectionHead
          index="03"
          label={s.labels.expertise}
          title={t.services.title}
          action={
            <span className="t-tag border-2 border-foreground px-3 py-2 md:px-4">
              {s.dragHint}
            </span>
          }
        />
      </div>

      <Rail label={t.services.title}>
        {t.services.items.map((service: Service, i: number) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE, delay: Math.min(i * 0.07, 0.35) }}
              className="w-[78vw] sm:w-[52vw] md:w-[38vw] lg:w-[27vw] xl:w-[23rem]"
            >
              <article className="slab shadow-hard press flex h-full min-h-[19rem] flex-col justify-between gap-6 bg-card p-6 md:min-h-[23rem] md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center border-2 border-foreground bg-volt text-volt-foreground md:h-14 md:w-14">
                    <Icon size={22} strokeWidth={2.5} />
                  </span>
                  <span className="font-display text-4xl leading-[1.15] text-foreground/15 md:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <h3 className="font-display t-mid">{service.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:mt-4 md:text-base">
                    {service.description}
                  </p>
                </div>
              </article>
            </motion.div>
          )
        })}
      </Rail>
    </section>
  )
}
