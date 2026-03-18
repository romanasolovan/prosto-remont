import {defineRouting} from "next-intl/routing";

export const locales = ["en", "uk"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  uk: "Українська"
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en"
});
