import styles from "@/app/[locale]/page.module.css";

const pillars = [
  {
    number: "01",
    title: "Tailored Approach",
    description:
      "Every project begins with context, constraints, and goals, so the solution feels intentional rather than generic.",
  },
  {
    number: "02",
    title: "Clear Communication",
    description:
      "From first contact to final delivery, each step is structured to feel transparent, calm, and easy to follow.",
  },
  {
    number: "03",
    title: "Architectural Precision",
    description:
      "A refined process, careful detailing, and visual discipline help create outcomes that feel elevated and considered.",
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
            Thoughtful design, clear structure, and a client-focused process
          </h2>
          <p className={styles.whyDescription}>
            The homepage should do more than introduce the studio. It should
            quickly show the qualities that make working with you feel premium,
            reliable, and well considered.
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
