import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./ProcessPreview.module.css";

export default function ProcessPreview() {
  const t = useTranslations("common");

  const steps = ["01", "02", "03", "04", "05"];

  return (
    <div className={styles.processPreview} id="process">
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
            <span className={styles.label}>Process</span>

            <h2 className={styles.title}>
              A clearer process creates calmer decisions and better outcomes
            </h2>

            <p className={styles.description}>
              From first inquiry to final direction, each stage is structured to
              feel transparent, considered, and easy to move through.
            </p>

            <Link href="/process" className={styles.link}>
              {t("understandProcess")}
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
