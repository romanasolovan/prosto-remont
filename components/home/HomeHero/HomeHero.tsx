import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./HomeHero.module.css";

export default function HomeHero() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  return (
    <div className={styles.hero}>
      <div className={styles.surfaceLeft} aria-hidden="true" />
      <div className={styles.surfaceRight} aria-hidden="true" />

      <div className="container">
        <div className={styles.heroInner}>
          <div className={styles.copy}>
            <h1 className={styles.title}>{t("hero.title")}</h1>
            <p className={styles.subtitle}>{t("hero.subtitle")}</p>
          </div>

          {/* <div className={styles.visual} aria-hidden="true">
            <div className={styles.logoWrap}>
              <span className={styles.roofLeft} />
              <span className={styles.roofRight} />
              <span className={styles.stem} />
              <span className={styles.base} />
            </div>
          </div> */}

          <Link href="/services" className={styles.button}>
            <span className={styles.buttonText}>
              {tCommon("exploreServices")}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
