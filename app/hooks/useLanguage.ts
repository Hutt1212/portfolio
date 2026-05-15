"use client"

import { useContext } from "react"
import { LanguageContext } from "../context/LanguageContext"
import { translations } from "@/lib/translations"

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }

  const { language, setLanguage } = context

  // Return both language state and the current language translations
  return {
    language,
    setLanguage,
    t: translations[language],
  }
}
