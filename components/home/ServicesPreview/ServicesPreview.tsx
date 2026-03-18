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
        "Structured guidance from the first idea to a clear renovation direction.",
    },
    {
      number: "02",
      title: "Interior Design",
      description:
        "Refined visual concepts shaped around space, function, and atmosphere.",
    },
    {
      number: "03",
      title: "Project Coordination",
      description:
        "A calmer process with aligned communication, priorities, and execution.",
    },
    {
      number: "04",
      title: "Tailored Solutions",
      description:
        "Recommendations shaped around your goals, property type, and timeline.",
    },
  ];

  return (
    <section className={styles.servicesPreview} id="services">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.content}>
            <span className={styles.label}>{t("labels.services")}</span>
            <h2 className={styles.title}>{t("services.title")}</h2>
            <p className={styles.description}>{t("services.description")}</p>

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
    </section>
  );
}
