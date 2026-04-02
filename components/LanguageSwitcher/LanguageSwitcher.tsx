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
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={dropdownId}
        aria-label="Change language"
      >
        <span className={styles.triggerInner}>
          <span className={styles.triggerCode}>{currentLocale}</span>

          <span
            className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
            aria-hidden="true"
          >
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6.5L8 10L12 6.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
      </button>

      <div
        id={dropdownId}
        className={`${styles.dropdown} ${open ? styles.dropdownOpen : ""}`}
      >
        <ul className={styles.localeList} aria-label="Languages" role="listbox">
          {locales.map((locale) => {
            const isActive = locale === currentLocale;

            return (
              <li key={locale}>
                <button
                  type="button"
                  onClick={() => handleLocaleChange(locale)}
                  className={`${styles.localeButton} ${
                    isActive ? styles.localeButtonActive : ""
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className={styles.localeCode}>{locale}</span>

                  <span className={styles.localeMeta}>
                    <span className={styles.localeName}>
                      {localeLabels[locale]}
                    </span>
                  </span>

                  <span
                    className={`${styles.localeMark} ${
                      isActive ? styles.localeMarkVisible : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3.5 8.5L6.5 11.5L12.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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
