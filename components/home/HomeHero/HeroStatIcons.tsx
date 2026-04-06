"use client";

import { useState } from "react";
import styles from "./HeroStatIcons.module.css";

type HeroStatItem = {
  key: string;
  icon: React.ReactNode;
  label: string;
};

type HeroStatIconsProps = {
  items: readonly HeroStatItem[];
  ariaLabel: string;
};

export default function HeroStatIcons({
  items,
  ariaLabel,
}: HeroStatIconsProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  return (
    <ul className={styles.iconRow} aria-label={ariaLabel}>
      {items.map((item, index) => {
        const isActive = activeKey === item.key;

        return (
          <li
            key={item.key}
            className={styles.iconItem}
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <button
              type="button"
              className={`${styles.iconButton} ${isActive ? styles.isActive : ""}`}
              aria-label={item.label}
              aria-pressed={isActive}
              onClick={() => setActiveKey(isActive ? null : item.key)}
            >
              <span className={styles.iconCircle} aria-hidden="true">
                {item.icon}
              </span>

              <span className={styles.label}>{item.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
