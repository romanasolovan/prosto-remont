"use client";

import { useEffect, useRef } from "react";
import styles from "@/app/(frontend)/[locale]/about/about.module.css";

type AboutDetailsSectionProps = {
  paragraphs: string[];
  closing: string;
};

export default function AboutDetailsSection({
  paragraphs,
  closing,
}: AboutDetailsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const revealItems = section.querySelectorAll<HTMLElement>(
      "[data-details-reveal]",
    );

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add(styles.isVisible);
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.detailsSection}
      aria-labelledby="about-details-closing"
    >
      <div className="container">
        <div className={styles.detailsInner}>
          <div className={styles.detailsContent}>
            {paragraphs.map((paragraph, index) => (
              <p
                key={`${index}-${paragraph}`}
                className={styles.detailsParagraph}
                data-details-reveal
                style={
                  {
                    "--reveal-delay": `${index * 110}ms`,
                  } as React.CSSProperties
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div
            className={styles.detailsClosing}
            data-details-reveal
            style={
              {
                "--reveal-delay": `${paragraphs.length * 110}ms`,
              } as React.CSSProperties
            }
          >
            <p id="about-details-closing" className={styles.closingEyebrow}>
              {closing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}