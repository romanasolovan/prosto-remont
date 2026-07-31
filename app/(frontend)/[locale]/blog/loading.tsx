import DataLoader from "@/components/ui/DataLoader/DataLoader";

import styles from "./blog.module.css";

export default function BlogLoading() {
  return (
    <main className={styles.blogPage}>
      <section className={styles.blogSection}>
        <div className="container">
          <div className={styles.routeLoader}>
            <DataLoader label="Loading blog posts..." />
          </div>
        </div>
      </section>
    </main>
  );
}