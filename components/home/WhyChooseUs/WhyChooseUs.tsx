import styles from "./WhyChooseUs.module.css";

const pillars = [
  {
    number: "01",
    title: "Tailored Approach",
    description:
      "Every project begins with context, constraints, and goals, so each solution feels intentional, relevant, and carefully shaped.",
  },
  {
    number: "02",
    title: "Clear Communication",
    description:
      "From first contact to final delivery, the process is structured to feel transparent, calm, and easy to navigate.",
  },
  {
    number: "03",
    title: "Architectural Precision",
    description:
      "Careful detailing, visual discipline, and a considered process create outcomes that feel refined, balanced, and enduring.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className={styles.whySection}
      aria-labelledby="why-choose-us-title"
    >
      <div className="container">
        <div className={styles.whyIntro}>
          <span className={styles.sectionLabel}>Why choose us</span>

          <h2 className={styles.whyTitle} id="why-choose-us-title">
            Design-led thinking, structured guidance, and a more considered way
            to renovate
          </h2>

          <p className={styles.whyDescription}>
            The strongest projects rely on more than taste alone. They need
            clarity, trust, and a process that feels as thoughtful as the final
            result.
          </p>
        </div>

        <div className={styles.whyGrid}>
          {pillars.map((pillar) => (
            <article className={styles.whyCard} key={pillar.number}>
              <span className={styles.whyCardNumber}>{pillar.number}</span>
              <h3 className={styles.whyCardTitle}>{pillar.title}</h3>
              <p className={styles.whyCardDescription}>{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
