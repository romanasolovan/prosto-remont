"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { PublicService } from "@/types/services";
import styles from "./services.module.css";

export default function ServicesClient() {
  const t = useTranslations("services");
  const [services, setServices] = useState<PublicService[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/public/services");

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();

        setServices(data.services || []);
      } catch (error) {
        console.error("Failed to load services:", error);
        setServices([]);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className={styles.servicesPage}>
      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.heroTop}>
            <span className={styles.eyebrow}>{t("hero.eyebrow")}</span>
            <h1 className={styles.title}>{t("hero.title")}</h1>
          </div>

          <div className={styles.introGrid}>
            <div className={styles.imageWrap}>
              <Image
                src="/services/services.jpg"
                alt={t("hero.eyebrow")}
                width={640}
                height={820}
                className={styles.image}
                priority
              />
            </div>

            <div className={styles.introContent}>
              <h2 className={styles.question}>{t("hero.question")}</h2>

              <div className={styles.paragraphs}>
                <p>{t("hero.paragraphs.first")}</p>
                <p>{t("hero.paragraphs.second")}</p>
                <p>{t("hero.paragraphs.third")}</p>
              </div>
            </div>
          </div>

          <div className={styles.separator} aria-hidden="true" />

          <div className={styles.pricingIntro}>
            <p className={styles.pricingNote}>{t("pricing.note")}</p>
            <p className={styles.pricingDescription}>
              {t("pricing.description")}
            </p>
          </div>

          {services.length > 0 ? (
            <div className={styles.priceGroups}>
              {services.map((service) => (
                <article className={styles.priceGroup} key={service.id}>
                  <h2 className={styles.groupTitle}>{service.title}</h2>

                  <ul className={styles.priceList}>
                    {service.items.map((item) => (
                      <li className={styles.priceItem} key={item.id}>
                        <span className={styles.itemName}>{item.name}</span>
                        <span className={styles.itemDots} aria-hidden="true" />
                        <strong className={styles.itemPrice}>
                          {item.price}
                        </strong>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          ) : (
            <p className={styles.emptyState}>{t("empty")}</p>
          )}
        </div>
      </section>
    </div>
  );
}
