import { Link } from "@/navigation";
import styles from "@/app/[locale]/page.module.css";

const testimonials = [
  {
    quote:
      "The entire process felt calm, structured, and incredibly well considered from the first conversation to the final result.",
    author: "Private Client",
    context: "Residential Interior Project",
  },
  {
    quote:
      "What stood out most was the clarity. Every step was explained beautifully, and the final direction felt precise and refined.",
    author: "Studio Partner",
    context: "Concept Development",
  },
  {
    quote:
      "A thoughtful balance of aesthetics, planning, and communication made the collaboration feel seamless and premium.",
    author: "Property Client",
    context: "Design Consultation",
  },
];

export default function TestimonialsPreview() {
  return (
    <section
      className={styles.testimonialsSection}
      aria-labelledby="client-opinions-title"
    >
      <div className="container">
        <div className={styles.testimonialsIntro}>
          <span className={styles.sectionLabel}>Client opinions</span>
          <h2 className={styles.testimonialsTitle} id="client-opinions-title">
            Trust is built through experience, clarity, and results
          </h2>
          <p className={styles.testimonialsDescription}>
            A homepage should surface real client confidence. This section gives
            visitors proof that the experience feels as considered as the work
            itself.
          </p>
        </div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((item, index) => (
            <article className={styles.testimonialCard} key={index}>
              <p className={styles.testimonialQuote}>“{item.quote}”</p>
              <div className={styles.testimonialMeta}>
                <span className={styles.testimonialAuthor}>{item.author}</span>
                <span className={styles.testimonialContext}>
                  {item.context}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.testimonialsActions}>
          <Link href="/about" className={styles.sectionLink}>
            Read client opinions
            <span className={styles.linkArrow} aria-hidden="true">
              →
            </span>
          </Link>

          <Link href="/about" className={styles.testimonialsSecondaryLink}>
            Leave a review
            <span className={styles.linkArrow} aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
