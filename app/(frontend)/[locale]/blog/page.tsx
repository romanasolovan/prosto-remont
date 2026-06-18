import styles from "./blog.module.css";

const featuredPost = {
  category: "Poradnik remontowy",
  title: "Jak przygotować mieszkanie do remontu bez stresu?",
  excerpt:
    "Praktyczne wskazówki, które pomogą zaplanować remont, uniknąć chaosu i przejść przez cały proces z większym spokojem.",
  date: "12 czerwca 2026",
  readTime: "5 min czytania",
};

const posts = [
  {
    category: "Planowanie",
    title: "Od czego zacząć remont mieszkania?",
    excerpt:
      "Krótki przewodnik po pierwszych decyzjach, które warto podjąć przed rozpoczęciem prac.",
    date: "08 czerwca 2026",
  },
  {
    category: "Materiały",
    title: "Jak wybrać materiały wykończeniowe?",
    excerpt:
      "Na co zwrócić uwagę, aby wnętrze było trwałe, estetyczne i dopasowane do budżetu.",
    date: "02 czerwca 2026",
  },
  {
    category: "Realizacja",
    title: "Jak wygląda profesjonalny harmonogram prac?",
    excerpt:
      "Dlaczego dobry plan remontu wpływa na terminowość, koszty i komfort klienta.",
    date: "28 maja 2026",
  },
];

export default function BlogPage() {
  return (
    <main className={styles.blogPage}>
      <section className={styles.hero} aria-labelledby="blog-title">
        <div className="container">
          <div className={styles.inner}>
            <div className={styles.heroTop}>
              <span className={styles.label}>Blog</span>
            </div>

            <div className={styles.heroGrid}>
              <div className={styles.heroContent}>
                <h1 className={styles.title} id="blog-title">
                  Wiedza, która pomaga remontować spokojniej.
                </h1>

                <p className={styles.description}>
                  Porady, inspiracje i praktyczne wskazówki dotyczące remontów,
                  wykończeń oraz planowania prac krok po kroku.
                </p>
              </div>

              <article className={styles.featuredCard}>
                <span className={styles.featuredNumber}>01</span>

                <div className={styles.featuredMeta}>
                  <span>{featuredPost.category}</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>

                <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>

                <div className={styles.featuredFooter}>
                  <time>{featuredPost.date}</time>
                  <span aria-hidden="true">→</span>
                </div>
              </article>
            </div>

            <div className={styles.postsGrid} aria-label="Najnowsze wpisy">
              {posts.map((post, index) => (
                <article className={styles.postCard} key={post.title}>
                  <span className={styles.postNumber}>
                    {String(index + 2).padStart(2, "0")}
                  </span>

                  <div className={styles.postLine} />

                  <span className={styles.postCategory}>{post.category}</span>

                  <h2 className={styles.postTitle}>{post.title}</h2>

                  <p className={styles.postExcerpt}>{post.excerpt}</p>

                  <footer className={styles.postFooter}>
                    <time>{post.date}</time>
                    <span aria-hidden="true">Czytaj więcej</span>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
