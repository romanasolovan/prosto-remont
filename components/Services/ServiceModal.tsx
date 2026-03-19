"use client";

import { useEffect, useId, useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "./ServiceModal.module.css";

export interface ServiceDetail {
  eyebrow: string;
  index: number;
  title: string;
  desc: string;
  specs: { label: string; value: string }[];
  steps: { title: string; body: string }[];
}

interface Props {
  service: ServiceDetail | null;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: Props) {
  const t = useTranslations("services.modal");
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartY = useRef(0);
  const titleId = useId();

  useEffect(() => {
    if (!service) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [service]);

  useEffect(() => {
    if (!service) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${styles.open}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(event) => {
        if (event.target === overlayRef.current) onClose();
      }}
    >
      <div
        className={styles.modal}
        onTouchStart={(event) => {
          touchStartY.current = event.touches[0].clientY;
        }}
        onTouchEnd={(event) => {
          const deltaY = event.changedTouches[0].clientY - touchStartY.current;
          if (deltaY > 60) onClose();
        }}
      >
        <div className={styles.gridBg} aria-hidden="true" />
        <div className={styles.diagAccent} aria-hidden="true" />

        <div className={styles.handle} aria-hidden="true">
          <span />
        </div>

        <div className={styles.head}>
          <div className={styles.eyebrow}>{service.eyebrow}</div>

          <div className={styles.numRow}>
            <span className={styles.num}>
              {String(service.index + 1).padStart(2, "0")}
            </span>

            <button
              ref={closeBtnRef}
              type="button"
              className={styles.close}
              onClick={onClose}
              aria-label={t("closeAria")}
            >
              <svg
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="1" y1="1" x2="11" y2="11" />
                <line x1="11" y1="1" x2="1" y2="11" />
              </svg>
            </button>
          </div>

          <span className={styles.rule} aria-hidden="true" />
        </div>

        <div className={styles.body}>
          <h3 id={titleId} className={styles.title}>
            {service.title}
          </h3>

          <p className={styles.desc}>{service.desc}</p>

          <div className={styles.specs}>
            {service.specs.map((spec) => (
              <div
                key={`${spec.label}-${spec.value}`}
                className={styles.specCard}
              >
                <span className={styles.specLabel}>{spec.label}</span>
                <span className={styles.specVal}>{spec.value}</span>
              </div>
            ))}
          </div>

          <ul className={styles.steps}>
            {service.steps.map((step, index) => (
              <li key={`${step.title}-${index}`} className={styles.step}>
                <span className={styles.stepNum}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className={styles.stepText}>
                  <strong>{step.title}</strong>
                  {step.body}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
