"use client";

import { useEffect, useState } from "react";
import styles from "./InstagramFeed.module.css";
import type { PublicInstagramPost } from "@/types/instagram";
import Image from "next/image";

export default function InstagramFeed() {
  const [posts, setPosts] = useState<PublicInstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/public/instagram-feed");

        if (!response.ok) {
          throw new Error("Failed to fetch Instagram feed");
        }

        const data = await response.json();

        setPosts(data.posts || []);
      } catch (error) {
        console.error("Failed to load Instagram feed:", error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (!isLoading && posts.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="instagram-title">
      <div className={styles.header}>
        <div className={styles.headerText}>
          <span className={styles.eyebrow}>@pro100_twoj_remont</span>
          <h2 id="instagram-title" className={styles.title}>
            Recent on Instagram
          </h2>
        </div>

        <a
          href="https://www.instagram.com/pro100_twoj_remont/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.profileLink}
        >
          View profile
        </a>
      </div>

      <ul className={styles.grid}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <li key={index} className={styles.tile}>
                <div className={styles.skeleton} aria-hidden="true" />
              </li>
            ))
          : posts.map((post) => (
              <li key={post.id} className={styles.tile}>
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.tileLink}
                  aria-label="View post on Instagram"
                >
                  {post.mediaType === "VIDEO" ? (
                    <video
                      className={styles.tileMedia}
                      src={post.mediaUrl}
                      poster={post.thumbnailUrl}
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <Image
                      className={styles.tileMedia}
                      src={post.thumbnailUrl}
                      alt=""
                      loading="lazy"
                    />
                  )}

                  <span className={styles.tileScrim} aria-hidden="true" />

                  <span className={styles.tileIcon} aria-hidden="true">
                    {post.mediaType === "VIDEO" ? (
                      <svg
                        viewBox="0 0 48 48"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      >
                        <circle cx="24" cy="24" r="17" />
                        <path
                          d="M20 17l11 7-11 7V17z"
                          fill="currentColor"
                          stroke="none"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      >
                        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle
                          cx="17"
                          cy="7"
                          r="0.6"
                          fill="currentColor"
                          stroke="none"
                        />
                      </svg>
                    )}
                  </span>
                </a>
              </li>
            ))}
      </ul>
    </section>
  );
}
