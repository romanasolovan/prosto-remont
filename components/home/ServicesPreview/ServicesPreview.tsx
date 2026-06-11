"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import type { PublicService } from "@/types/services";
import styles from "./ServicesPreview.module.css";

export default function ServicesPreview() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const [services, setServices] = useState<PublicService[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/public/services");

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();

        setServices((data.services || []).slice(0, 4));
      } catch (error) {
        console.error("Failed to load services preview:", error);
        setServices([]);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className={styles.servicesPreview} id="services">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.content}>
            <span className={styles.label}>{t("servicesPreview.eyebrow")}</span>

            <h2 className={styles.title}>{t("servicesPreview.title")}</h2>

            <p className={styles.description}>
              {t("servicesPreview.description")}
            </p>

            <Link href="/services" className={styles.link}>
              {tCommon("exploreServices")}
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <div className={styles.grid}>
            {services.map((service, index) => (
              <article key={service.id} className={styles.card}>
                <span className={styles.cardNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className={styles.cardTitle}>{service.title}</h3>

                <p className={styles.cardDescription}>
                  {t("servicesPreview.itemCount", {
                    count: service.items.length,
                  })}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
