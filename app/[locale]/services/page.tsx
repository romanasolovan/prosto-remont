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
    },
    {
      title: t("list.bathroom.title"),
      description: t("list.bathroom.description"),
    },
    {
      title: t("list.basement.title"),
      description: t("list.basement.description"),
    },
    {
      title: t("list.fullHome.title"),
      description: t("list.fullHome.description"),
    },
    {
      title: t("list.commercial.title"),
      description: t("list.commercial.description"),
    },
    {
      title: t("list.carpentry.title"),
      description: t("list.carpentry.description"),
    },
  ];

  return (
    <div className={styles.servicesPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1>{t("hero.title")}</h1>
          <p className={styles.subtitle}>{t("hero.subtitle")}</p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container">
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
