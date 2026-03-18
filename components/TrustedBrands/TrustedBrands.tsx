import styles from "@/app/[locale]/page.module.css";

const trustedBrands = [
  { name: "Atelier North", mark: "AN" },
  { name: "Luma Studio", mark: "LS" },
  { name: "Crest & Co", mark: "CC" },
  { name: "Vero House", mark: "VH" },
  { name: "Oakline", mark: "OL" },
  { name: "Forma Works", mark: "FW" },
  { name: "Miro Atelier", mark: "MA" },
  { name: "Stonewell", mark: "SW" },
];

export default function TrustedBrands() {
  return (
    <section
      className={styles.trustedSection}
      aria-labelledby="trusted-by-title"
    >
      <div className="container">
        <div className={styles.trustedInner}>
          <div className={styles.trustedHeader}>
            <span className={styles.sectionLabel}>Trusted by</span>
            <h2 className={styles.trustedTitle} id="trusted-by-title">
              Brands that worked with us
            </h2>
            <p className={styles.trustedDescription}>
              A curated selection of placeholder partner marks presented as an
              elegant moving brand rail until real client identities are added.
            </p>
          </div>

          <div
            className={styles.trustedCarousel}
            role="region"
            aria-label="Partner brands"
          >
            <div className={styles.trustedTrack}>
              <ul className={styles.trustedList}>
                {trustedBrands.map((brand) => (
                  <li className={styles.trustedItem} key={brand.name}>
                    <div className={styles.brandBadge}>
                      <span className={styles.brandMark} aria-hidden="true">
                        {brand.mark}
                      </span>
                    </div>
                    <span className={styles.brandName}>{brand.name}</span>
                  </li>
                ))}
              </ul>

              <ul className={styles.trustedList} aria-hidden="true">
                {trustedBrands.map((brand) => (
                  <li
                    className={styles.trustedItem}
                    key={`${brand.name}-duplicate`}
                  >
                    <div className={styles.brandBadge}>
                      <span className={styles.brandMark} aria-hidden="true">
                        {brand.mark}
                      </span>
                    </div>
                    <span className={styles.brandName}>{brand.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
