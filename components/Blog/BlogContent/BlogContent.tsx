"use client";

import { useState } from "react";
import Image from "next/image";

import { Link } from "@/navigation";
import type { PublicBlogPostSummary } from "@/types/blog";

import styles from "./BlogContent.module.css";

type BlogContentProps = {
  posts: PublicBlogPostSummary[];
  translations: {
    searchLabel: string;
    searchPlaceholder: string;
    clearSearch: string;
    noResults: string;
    openPost: string;
  };
};

export default function BlogContent({
  posts,
  translations,
}: BlogContentProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery
    .trim()
    .toLocaleLowerCase("pl");

  const filteredPosts = posts.filter((post) =>
    post.title
      .toLocaleLowerCase("pl")
      .includes(normalizedQuery),
  );

  return (
    <div className={styles.blogLayout}>
      <aside className={styles.searchSidebar}>
        <label
          className={styles.searchLabel}
          htmlFor="blog-search"
        >
          {translations.searchLabel}
        </label>

        <div className={styles.searchField}>
          <input
            id="blog-search"
            type="search"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            placeholder={translations.searchPlaceholder}
            className={styles.searchInput}
          />

          {searchQuery ? (
            <button
              type="button"
              className={styles.searchAction}
              onClick={() => setSearchQuery("")}
              aria-label={translations.clearSearch}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          ) : (
            <span
              className={styles.searchIcon}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <circle
                  cx="10.8"
                  cy="10.8"
                  r="6.3"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="m16 16 4.2 4.2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          )}
        </div>
      </aside>

      <div className={styles.postsArea}>
        {filteredPosts.length > 0 ? (
          <div className={styles.postsGrid}>
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className={styles.postCard}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className={styles.postLink}
                  aria-label={translations.openPost.replace(
                    "{title}",
                    post.title,
                  )}
                >
                  <h2 className={styles.postTitle}>
                    {post.title}
                  </h2>

                  <div className={styles.imageWrapper}>
                    <Image
                      src={post.coverImage.url}
                      alt={post.coverImage.alt}
                      fill
                      sizes="
                        (max-width: 767px) 100vw,
                        (max-width: 1023px) 35vw,
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
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.emptyState} role="status">
            {translations.noResults}
          </p>
        )}
      </div>
    </div>
  );
}
