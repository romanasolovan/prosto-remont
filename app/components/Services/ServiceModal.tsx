"use client";
import { useEffect, useRef } from "react";
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartY = useRef(0);

  useEffect(() => {
    if (!service) return;
    closeBtnRef.current?.focus();
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [service]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${service ? styles.open : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        className={styles.modal}
        onTouchStart={(e) => {
          touchStartY.current = e.touches[0].clientY;
        }}
        onTouchEnd={(e) => {
          if (e.changedTouches[0].clientY - touchStartY.current > 60) onClose();
        }}
      >
        <div className={styles.gridBg} aria-hidden="true" />
        <div className={styles.diagAccent} aria-hidden="true" />

        {/* Drag handle — mobile only */}
        <div className={styles.handle} aria-hidden="true">
          <span />
        </div>

        <div className={styles.head}>
          <div className={styles.eyebrow}>{service?.eyebrow}</div>
          <div className={styles.numRow}>
            <span className={styles.num}>
              {String((service?.index ?? 0) + 1).padStart(2, "0")}
            </span>
            <button
              ref={closeBtnRef}
              className={styles.close}
              onClick={onClose}
              aria-label="Close service detail"
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
          <h3 id="modal-title" className={styles.title}>
            {service?.title}
          </h3>
          <p className={styles.desc}>{service?.desc}</p>

          <div className={styles.specs}>
            {service?.specs.map((sp, i) => (
              <div key={i} className={styles.specCard}>
                <span className={styles.specLabel}>{sp.label}</span>
                <span className={styles.specVal}>{sp.value}</span>
              </div>
            ))}
          </div>

          <ul className={styles.steps}>
            {service?.steps.map((st, i) => (
              <li key={i} className={styles.step}>
                <span className={styles.stepNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={styles.stepText}>
                  <strong>{st.title}</strong>
                  {st.body}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
