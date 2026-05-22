"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useLanguage } from "@/app/hooks/useLanguage"
export default function Footer() {
  const { t, language } = useLanguage()

  const footerLinks = [
    {
      key: "phone",
      label: "0357 210 049",
      href: "tel:0357210049",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
      )
    },
    {
      key: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/minh.huy.604520",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
      )
    },
    {
      key: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/m_hii204/",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
      )
    },
    {
      key: "github",
      label: "GitHub",
      href: "https://github.com/Hutt1212",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
      )
    }
  ]

  return (
    <footer id="footer" className="bg-[#0b0907] dark:bg-[#070605] pt-20 pb-12 border-t-4 border-double border-foreground/30 relative overflow-hidden text-foreground select-none">

      {/* Old parchment overlay */}
      <div className="absolute inset-0 bg-repeat pointer-events-none opacity-[0.03] dark:opacity-[0.06] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

        {/* Newspaper double rule divider */}
        <div className="w-full h-1 bg-foreground/20 border-b border-foreground/30 mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Branding Section */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-cinzel font-black tracking-widest text-primary uppercase">M. Huy Times.</span>
            </Link>
            <p className="text-muted-foreground font-serif text-sm max-w-sm leading-relaxed mb-8 text-justify">
              {t.footer.slogan || "Crafting high-performance web applications with modern architecture and exceptional user experiences."}
            </p>
            <div className="flex gap-3">
              {footerLinks.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-foreground/30 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-[1px_1px_0px_rgba(0,0,0,0.15)]"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary font-cinzel font-black mb-6 uppercase tracking-widest text-xs border-b border-foreground/15 pb-1">
              {t.nav.projects}
            </h4>
            <ul className="space-y-3 font-serif">
              <li>
                <Link href="#projects" className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-primary rotate-45 flex-shrink-0"></span>
                  {t.portfolio.title}
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-primary rotate-45 flex-shrink-0"></span>
                  {t.skills.title}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-primary font-cinzel font-black mb-6 uppercase tracking-widest text-xs border-b border-foreground/15 pb-1">
              {t.footer.contactTitle || "Contact"}
            </h4>
            <div className="space-y-4 font-serif">
              <a href="tel:0357210049" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                <span className="w-8 h-8 border border-foreground/20 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors shadow-[1px_1px_0px_rgba(0,0,0,0.05)]">
                  {footerLinks[0].icon}
                </span>
                0357 210 049
              </a>
              <div className="text-[11px] text-muted-foreground/60 mt-4 italic border-t border-foreground/10 pt-2">
                {t.footer.available || "Available for new opportunities"}
              </div>
            </div>
          </div>
        </div>

        {/* Double rule footer imprint */}
        <div className="pt-8 border-t border-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-serif text-muted-foreground/60">
            {t.footer.copyright}
          </p>

        </div>
      </div>
    </footer>
  )
}
