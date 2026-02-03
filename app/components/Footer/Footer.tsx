import { useTranslations } from "next-intl";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("navigation");
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>RENOVATE</h3>
            <p className={styles.footerText}>{t("description")}</p>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>{t("quickLinks")}</h4>
            <ul className={styles.footerLinks}>
              <li>
                <a href="/about">{tNav("about")}</a>
              </li>
              <li>
                <a href="/services">{tNav("services")}</a>
              </li>
              <li>
                <a href="/projects">{tNav("projects")}</a>
              </li>
              <li>
                <a href="/process">{tNav("process")}</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>{t("contactInfo")}</h4>
            <ul className={styles.footerLinks}>
              <li>
                <a href="mailto:info@renovate.com">info@renovate.com</a>
              </li>
              <li>
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>{t("copyright", { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
}
