import { Link } from "@/navigation";
import styles from "./QuoteHighlight.module.css";

export default function QuoteHighlight() {
  return (
    <section className={styles.quoteHighlight}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Request a quote</span>

            <h2 className={styles.title}>
              Start your renovation project with clarity
            </h2>

            <p className={styles.description}>
              Share a few details about your project and timeline. Our team will
              review your request and provide a clear next step so your
              renovation can move forward with confidence.
            </p>
          </div>

          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNumber}>01</span>
              <p>Tell us about your project</p>
            </div>

            <div className={styles.step}>
              <span className={styles.stepNumber}>02</span>
              <p>Receive a tailored response</p>
            </div>

            <div className={styles.step}>
              <span className={styles.stepNumber}>03</span>
              <p>Move forward with a clear plan</p>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="/process" className="btn btn-primary">
              Request a Quote
            </Link>

            <Link href="/process" className={styles.secondaryLink}>
              View full process →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
