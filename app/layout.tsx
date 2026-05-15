import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { LanguageProvider } from "./context/LanguageContext"
import CustomCursor from "./components/CustomCursor"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

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
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
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

