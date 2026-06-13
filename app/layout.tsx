import "./globals.css"
import { Inter, Outfit } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { LanguageProvider } from "./context/LanguageContext"
import CustomCursor from "./components/CustomCursor"
import FloatingBackground from "./components/FloatingBackground"
import TransitionOverlay from "./components/TransitionOverlay"
import SmoothScroll from "./components/SmoothScroll"
import type React from "react"

const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-sans" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })

export const metadata = {
  title: "Nguyễn Minh Huy | Fullstack Developer",
  description: "Nguyễn Minh Huy - Fullstack web developer specializing in Next.js, React, .NET, Node.js, and modern web architecture. Explore my projects featuring e-commerce platforms, realtime systems, and enterprise solutions.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen text-foreground selection:bg-primary/30 selection:text-primary`}>
        <LanguageProvider>
          <SmoothScroll>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <CustomCursor />
              <TransitionOverlay />
              <FloatingBackground />
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

