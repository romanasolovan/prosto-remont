import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import styles from "./services.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.services" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Services() {
  const t = useTranslations("services");

  const services = [
    {
      title: t("list.kitchen.title"),
      description: t("list.kitchen.description"),
      variant: "heroPanel",
    },
    {
      title: t("list.bathroom.title"),
      description: t("list.bathroom.description"),
      variant: "darkPanel",
    },
    {
      title: t("list.basement.title"),
      description: t("list.basement.description"),
      variant: "compactPanel",
    },
    {
      title: t("list.fullHome.title"),
      description: t("list.fullHome.description"),
      variant: "widePanel",
    },
    {
      title: t("list.commercial.title"),
      description: t("list.commercial.description"),
      variant: "darkPanel",
    },
    {
      title: t("list.carpentry.title"),
      description: t("list.carpentry.description"),
      variant: "compactPanel",
    },
  ];

  return (
    <div className={styles.servicesPage}>
      <section className={styles.hero}>
        <div className={styles.heroBackground} aria-hidden="true">
          <span className={styles.bgWord}>Services</span>
        </div>

        <div className="container">
          <div className={styles.heroInner}>
            <span className={styles.heroEyebrow}>{t("hero.title")}</span>
            <h1 className={styles.heroTitle}>{t("hero.title")}</h1>
            <p className={styles.subtitle}>{t("hero.subtitle")}</p>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.servicesIntro}>
            <span className={styles.servicesEyebrow}>Architectural scope</span>
            <h2 className={styles.servicesTitle}>{t("hero.title")}</h2>
          </div>

          <div className={styles.servicesBoard}>
            {services.map((service, index) => (
              <article
                key={index}
                className={`${styles.servicePanel} ${styles[service.variant]}`}
              >
                <div className={styles.panelInner}>
                  <div className={styles.panelTop}>
                    <span className={styles.serviceIndex}>
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className={styles.panelRule} aria-hidden="true" />
                  </div>

                  <div className={styles.panelBody}>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <div className={styles.panelMeta} aria-hidden="true">
                    <span className={styles.metaDot} />
                    <span className={styles.metaLine} />
                  </div>

                  <span className={styles.panelAccent} aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
