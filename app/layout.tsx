import "./globals.css"
import { Inter, Playfair_Display, Cinzel, Be_Vietnam_Pro, Lora } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { LanguageProvider } from "./context/LanguageContext"
import CustomCursor from "./components/CustomCursor"
import type React from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin", "vietnamese"], variable: "--font-serif" })
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" })

const beVietnam = Be_Vietnam_Pro({ 
  subsets: ["vietnamese"], 
  weight: ["300", "400", "500", "600", "700", "800"], 
  variable: "--font-be-vietnam" 
})
const lora = Lora({ 
  subsets: ["vietnamese"], 
  variable: "--font-lora" 
})

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
      <body className={`${inter.variable} ${playfair.variable} ${cinzel.variable} ${beVietnam.variable} ${lora.variable} font-sans min-h-screen text-foreground`}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <CustomCursor />
            <Header />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

