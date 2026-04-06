import { useTranslations } from "next-intl";
import styles from "./WhyChooseUs.module.css";

export default function WhyChooseUs() {
  const t = useTranslations("about.whyChooseUs");

  const pillars = [
    {
      number: "01",
      title: t("pillars.first.title"),
      description: t("pillars.first.description"),
    },
    {
      number: "02",
      title: t("pillars.second.title"),
      description: t("pillars.second.description"),
    },
    {
      number: "03",
      title: t("pillars.third.title"),
      description: t("pillars.third.description"),
    },
  ];

  return (
    <section
      className={styles.whySection}
      aria-labelledby="why-choose-us-title"
    >
      <div className="container">
        <div className={styles.whyShell}>
          <div className={styles.whyIntro}>
            <span className={styles.sectionLabel}>{t("eyebrow")}</span>

            <h2 className={styles.whyTitle} id="why-choose-us-title">
              {t("title")}
            </h2>

            <p className={styles.whyDescription}>{t("description")}</p>
          </div>

          <div className={styles.whyGrid}>
            {pillars.map((pillar) => (
              <article className={styles.whyCard} key={pillar.number}>
                <span className={styles.whyCardNumber}>{pillar.number}</span>
                <h3 className={styles.whyCardTitle}>{pillar.title}</h3>
                <p className={styles.whyCardDescription}>
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
