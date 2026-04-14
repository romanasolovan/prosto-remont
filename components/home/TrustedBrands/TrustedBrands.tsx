import { useTranslations } from "next-intl";
import styles from "./TrustedBrands.module.css";
import Image from "next/image";

type Brand = {
  name: string;
  mark: string;
  logoSrc?: string;
  logoAlt?: string;
};

const trustedBrands: Brand[] = [
  {
    name: "Dar Sport Space",
    mark: "DS",
    logoSrc: "/trusted/DarSportSpace.webp",
    logoAlt: "Dar Sport Space Logo",
  },
  {
    name: "Element",
    mark: "EL",
    logoSrc: "/trusted/Element.webp",
    logoAlt: "Element Logo",
  },
  {
    name: "GrindHouse Gym",
    mark: "GHG",
    logoSrc: "/trusted/GrindHouseGym.webp",
    logoAlt: "Grind House Gym Logo",
  },
  {
    name: "Manaland",
    mark: "M",
    logoSrc: "/trusted/Manaland.webp",
    logoAlt: "Manaland Logo",
  },
  {
    name: "Marinero Hair",
    mark: "MH",
    logoSrc: "/trusted/MarineroHair.webp",
    logoAlt: "Marinero Hair Logo",
  },
  {
    name: "Peachy Reformer Wellness",
    mark: "PRW",
    logoSrc: "/trusted/PeachyReformerWellness.webp",
    logoAlt: "Peachy Reformer Wellness Logo",
  },
  {
    name: "Premium Ikra",
    mark: "PI",
    logoSrc: "/trusted/PremiumIkra.webp",
    logoAlt: "Premium Ikra Logo",
  },
  {
    name: "SKILL | Shaurma, Kebab, Grill",
    mark: "SSKG",
    logoSrc: "/trusted/SkillShaurmaKebabGrill.webp",
    logoAlt: "SKILL | Shaurma, Kebab, Grill Logo",
  },
  {
    name: "The Sadovsky Barbershop",
    mark: "TSB",
    logoSrc: "/trusted/TheSadovskyBarbershop.webp",
    logoAlt: "The Sadovsky Barbershop Logo",
  },
];

function BrandItem({ brand }: { brand: Brand }) {
  return (
    <li className={styles.trustedItem}>
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
