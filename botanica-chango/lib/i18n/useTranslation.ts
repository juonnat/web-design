"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

export function useTranslation() {
  const { locale } = useLanguage();
  return translations[locale];
}
