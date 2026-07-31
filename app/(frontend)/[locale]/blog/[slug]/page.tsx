import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import { Link } from "@/navigation";
import { getBlogPostBySlug } from "@/lib/getBlogPostBySlug";

import styles from "./blogPost.module.css";

type BlogPostPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog post not found",
    };
  }

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      type: "article",
      publishedTime: post.publishedAt,
      images: [
        {
          url: post.coverImage.url,
          alt: post.coverImage.alt,
          width:
            post.coverImage.width ??
            undefined,
          height:
            post.coverImage.height ??
            undefined,
        },
      ],
    },
  };
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { locale, slug } = await params;

  const t = await getTranslations({
    locale,
    namespace: "blog.post",
  });

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate =
    new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(post.publishedAt));

  return (
    <main className={styles.blogPostPage}>
      <article className={styles.article}>
        <div className="container">
          <div className={styles.articleLayout}>
            <Link
              href="/blog"
              className={styles.backButton}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {t("backToBlog")}
            </Link>

            <div className={styles.cover}>
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt}
                fill
                priority
                sizes="
                  (max-width: 767px) 100vw,
                  (max-width: 1199px) 90vw,
                  1120px
                "
                className={styles.coverImage}
              />
            </div>

            <header className={styles.articleHeader}>
              <span className={styles.eyebrow}>
                {t("eyebrow")}
              </span>

              <h1 className={styles.title}>
                {post.title}
              </h1>

              <div className={styles.meta}>
                <span className={styles.metaItem}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />

                    <path
                      d="M4.5 20c.8-4 3.3-6 7.5-6s6.7 2 7.5 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  <span>
                    {t("author")} {post.author}
                  </span>
                </span>

                <span
                  className={styles.metaDivider}
                  aria-hidden="true"
                />

                <span className={styles.metaItem}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="4"
                      y="5.5"
                      width="16"
                      height="14"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />

                    <path
                      d="M8 3.5v4M16 3.5v4M4 10h16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  <time dateTime={post.publishedAt}>
                    {formattedDate}
                  </time>
                </span>
              </div>
            </header>

            <div className={styles.content}>
              <RichText
                data={
                  post.content as SerializedEditorState
                }
              />
            </div>

            {post.media && (
              <aside
                className={styles.externalMedia}
                aria-label={t("externalMedia")}
              >
                <a
                  href={post.media.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalMediaLink}
                >
                  <span>
                    {post.media.type ===
                    "instagram"
                      ? t("viewOnInstagram")
                      : t("viewOnYouTube")}
                  </span>

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 17L17 7M9 7h8v8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </aside>
            )}

            <footer className={styles.articleFooter}>
              <Link
                href="/blog"
                className={styles.footerBackButton}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M15 6l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {t("backToAllPosts")}
              </Link>
            </footer>
          </div>
        </div>
      </article>
    </main>
  );
}