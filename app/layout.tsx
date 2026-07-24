import "./globals.css"
import { Anton, Archivo, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { LanguageProvider } from "./context/LanguageContext"
import CustomCursor from "./components/CustomCursor"
import Preloader from "./components/street/Preloader"
import StreetBackground from "./components/StreetBackground"
import TransitionOverlay from "./components/TransitionOverlay"
import SmoothScroll from "./components/SmoothScroll"
import type { Metadata, Viewport } from "next"
import type React from "react"

const archivo = Archivo({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
})

const anton = Anton({
  subsets: ["latin", "vietnamese"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nguyễn Minh Huy | Fullstack Developer",
  description:
    "Nguyễn Minh Huy - Fullstack web developer specializing in Next.js, React, .NET, Node.js, and modern web architecture. Explore my projects featuring e-commerce platforms, realtime systems, and enterprise solutions.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F2EC" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Without JS the preloader would never lift, so take it out entirely. */}
        <noscript>
          <style>{`#preloader{display:none!important}`}</style>
        </noscript>
      </head>
      <body
        className={`${archivo.variable} ${anton.variable} ${jetbrains.variable} font-sans min-h-screen bg-background text-foreground`}
      >
        <LanguageProvider>
          <SmoothScroll>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Preloader />
              <CustomCursor />
              <TransitionOverlay />
              <StreetBackground />
              <Header />
              <main className="relative z-10">{children}</main>
              <Footer />
            </ThemeProvider>
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  )
}
