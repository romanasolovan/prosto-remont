import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("navigation");
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerDecor} aria-hidden="true">
        <span className={styles.footerLineLeft} />
        <span className={styles.footerLineRight} />
        <span className={styles.footerBaseLine} />
      </div>

      <div className="container">
        <div className={styles.footerShell}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h3 className={styles.footerTitle}>PRO100REMONT</h3>
              <p className={styles.footerText}>{t("description")}</p>
            </div>

            <div className={styles.footerSection}>
              <h4 className={styles.footerHeading}>{t("quickLinks")}</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <Link href="/about">{tNav("about")}</Link>
                </li>
                <li>
                  <Link href="/services">{tNav("services")}</Link>
                </li>
                <li>
                  <Link href="/projects">{tNav("projects")}</Link>
                </li>
                <li>
                  <Link href="/process">{tNav("process")}</Link>
                </li>
              </ul>
            </div>

            <div className={styles.footerSection}>
              <h4 className={styles.footerHeading}>{t("contactInfo")}</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="mailto:pro100twojremont@gmail.com">
                    pro100twojremont@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+48796444113">+48 796 444 113</a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>{t("copyright", { year: currentYear })}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
