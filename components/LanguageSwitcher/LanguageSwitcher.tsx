"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/routing";
import styles from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as Locale;

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  return (
    <div className={styles.languageSwitcher} ref={wrapperRef}>
      <button
        className={styles.currentLocale}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Change language"
      >
        <span className={styles.currentLocaleText}>
          {currentLocale.toUpperCase()}
        </span>
        <span
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      <div className={`${styles.dropdown} ${open ? styles.dropdownOpen : ""}`}>
        <ul className={styles.localeList}>
          {locales.map((locale) => (
            <li key={locale}>
              <button
                onClick={() => handleLocaleChange(locale)}
                className={`${styles.localeButton} ${
                  locale === currentLocale ? styles.active : ""
                }`}
              >
                <span className={styles.localeCode}>
                  {locale.toUpperCase()}
                </span>
                <span className={styles.localeName}>
                  {localeLabels[locale]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
