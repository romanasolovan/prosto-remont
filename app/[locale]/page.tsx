import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./page.module.css";
import TrustedBrands from "@/components/home/TrustedBrands/TrustedBrands";
import HomeHero from "@/components/home/HomeHero/HomeHero";
import WhyChooseUs from "@/components/home/WhyChooseUs/WhyChooseUs";
import ClientOpinionsPreview from "@/components/home/ClientOpinionsPreview/ClientOpinionsPreview";
import QuoteHighlight from "@/components/home/QuoteHighlight/QuoteHighlight";

export default function Home() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  return (
    <div className={styles.home}>
      <HomeHero />
      <TrustedBrands />
      <WhyChooseUs />
      <ClientOpinionsPreview />
      <QuoteHighlight />

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
