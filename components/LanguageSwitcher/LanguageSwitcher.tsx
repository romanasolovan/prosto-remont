"use client";

import { useEffect, useId, useRef, useState } from "react";
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
  const dropdownId = useId();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  return (
    <div className={styles.languageSwitcher} ref={wrapperRef}>
      <button
        type="button"
        className={`${styles.currentLocale} ${
          open ? styles.currentLocaleOpen : ""
        }`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={dropdownId}
        aria-label="Change language"
      >
        <span className={styles.currentLocaleBadge} aria-hidden="true">
          {currentLocale.slice(0, 1).toUpperCase()}
        </span>

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

      <div
        id={dropdownId}
        className={`${styles.dropdown} ${open ? styles.dropdownOpen : ""}`}
      >
        <ul className={styles.localeList} aria-label="Languages">
          {locales.map((locale) => {
            const isActive = locale === currentLocale;

            return (
              <li key={locale}>
                <button
                  type="button"
                  onClick={() => handleLocaleChange(locale)}
                  className={`${styles.localeButton} ${
                    isActive ? styles.active : ""
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className={styles.localeBadge}>
                    {locale.toUpperCase()}
                  </span>

                  <span className={styles.localeMeta}>
                    <span className={styles.localeName}>
                      {localeLabels[locale]}
                    </span>
                    <span className={styles.localeHint}>
                      {locale.toUpperCase()}
                    </span>
                  </span>

                  <span
                    className={`${styles.localeCheck} ${
                      isActive ? styles.localeCheckVisible : ""
                    }`}
                    aria-hidden="true"
                  >
                    •
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
