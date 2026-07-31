import DataLoader from "@/components/ui/DataLoader/DataLoader";

import styles from "./blogPost.module.css";

export default function BlogPostLoading() {
  return (
    <main className={styles.blogPostPage}>
      <section className={styles.article}>
        <div className="container">
          <div className={styles.routeLoader}>
            <DataLoader label="Loading blog post..." />
          </div>
        </div>
      </section>
    </main>
  );
}