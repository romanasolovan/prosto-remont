import Image from "next/image";
import styles from "./Partners.module.css";

export type Partner = {
  id: string;
  name: string;
  logoUrl?: string;
  href?: string;
};

type PartnersProps = {
  partners: Partner[];
  title: string;
  ariaLabel: string;
};

export default function Partners({
  partners,
  title,
  ariaLabel,
}: PartnersProps) {
  if (!partners.length) return null;

  const carouselPartners = [...partners, ...partners];

  return (
    <section className={styles.partners} aria-label={ariaLabel}>
      <div className={styles.partnersHeader}>
        <p className={styles.partnersTitle}>{title}</p>
      </div>

      <div className={styles.carousel} aria-hidden="true">
        <div className={styles.carouselTrack}>
          {carouselPartners.map((partner, index) => {
            const content = (
              <>
                {partner.logoUrl ? (
                  <Image
                    src={partner.logoUrl}
                    alt=""
                    className={styles.partnerLogo}
                    loading="lazy"
                  />
                ) : (
                  <span className={styles.partnerMark}>
                    {partner.name.charAt(0)}
                  </span>
                )}

                <span className={styles.partnerName}>{partner.name}</span>
              </>
            );

            return (
              <div
                key={`${partner.id}-${index}`}
                className={styles.partnerItem}
              >
                {partner.href ? (
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.partnerCard}
                    tabIndex={-1}
                  >
                    {content}
                  </a>
                ) : (
                  <div className={styles.partnerCard}>{content}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <ul className={styles.partnersList}>
        {partners.map((partner) => (
          <li key={partner.id}>
            {partner.href ? (
              <a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.srPartnerLink}
              >
                {partner.name}
              </a>
            ) : (
              <span>{partner.name}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
