
import styles from "./reviews.module.css";
import ClientOpinions from "@/components/ClientOpinions/ClientOpinions";

export default function ReviewsPage() {
  return (
    <main className={styles.reviewsPage}>
      <section className={styles.reviewsSection}>
        <div
          className={styles.reviewsGrid}
          aria-hidden="true"
        />

        <div className="container">
          <div className={styles.reviewsContent}>
            <ClientOpinions />
          </div>
        </div>
      </section>
    </main>
  );
}

