"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./TrustedBrands.module.css";
import Image from "next/image";
import Link from "next/link";

type Brand = {
  name: string;
  mark: string;
  logoSrc?: string;
  logoAlt?: string;
  href?: string;
};

function BrandItem({ brand }: { brand: Brand }) {
  const content = (
    <>
      <div className={styles.brandBadge}>
        {brand.logoSrc ? (
          <Image
            src={brand.logoSrc}
            alt={brand.logoAlt || `${brand.name} logo`}
            fill
            sizes="(max-width: 767px) 44px, 48px"
            className={styles.brandLogo}
          />
        ) : (
          <span className={styles.brandMark} aria-hidden="true">
            {brand.mark}
          </span>
        )}
      </div>

      <span className={styles.brandName}>{brand.name}</span>
    </>
  );

  return (
    <li className={styles.trustedItem}>
      {brand.href ? (
        <Link href={brand.href} className={styles.brandLink}>
          {content}
        </Link>
      ) : (
        content
      )}
    </li>
  );
}

export default function TrustedBrands() {
  const t = useTranslations("about.trustedBrands");

  const [trustedBrands, setTrustedBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchTrustedBrands = async () => {
      try {
        const response = await fetch("/api/public/trusted-brands");

        if (!response.ok) {
          throw new Error("Failed to fetch trusted brands");
        }

        const data = await response.json();

        setTrustedBrands(data.brands || []);
      } catch (error) {
        console.error("Failed to load trusted brands:", error);
        setTrustedBrands([]);
      }
    };

    fetchTrustedBrands();
  }, []);

  return (
    <section
      className={styles.trustedSection}
      aria-labelledby="trusted-by-title"
    >
      <div className="container">
        <div className={styles.trustedInner}>
          <div className={styles.trustedHeader}>
            <span className={styles.sectionLabel}>{t("eyebrow")}</span>

            <h2 className={styles.trustedTitle} id="trusted-by-title">
              {t("title")}
            </h2>

            <p className={styles.trustedDescription}>{t("description")}</p>
          </div>

          <div
            className={styles.trustedCarousel}
            role="region"
            aria-label={t("regionLabel")}
          >
            <div className={styles.trustedTrack}>
              <ul className={styles.trustedList}>
                {trustedBrands.map((brand) => (
                  <BrandItem key={brand.name} brand={brand} />
                ))}
              </ul>

              <ul className={styles.trustedList} aria-hidden="true">
                {trustedBrands.map((brand) => (
                  <BrandItem key={`${brand.name}-duplicate`} brand={brand} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
