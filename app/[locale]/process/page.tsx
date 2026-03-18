import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import styles from "./process.module.css";
import ContactForm from "@/components/ContactForm/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.process" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Process() {
  const t = useTranslations("process");

  const steps = [
    {
      number: "01",
      title: t("steps.consultation.title"),
      description: t("steps.consultation.description"),
    },
    {
      number: "02",
      title: t("steps.design.title"),
      description: t("steps.design.description"),
    },
    {
      number: "03",
      title: t("steps.proposal.title"),
      description: t("steps.proposal.description"),
    },
    {
      number: "04",
      title: t("steps.construction.title"),
      description: t("steps.construction.description"),
    },
    {
      number: "05",
      title: t("steps.walkthrough.title"),
      description: t("steps.walkthrough.description"),
    },
  ];

  return (
    <div className={styles.processPage}>
      <section className={styles.hero}>
        <div className={styles.heroBackground} aria-hidden="true">
          <span className={styles.bgWord}>Process</span>
        </div>

        <div className="container">
          <div className={styles.heroInner}>
            <span className={styles.heroEyebrow}>{t("hero.title")}</span>
            <h1 className={styles.heroTitle}>{t("hero.title")}</h1>
            <p className={styles.subtitle}>{t("hero.subtitle")}</p>
          </div>
        </div>
      </section>

      <section className={styles.stepsSection}>
        <div className="container">
          <div className={styles.stepsIntro}>
            <span className={styles.stepsEyebrow}>01 — 05</span>
            <h2 className={styles.stepsTitle}>{t("hero.title")}</h2>
          </div>

          <div className={styles.stepsContainer}>
            {steps.map((step, index) => (
              <article
                key={step.number}
                className={`${styles.step} ${
                  index % 2 === 0 ? styles.stepLeft : styles.stepRight
                }`}
              >
                <div className={styles.stepRail} aria-hidden="true">
                  <span className={styles.stepDot} />
                  {index !== steps.length - 1 && (
                    <span className={styles.stepLine} />
                  )}
                </div>

                <div className={styles.stepCard}>
                  <div className={styles.stepCardInner}>
                    <span className={styles.stepNumber}>{step.number}</span>
                    <div className={styles.stepContent}>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.quoteSection}>
        <div className="container">
          <div className={styles.quoteShell}>
            <div className={styles.quoteHeader}>
              <span className={styles.quoteEyebrow}>Next step</span>
              <h2 className={styles.quoteTitle}>{t("quote.title")}</h2>
              <p className={styles.quoteDescription}>
                {t("quote.description")}
              </p>
            </div>

            <div className={styles.formWrap}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
