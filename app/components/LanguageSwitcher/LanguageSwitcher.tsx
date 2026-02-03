"use client";

import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/request";
import styles from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as Locale;

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className={styles.languageSwitcher}>
      <button className={styles.currentLocale} aria-label="Change language">
        {currentLocale.toUpperCase()}
      </button>
      <ul className={styles.localeList}>
        {locales.map((locale) => (
          <li key={locale}>
            <button
              onClick={() => handleLocaleChange(locale)}
              className={`${styles.localeButton} ${
                locale === currentLocale ? styles.active : ""
              }`}
            >
              {localeLabels[locale]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
