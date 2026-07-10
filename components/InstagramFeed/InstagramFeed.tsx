import styles from "./InstagramFeed.module.css";

const INSTAGRAM_POSTS = [
  {
    id: "1",
    image: "/instagram/post-1.jpg",
    permalink: "https://www.instagram.com/pro100_twoj_remont/",
  },
  {
    id: "2",
    image: "/instagram/post-2.jpg",
    permalink: "https://www.instagram.com/pro100_twoj_remont/",
  },
  {
    id: "3",
    image: "/instagram/post-3.jpg",
    permalink: "https://www.instagram.com/pro100_twoj_remont/",
  },
  {
    id: "4",
    image: "/instagram/post-4.jpg",
    permalink: "https://www.instagram.com/pro100_twoj_remont/",
  },
  {
    id: "5",
    image: "/instagram/post-5.jpg",
    permalink: "https://www.instagram.com/pro100_twoj_remont/",
  },
  {
    id: "6",
    image: "/instagram/post-6.jpg",
    permalink: "https://www.instagram.com/pro100_twoj_remont/",
  },
];

export default function InstagramFeed() {
  if (INSTAGRAM_POSTS.length === 0) {
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
        {INSTAGRAM_POSTS.map((post) => (
          <li key={post.id} className={styles.tile}>
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.tileLink}
              aria-label="View post on Instagram"
            >
              <img
                className={styles.tileImage}
                src={post.image}
                alt=""
                loading="lazy"
              />
              <span className={styles.tileScrim} aria-hidden="true" />
              <span className={styles.tileIcon} aria-hidden="true">
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
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
