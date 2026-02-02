import styles from "./process.module.css";

export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Initial Consultation",
      description:
        "We meet with you to understand your vision, needs, and budget. This is where ideas begin to take shape.",
    },
    {
      number: "02",
      title: "Design & Planning",
      description:
        "Our team creates detailed plans and designs, ensuring every detail aligns with your goals.",
    },
    {
      number: "03",
      title: "Proposal & Contract",
      description:
        "We provide a transparent proposal with timeline and pricing, followed by contract finalization.",
    },
    {
      number: "04",
      title: "Construction",
      description:
        "Our skilled craftsmen bring the design to life with precision and care, keeping you informed throughout.",
    },
    {
      number: "05",
      title: "Final Walkthrough",
      description:
        "We review the completed project with you, ensuring every detail meets your expectations.",
    },
  ];

  return (
    <div className={styles.processPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1>Our Process</h1>
          <p className={styles.subtitle}>
            A clear, collaborative approach from concept to completion.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container">
          <div className={styles.stepsContainer}>
            {steps.map((step, index) => (
              <div key={index} className={styles.step}>
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={styles.stepContent}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
