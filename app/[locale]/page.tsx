import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./page.module.css";

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

export default function Home() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroDecor} aria-hidden="true">
          <span className={styles.heroRoofLeft} />
          <span className={styles.heroRoofRight} />
          <span className={styles.heroBaseLine} />
          <span className={styles.heroVertical} />
        </div>

        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>{t("hero.title")}</h1>
              <p className={styles.heroSubtitle}>{t("hero.subtitle")}</p>

              <div className={styles.heroActions}>
                <Link
                  href="/contact"
                  className={`btn btn-primary ${styles.heroButton}`}
                >
                  {tCommon("startProject")}
                </Link>

                <Link href="/projects" className={styles.heroLink}>
                  {tCommon("viewPortfolio")}
                  <span className={styles.linkArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div className={styles.heroPanels} aria-hidden="true">
              <div className={`${styles.heroPanel} ${styles.heroPanelLarge}`}>
                <span className={styles.panelNumber}>01</span>
              </div>
              <div className={`${styles.heroPanel} ${styles.heroPanelTall}`}>
                <span className={styles.panelNumber}>02</span>
              </div>
              <div className={`${styles.heroPanel} ${styles.heroPanelSmall}`}>
                <span className={styles.panelNumber}>03</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                elegant moving brand rail until real client identities are
                added.
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

      <section className={styles.previewSection} id="about">
        <div className="container">
          <div className={styles.previewRow}>
            <div className={styles.previewText}>
              <span className={styles.sectionLabel}>{t("labels.about")}</span>
              <h2 className={styles.sectionTitle}>{t("about.title")}</h2>
              <p className={styles.sectionDescription}>
                {t("about.description")}
              </p>
              <Link href="/about" className={styles.sectionLink}>
                {tCommon("learnMore")}
                <span className={styles.linkArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div className={styles.aboutCard} aria-hidden="true">
              <div className={styles.aboutCardMain}>
                <span className={styles.cardNumber}>01</span>
              </div>
              <div className={styles.aboutCardSide} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.previewSection} id="services">
        <div className="container">
          <div className={`${styles.previewRow} ${styles.reverseRow}`}>
            <div className={styles.servicesBoard} aria-hidden="true">
              <div className={styles.serviceMiniCard}>
                <span className={styles.cardNumber}>01</span>
              </div>
              <div className={styles.serviceMiniCard}>
                <span className={styles.cardNumber}>02</span>
              </div>
              <div className={styles.serviceMiniCard}>
                <span className={styles.cardNumber}>03</span>
              </div>
              <div className={styles.serviceMiniCard}>
                <span className={styles.cardNumber}>04</span>
              </div>
            </div>

            <div className={styles.previewText}>
              <span className={styles.sectionLabel}>
                {t("labels.services")}
              </span>
              <h2 className={styles.sectionTitle}>{t("services.title")}</h2>
              <p className={styles.sectionDescription}>
                {t("services.description")}
              </p>
              <Link href="/services" className={styles.sectionLink}>
                {tCommon("exploreServices")}
                <span className={styles.linkArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.previewSection} id="projects">
        <div className="container">
          <div className={styles.previewRow}>
            <div className={styles.previewText}>
              <span className={styles.sectionLabel}>
                {t("labels.projects")}
              </span>
              <h2 className={styles.sectionTitle}>{t("projects.title")}</h2>
              <p className={styles.sectionDescription}>
                {t("projects.description")}
              </p>
              <Link href="/projects" className={styles.sectionLink}>
                {tCommon("viewPortfolio")}
                <span className={styles.linkArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div className={styles.projectsCard} aria-hidden="true">
              <div className={styles.projectsFrameOuter}>
                <div className={styles.projectsFrameInner} />
              </div>
              <span className={styles.projectsNumber}>03</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.previewSection} id="process">
        <div className="container">
          <div className={`${styles.previewRow} ${styles.reverseRow}`}>
            <div className={styles.processRail} aria-hidden="true">
              <span className={styles.processStep}>01</span>
              <span className={styles.processStep}>02</span>
              <span className={styles.processStep}>03</span>
              <span className={styles.processStep}>04</span>
              <span className={styles.processStep}>05</span>
            </div>

            <div className={styles.previewText}>
              <span className={styles.sectionLabel}>{t("labels.process")}</span>
              <h2 className={styles.sectionTitle}>{t("process.title")}</h2>
              <p className={styles.sectionDescription}>
                {t("process.description")}
              </p>
              <Link href="/process" className={styles.sectionLink}>
                {tCommon("understandProcess")}
                <span className={styles.linkArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaLine} aria-hidden="true" />
            <h2 className={styles.ctaTitle}>{t("contact.title")}</h2>
            <p className={styles.ctaDescription}>{t("contact.description")}</p>
            <Link
              href="/contact"
              className={`btn btn-primary ${styles.ctaButton}`}
            >
              {tCommon("contactUs")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
