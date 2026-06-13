"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useLanguage } from "@/app/hooks/useLanguage"
import Magnetic from "./Magnetic"
import { ArrowUpRight, Phone, Github, Facebook, Instagram, Mail } from "lucide-react"

export default function Footer() {
  const { t, language } = useLanguage()

  const socials = [
    {
      key: "github",
      label: "GitHub",
      href: "https://github.com/Hutt1212",
      icon: <Github size={18} />,
    },
    {
      key: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/minh.huy.604520",
      icon: <Facebook size={18} />,
    },
    {
      key: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/m_hii204/",
      icon: <Instagram size={18} />,
    },
  ]

  const navLinks = [
    { label: language === "vi" ? "Dự Án" : "Projects", href: "/#projects" },
    { label: language === "vi" ? "Kỹ Năng" : "Skills", href: "/#skills" },
    { label: language === "vi" ? "Về Tôi" : "About", href: "/about" },
  ]

  return (
    <footer id="footer" className="relative overflow-hidden bg-foreground text-background select-none">

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Big CTA area */}
      <div className="relative z-10 border-b border-background/10">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 py-24 md:py-32 flex flex-col md:flex-row items-start md:items-end justify-between gap-12">

          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-background/40 text-sm font-medium uppercase tracking-[0.3em] mb-4"
            >
              {t.footer.available}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-outfit font-black tracking-tighter leading-[0.9] uppercase"
            >
              {t.footer.slogan}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <Magnetic>
              <a
                href="mailto:huynmhcm@gmail.com"
                className="group flex items-center gap-4 px-10 py-5 bg-primary text-primary-foreground rounded-full font-bold text-lg uppercase tracking-widest hover:bg-[hsl(var(--accent))] hover:text-foreground transition-all duration-300"
              >
                <Mail size={22} />
                {t.footer.contactTitle}
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Brand */}
          <Link href="/" className="group flex items-center gap-3">
            <span className="text-2xl font-outfit font-black tracking-tighter text-background group-hover:text-primary transition-colors">
              M.HUY
            </span>
            <span className="text-background/30 text-sm font-medium">— Fullstack Developer</span>
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-background/50 hover:text-background text-sm font-medium uppercase tracking-widest transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Socials + phone */}
          <div className="flex items-center gap-3">
            <a
              href="tel:0357210049"
              className="flex items-center gap-2 text-sm text-background/50 hover:text-background transition-colors mr-2"
            >
              <Phone size={14} />
              0357 210 049
            </a>
            {socials.map((item) => (
              <Magnetic key={item.key}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center text-background/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                >
                  {item.icon}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-background/30">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
