import ClientOpinions from "@/components/ClientOpinions/ClientOpinions";
import styles from "./reviews.module.css";

export default function ReviewsPage() {
  return (
    <main className={styles.reviewsPage}>
      <div className={styles.reviewsSection}>
        <div className={styles.reviewsGrid} aria-hidden="true" />

        <div className="container">
          <div className={styles.reviewsContent}>
            <ClientOpinions />
          </div>
        </div>
      </div>
    </main>
  );
}