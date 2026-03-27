import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./ServicesPreview.module.css";

export default function ServicesPreview() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  const services = [
    {
      number: "01",
      title: "Renovation Planning",
      description:
        "Structured guidance that turns early ideas, practical constraints, and priorities into a clear direction.",
    },
    {
      number: "02",
      title: "Interior Design",
      description:
        "Refined concepts shaped around atmosphere, proportion, and the way a space should feel and function.",
    },
    {
      number: "03",
      title: "Project Coordination",
      description:
        "A calmer process built on aligned communication, thoughtful sequencing, and clearer decision-making.",
    },
    {
      number: "04",
      title: "Tailored Solutions",
      description:
        "Recommendations adapted to your property type, renovation scope, timeline, and long-term goals.",
    },
  ];

  return (
    <div className={styles.servicesPreview} id="services">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.content}>
            <span className={styles.label}>{t("labels.services")}</span>

            <h2 className={styles.title}>
              Services shaped around clarity, design, and real project needs
            </h2>

            <p className={styles.description}>
              Every project benefits from structure as much as style. These
              service areas are designed to support better decisions, smoother
              execution, and a more considered final result.
            </p>

            <Link href="/services" className={styles.link}>
              {tCommon("exploreServices")}
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <div className={styles.grid} aria-hidden="true">
            {services.map((service) => (
              <article key={service.number} className={styles.card}>
                <span className={styles.cardNumber}>{service.number}</span>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
