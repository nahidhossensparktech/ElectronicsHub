'use client'

import { setSetting, useAppStore } from '@/lib/store'
import { translations, type Language, type TranslationKey } from './translations'

export function useTranslation() {
  const language = useAppStore((s) => s.settings.language || 'en') as Language

  const t = (key: TranslationKey, fallback?: string): string => {
    const langDict = translations[language] || translations.en
    return (langDict as Record<string, string>)[key] ?? (translations.en as Record<string, string>)[key] ?? fallback ?? key
  }

  const setLanguage = (lang: Language) => {
    setSetting('language', lang)
  }

  const toggleLanguage = () => {
    setSetting('language', language === 'bn' ? 'en' : 'bn')
  }

  return {
    t,
    language,
    isBn: language === 'bn',
    setLanguage,
    toggleLanguage,
  }
}

export { type Language, type TranslationKey } from './translations'
