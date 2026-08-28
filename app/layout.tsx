import "./globals.css"
import { Archivo, JetBrains_Mono } from "next/font/google"
import { LanguageProvider } from "./context/LanguageContext"
import { TimelineThemeProvider } from "./context/TimelineThemeContext"
import SmoothScroll from "./components/SmoothScroll"
import Loader from "./components/y/Loader"
import Cursor from "./components/y/Cursor"
import Nav from "./components/y/Nav"
import Footer from "./components/y/Footer"
import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import type React from "react"

const archivo = Archivo({
  subsets: ["latin", "vietnamese"],
  axes: ["wdth"],
  variable: "--font-sans",
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
  themeColor: "#060402",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${jetbrains.variable} font-sans min-h-screen bg-background text-foreground`}>
        <LanguageProvider>
          <TimelineThemeProvider>
            <SmoothScroll>
              <Loader />
              <Cursor />
              <Nav />
              <main className="relative">{children}</main>
              <Footer />
            </SmoothScroll>
          </TimelineThemeProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
