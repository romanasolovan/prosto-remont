import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import styles from "./process.module.css";
import ContactForm from "@/app/components/ContactForm/ContactForm";

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
        <div className="container">
          <h1>{t("hero.title")}</h1>
          <p className={styles.subtitle}>{t("hero.subtitle")}</p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container">
          <div className={styles.stepsContainer}>
            {steps.map((step, index) => (
              <div key={index} className={styles.step}>
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={styles.stepContent}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Request a Quote form moved here */}
      <section className={styles.quoteSection}>
        <div className="container">
          <div className={styles.quoteHeader}>
            <h2 className={styles.quoteTitle}>{t("quote.title")}</h2>
            <p className={styles.quoteDescription}>{t("quote.description")}</p>
          </div>

          <div className={styles.formWrap}>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
