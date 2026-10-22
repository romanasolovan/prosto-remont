
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import BlogContent from "@/components/Blog/BlogContent/BlogContent";
import { getBlogPosts } from "@/lib/getBlogPosts";

import styles from "./blog.module.css";

type BlogPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "blog",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function BlogPage({
  params,
}: BlogPageProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "blog",
  });

  const posts = await getBlogPosts();

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
              id="blog-page-title"
              className={styles.title}
            >
              {t("title")}
            </h1>

            <p className={styles.description}>
              {t("description")}
            </p>
          </header>

          <div
            className={styles.divider}
            aria-hidden="true"
          />

          {posts.length > 0 ? (
            <div className={styles.contentArea}>
  <BlogContent
    posts={posts}
    translations={{
      searchLabel: t("search.label"),
      searchPlaceholder: t("search.placeholder"),
      clearSearch: t("search.clear"),
      noResults: t("search.noResults"),
      openPost: t("aria.openPost", {
        title: "{title}",
      }),
    }}
  />
</div>
          ) : (
            <p
              className={styles.emptyState}
              role="status"
            >
              {t("empty")}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
