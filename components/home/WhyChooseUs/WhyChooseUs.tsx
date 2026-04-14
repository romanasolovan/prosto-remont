import Link from "next/link";
import { useTranslations } from "next-intl";
import { ShieldCheck, Hammer, Clock3 } from "lucide-react";
import styles from "./WhyChooseUs.module.css";

export default function WhyChooseUs() {
  const t = useTranslations("about.whyChooseUs");

  const pillars = [
    {
      icon: ShieldCheck,
      title: t("pillars.first.title"),
      description: t("pillars.first.description"),
    },
    {
      icon: Hammer,
      title: t("pillars.second.title"),
      description: t("pillars.second.description"),
    },
    {
      icon: Clock3,
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

            {/* <h2 className={styles.whyTitle} id="why-choose-us-title">
              {t("title")}
            </h2> */}

            <p className={styles.whyDescription}>{t("description")}</p>

            <Link href="/about" className={styles.whyButton}>
              {t("button")}
            </Link>
          </div>

          <div className={styles.whyGrid}>
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;

              return (
                <article className={styles.whyCard} key={index}>
                  <div className={styles.iconWrap} aria-hidden="true">
                    <Icon className={styles.icon} />
                  </div>

                  <div className={styles.cardContent}>
                    <h3 className={styles.whyCardTitle}>{pillar.title}</h3>
                    <p className={styles.whyCardDescription}>
                      {pillar.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
