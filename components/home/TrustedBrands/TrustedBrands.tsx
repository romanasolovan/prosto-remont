import { useTranslations } from "next-intl";
import styles from "./TrustedBrands.module.css";

type Brand = {
  name: string;
  mark: string;
  logoSrc?: string;
  logoAlt?: string;
};

const trustedBrands: Brand[] = [
  { name: "Atelier North", mark: "AN" },
  { name: "Luma Studio", mark: "LS" },
  { name: "Crest & Co", mark: "CC" },
  { name: "Vero House", mark: "VH" },
  { name: "Oakline", mark: "OL" },
  { name: "Forma Works", mark: "FW" },
  { name: "Miro Atelier", mark: "MA" },
  { name: "Stonewell", mark: "SW" },
];

function BrandItem({ brand }: { brand: Brand }) {
  return (
    <li className={styles.trustedItem}>
      <div className={styles.brandBadge}>
        {brand.logoSrc ? (
          <img
            src={brand.logoSrc}
            alt={brand.logoAlt || brand.name}
            className={styles.brandLogo}
          />
        ) : (
          <span className={styles.brandMark} aria-hidden="true">
            {brand.mark}
          </span>
        )}
      </div>

      <span className={styles.brandName}>{brand.name}</span>
    </li>
  );
}

export default function TrustedBrands() {
  const t = useTranslations("about.trustedBrands");

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
