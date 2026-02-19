import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./page.module.css";

export default function Home() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  return (
    <div className={styles.home}>
      {/* Hero Section with Image */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <div className={styles.heroImage} />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <div className="container">
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>{t("hero.title")}</h1>
              <p className={styles.heroSubtitle}>{t("hero.subtitle")}</p>
              <div className={styles.heroActions}>
                <Link
                  href="/contact"
                  className={`btn btn-primary ${styles.heroButton}`}
                >
                  {tCommon("startProject")}
                </Link>
                <Link
                  href="/projects"
                  className={`btn btn-secondary ${styles.heroButtonSecondary}`}
                >
                  {tCommon("viewPortfolio")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className={styles.previewSection} id="about">
        <div className="container">
          <div className={styles.sectionContent}>
            <div className={styles.sectionLabel}>About</div>
            <h2 className={styles.sectionTitle}>{t("about.title")}</h2>
            <p className={styles.sectionDescription}>
              {t("about.description")}
            </p>
            <Link href="/about" className={styles.sectionLink}>
              {tCommon("learnMore")}
              <span className={styles.linkArrow}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section
        className={`${styles.previewSection} ${styles.darkSection}`}
        id="services"
      >
        <div className="container">
          <div className={styles.sectionContent}>
            <div className={styles.sectionLabel}>Services</div>
            <h2 className={styles.sectionTitle}>{t("services.title")}</h2>
            <p className={styles.sectionDescription}>
              {t("services.description")}
            </p>
            <Link href="/services" className={styles.sectionLink}>
              {tCommon("exploreServices")}
              <span className={styles.linkArrow}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className={styles.previewSection} id="projects">
        <div className="container">
          <div className={styles.sectionContent}>
            <div className={styles.sectionLabel}>Portfolio</div>
            <h2 className={styles.sectionTitle}>{t("projects.title")}</h2>
            <p className={styles.sectionDescription}>
              {t("projects.description")}
            </p>
            <Link href="/projects" className={styles.sectionLink}>
              {tCommon("viewPortfolio")}
              <span className={styles.linkArrow}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Preview */}
      <section
        className={`${styles.previewSection} ${styles.darkSection}`}
        id="process"
      >
        <div className="container">
          <div className={styles.sectionContent}>
            <div className={styles.sectionLabel}>Process</div>
            <h2 className={styles.sectionTitle}>{t("process.title")}</h2>
            <p className={styles.sectionDescription}>
              {t("process.description")}
            </p>
            <Link href="/process" className={styles.sectionLink}>
              {tCommon("understandProcess")}
              <span className={styles.linkArrow}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
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
