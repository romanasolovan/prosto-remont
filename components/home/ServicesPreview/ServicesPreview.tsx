"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import type { PublicService } from "@/types/services";
import styles from "./ServicesPreview.module.css";
import { getServiceAnchorHref } from "@/utils/serviceAnchors";

const getServiceIcon = (title: string) => {
  const value = title.toLowerCase();

  if (value.includes("elek") || value.includes("electric")) return "electric";
  if (value.includes("hyd") || value.includes("sanit")) return "water";
  if (
    value.includes("g-k") ||
    value.includes("gk") ||
    value.includes("drywall")
  )
    return "drywall";
  if (value.includes("glaz") || value.includes("tile")) return "tile";
  if (value.includes("mal") || value.includes("paint")) return "paint";
  if (value.includes("mont")) return "assembly";

  return "renovation";
};

const icons = {
  paint: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M14 16h16.5a5.5 5.5 0 0 1 0 11H14V16Z" />
      <path d="M14 16v11" />
      <path d="M31 16v-4H12v4" />
      <path d="M17 31h18" />
      <path d="M20 31v9h12v-9" />
    </svg>
  ),
  electric: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M20 7h12l-5 13h9L18 42l4-16h-9L20 7Z" />
      <path d="M17 7h18" />
    </svg>
  ),
  water: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 7s11 12.4 11 22a11 11 0 0 1-22 0C13 19.4 24 7 24 7Z" />
      <path d="M18.5 31.5c.7 3.2 2.8 5 6 5" />
    </svg>
  ),
  tile: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M12 12h10v10H12V12Z" />
      <path d="M26 12h10v10H26V12Z" />
      <path d="M12 26h10v10H12V26Z" />
      <path d="M26 26h10v10H26V26Z" />
      <path d="M22 17h4M22 31h4M17 22v4M31 22v4" />
    </svg>
  ),
  drywall: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M11 13h26v22H11V13Z" />
      <path d="M24 13v22" />
      <path d="M11 24h26" />
      <path d="M16 18h3M29 18h3M16 30h3M29 30h3" />
    </svg>
  ),
  assembly: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M16 33 33 16" />
      <path d="m29 12 7 7" />
      <path d="M11 36l5 5 7-7-5-5-7 7Z" />
      <path d="M33 16h5v5" />
    </svg>
  ),
  renovation: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 11 38 22v15H10V22l14-11Z" />
      <path d="M18 37V26h12v11" />
      <path d="M14 23h20" />
    </svg>
  ),
} as const;

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
      <div className={styles.gridGlow} aria-hidden="true" />

      <div className="container">
        <div className={styles.inner}>
          <div className={styles.sectionTop}>
            <span className={styles.label}>{t("servicesPreview.eyebrow")}</span>
          </div>

          <div className={styles.cards}>
            {services.map((service) => {
              const iconKey = getServiceIcon(service.title);
              const visibleItems = service.items.slice(0, 4);

              return (
                <Link
                  key={service.id}
                  href={getServiceAnchorHref(service.slug)}
                  scroll={false}
                  className={styles.card}
                >
                  <div className={styles.cardHeader}>
                    <span className={styles.icon}>{icons[iconKey]}</span>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                  </div>

                  <ul className={styles.itemList}>
                    {visibleItems.map((item) => (
                      <li className={styles.item} key={item.id}>
                        {item.name}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.cardFooter}>
                    <span className={styles.cardMeta}>
                      {t("servicesPreview.itemCount", {
                        count: service.items.length,
                      })}
                    </span>

                    <span className={styles.cardLink}>
                      <span>{tCommon("viewMore")}</span>
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <Link href="/services" className={styles.mainLink}>
            <span>{tCommon("viewAllServices")}</span>
            <span className={styles.mainLinkIcon} aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
