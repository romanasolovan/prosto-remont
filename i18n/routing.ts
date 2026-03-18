import { defineRouting } from "next-intl/routing";

export const locales = ["pl", "en", "uk", "ru"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  pl: "Polski",
  en: "English",
  uk: "Українська",
  ru: "Русский",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "pl",
});
