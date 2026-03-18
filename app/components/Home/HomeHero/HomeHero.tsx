import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./HomeHero.module.css";

export default function HomeHero() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  return (
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
  );
}
