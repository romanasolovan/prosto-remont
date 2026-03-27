"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./QuoteHighlight.module.css";

type QuoteHighlightProps = {
  onOpenQuoteModal: () => void;
};

export default function QuoteHighlight({
  onOpenQuoteModal,
}: QuoteHighlightProps) {
  const t = useTranslations("quoteHighlight");
  const tCommon = useTranslations("common");

  const steps = [
    { number: "01", text: t("steps.first") },
    { number: "02", text: t("steps.second") },
    { number: "03", text: t("steps.third") },
  ];

  return (
    <div className={styles.quoteHighlight}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.gridBg} aria-hidden="true" />
          <div className={styles.diagonal} aria-hidden="true" />
          <div className={styles.accentLine} aria-hidden="true" />

          <div className={styles.header}>
            <span className={styles.eyebrow}>{t("eyebrow")}</span>
            <h2 className={styles.title}>{t("title")}</h2>
            <p className={styles.description}>{t("description")}</p>
          </div>

          <div className={styles.steps}>
            {steps.map((step) => (
              <div key={step.number} className={styles.step}>
                <span className={styles.stepNumber}>{step.number}</span>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={`btn btn-primary ${styles.primaryButton}`}
              onClick={onOpenQuoteModal}
            >
              {tCommon("requestQuote")}
            </button>

            <Link href="/process" className={styles.secondaryLink}>
              {t("viewProcess")}
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
