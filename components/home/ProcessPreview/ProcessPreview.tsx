import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./ProcessPreview.module.css";

export default function ProcessPreview() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  const steps = ["01", "02", "03", "04", "05"];

  return (
    <section className={styles.processPreview} id="process">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.rail} aria-hidden="true">
            {steps.map((step) => (
              <span key={step} className={styles.step}>
                {step}
              </span>
            ))}
          </div>

          <div className={styles.content}>
            <span className={styles.label}>{t("labels.process")}</span>
            <h2 className={styles.title}>{t("process.title")}</h2>
            <p className={styles.description}>{t("process.description")}</p>

            <Link href="/process" className={styles.link}>
              {tCommon("understandProcess")}
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
