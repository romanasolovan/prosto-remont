"use client";

// import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./services.module.css";
import ServiceModal, {
  type ServiceDetail,
} from "@/components/Services/ServiceModal";

import { useEffect, useState } from "react";
import type { PublicService } from "@/types/services";

export default function ServicesClient() {
  const t = useTranslations("services");
  const [activeService, setActiveService] = useState<ServiceDetail | null>(
    null,
  );

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

  const openModal = (index: number) => {
    const service = services[index];
    if (!service) return;

    const modalService: ServiceDetail = {
      index,
      title: service.title,
      eyebrow: service.price || "Service details",
      desc: service.fullDescription || service.shortDescription,
      specs: service.specs || [],
      steps: service.steps || [],
    };

    setActiveService(modalService);
  };

  const closeModal = () => setActiveService(null);

  const getPanelVariant = (index: number) => {
    const variants = [
      styles.heroPanel,
      styles.darkPanel,
      styles.compactPanel,
      styles.compactPanel,
      styles.darkPanel,
      styles.widePanel,
    ];

    return variants[index % variants.length];
  };

  return (
    <>
      <div className={styles.servicesPage}>
        <section className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroDiagonals} aria-hidden="true">
            <svg
              viewBox="0 0 900 320"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <line
                x1="60"
                y1="260"
                x2="300"
                y2="20"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
              />
              <line
                x1="100"
                y1="320"
                x2="380"
                y2="0"
                stroke="rgba(255,255,255,0.025)"
                strokeWidth="0.5"
              />
              <line
                x1="600"
                y1="0"
                x2="840"
                y2="260"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
              />
              <line
                x1="650"
                y1="0"
                x2="900"
                y2="300"
                stroke="rgba(255,255,255,0.025)"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          <span
            className={`${styles.cornerMark} ${styles.tl}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.cornerMark} ${styles.tr}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.cornerMark} ${styles.bl}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.cornerMark} ${styles.br}`}
            aria-hidden="true"
          />

          <div className={styles.tickRuler} aria-hidden="true">
            {Array.from({ length: 40 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>

          <div className="container">
            <div className={styles.heroInner}>
              <span className={styles.heroEyebrow}>{t("hero.eyebrow")}</span>

              <h1 className={styles.heroTitle}>
                {t("hero.title")}
                <em className={styles.heroTitleItalic}>
                  {t("hero.titleItalic")}
                </em>
              </h1>

              <p className={styles.subtitle}>{t("hero.subtitle")}</p>
            </div>
          </div>
        </section>

        <section className={styles.servicesSection}>
          <span className={styles.diagRule1} aria-hidden="true" />
          <span className={styles.diagRule2} aria-hidden="true" />

          <div className="container">
            <div className={styles.servicesIntro}>
              <div className={styles.servicesIntroText}>
                <span className={styles.servicesEyebrow}>
                  {t("section.eyebrow")}
                </span>
                <h2 className={styles.servicesTitle}>{t("section.title")}</h2>
                <p className={styles.servicesLead}>
                  {t("section.description")}
                </p>
              </div>

              <span className={styles.servicesCount}>{t("section.count")}</span>
            </div>

            <div className={styles.sep} aria-hidden="true">
              <span className={styles.sepLine} />
              <span className={styles.sepLabel}>
                {t("section.matrixLabel")}
              </span>
              <span className={`${styles.sepLine} ${styles.sepLineReverse}`} />
            </div>

            <div className={styles.servicesBoard}>
              {services.map((service, index) => (
                <article
                  key={service.id}
                  className={`${styles.servicePanel} ${getPanelVariant(index)}`}
                  data-cursor-card="true"
                  onClick={() => openModal(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openModal(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={t("section.openDetailAria", {
                    title: service.title,
                  })}
                >
                  <div className={styles.panelInner}>
                    <span className={styles.panelAccent} aria-hidden="true" />

                    <div className={styles.panelTop}>
                      <span className={styles.serviceIndex}>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className={styles.calloutCircle} aria-hidden="true">
                        {service.abbr ||
                          service.title.slice(0, 2).toUpperCase()}
                      </span>
                    </div>

                    <span className={styles.panelRule} aria-hidden="true" />

                    <div className={styles.panelBody}>
                      <h3>{service.title}</h3>
                      <p>{service.shortDescription}</p>
                    </div>

                    <div className={styles.panelMeta}>
                      <span className={styles.metaDot} aria-hidden="true" />
                      <span className={styles.metaLine} aria-hidden="true" />
                      <span className={styles.metaHint}>
                        {t("section.viewDetail")}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <ServiceModal service={activeService} onClose={closeModal} />
    </>
  );
}
