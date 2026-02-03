import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./page.module.css";

export default function Home() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>{t("hero.title")}</h1>
          <p className={styles.heroSubtitle}>{t("hero.subtitle")}</p>
          <Link href="/contact" className="btn btn-primary">
            {tCommon("startProject")}
          </Link>
        </div>
      </section>

      {/* About Preview */}
      <section
        className={`${styles.previewSection} section-spacing`}
        id="about"
      >
        <div className="container">
          <h2>{t("about.title")}</h2>
          <p>{t("about.description")}</p>
          <Link href="/about" className="btn btn-secondary">
            {tCommon("learnMore")}
          </Link>
        </div>
      </section>

      {/* Services Preview */}
      <section
        className={`${styles.previewSection} ${styles.alternateBackground} section-spacing`}
        id="services"
      >
        <div className="container">
          <h2>{t("services.title")}</h2>
          <p>{t("services.description")}</p>
          <Link href="/services" className="btn btn-secondary">
            {tCommon("exploreServices")}
          </Link>
        </div>
      </section>

      {/* Projects Preview */}
      <section
        className={`${styles.previewSection} section-spacing`}
        id="projects"
      >
        <div className="container">
          <h2>{t("projects.title")}</h2>
          <p>{t("projects.description")}</p>
          <Link href="/projects" className="btn btn-secondary">
            {tCommon("viewPortfolio")}
          </Link>
        </div>
      </section>

      {/* Process Preview */}
      <section
        className={`${styles.previewSection} ${styles.alternateBackground} section-spacing`}
        id="process"
      >
        <div className="container">
          <h2>{t("process.title")}</h2>
          <p>{t("process.description")}</p>
          <Link href="/process" className="btn btn-secondary">
            {tCommon("understandProcess")}
          </Link>
        </div>
      </section>

      {/* Contact Preview */}
      <section
        className={`${styles.previewSection} section-spacing`}
        id="contact"
      >
        <div className="container">
          <h2>{t("contact.title")}</h2>
          <p>{t("contact.description")}</p>
          <Link href="/contact" className="btn btn-primary">
            {tCommon("contactUs")}
          </Link>
        </div>
      </section>
    </div>
  );
}
