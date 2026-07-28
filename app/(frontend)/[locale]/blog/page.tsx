import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/navigation";
import { temporaryBlogPosts } from "@/data/temporaryBlogPosts";

import styles from "./blog.module.css";

export default async function BlogPage() {
  const t = await getTranslations("blog");

  return (
    <main className={styles.blogPage}>
      <section
        className={styles.blogSection}
        aria-labelledby="blog-page-title"
      >
        <div className="container">
          <header className={styles.header}>
            <span className={styles.eyebrow}>
              {t("eyebrow")}
            </span>

            <h1
              className={styles.title}
              id="blog-page-title"
            >
              {t("title")}
            </h1>

            <p className={styles.description}>
              {t("description")}
            </p>
          </header>

          <div
            className={styles.postsGrid}
            aria-label={t("aria.posts")}
          >
            {temporaryBlogPosts.map((post) => (
              <article
                className={styles.postCard}
                key={post.id}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className={styles.postLink}
                  aria-label={t("aria.openPost", {
                    title: post.title,
                  })}
                >
                  <Image
                    src={post.imageSrc}
                    alt={post.imageAlt}
                    fill
                    sizes="
                      (max-width: 559px) 100vw,
                      (max-width: 1023px) 50vw,
                      (max-width: 1439px) 33vw,
                      25vw
                    "
                    className={styles.postImage}
                  />

                  <span
                    className={styles.postOverlay}
                    aria-hidden="true"
                  />

                  <span
                    className={styles.postArrow}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7 17L17 7M9 7h8v8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}