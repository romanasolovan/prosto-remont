"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./CallWidget.module.css";

type Props = {
  phoneDisplay: string; // "+48 515 678 017"
  phoneTel: string; // "+48515678017"
};

export default function CallWidget({ phoneDisplay, phoneTel }: Props) {
  const t = useTranslations("callWidget");
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className={styles.widget} role="region" aria-label={t("title")}>
      {/* half-in/half-out close button */}
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className={styles.closeButton}
        aria-label={t("closeLabel")}
      >
        <span aria-hidden="true">×</span>
      </button>

      <a className={styles.widgetLink} href={`tel:${phoneTel}`}>
        <span className={styles.iconWrap} aria-hidden="true">
          <span className={styles.icon}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
            </svg>
          </span>
        </span>

        <span className={styles.textBlock}>
          <span className={styles.title}>{t("title")}</span>

          {/* Desktop only */}
          <span className={styles.phone}>{phoneDisplay}</span>
        </span>
      </a>
    </div>
  );
}
