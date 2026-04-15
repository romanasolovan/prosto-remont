"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "./ProjectCardCarousel.module.css";

type ProjectCardCarouselProps = {
  images: string[];
  alt: string;
};

export default function ProjectCardCarousel({
  images,
  alt,
}: ProjectCardCarouselProps) {
  const [page, setPage] = useState(0);
  const [imagesPerPage, setImagesPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setImagesPerPage(2);
      } else {
        setImagesPerPage(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pages = useMemo(() => {
    const result: string[][] = [];

    for (let i = 0; i < images.length; i += imagesPerPage) {
      result.push(images.slice(i, i + imagesPerPage));
    }

    return result;
  }, [images, imagesPerPage]);

  // When breakpoint changes from mobile to tablet, number of pages changes.
  //  useEffect(() => {
  //    setPage(0);
  //  }, [imagesPerPage]);

  useEffect(() => {
    if (pages.length <= 1) return;

    const interval = setInterval(() => {
      setPage((prevPage) => (prevPage + 1) % pages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [pages.length]);

  const currentImages = pages[page] ?? [];

  return (
    <div className={styles.carousel}>
      <div className={styles.viewport}>
        <div className={styles.grid}>
          {currentImages.map((src, index) => (
            <div className={styles.imageWrap} key={`${src}-${index}`}>
              <Image
                src={src}
                alt={`${alt} ${index + 1}`}
                fill
                className={styles.image}
                sizes="(max-width: 899px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>

      {pages.length > 1 && (
        <div className={styles.dots} aria-label="Project images pagination">
          {pages.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.dot} ${index === page ? styles.active : ""}`}
              onClick={() => setPage(index)}
              aria-label={`Go to image group ${index + 1}`}
              aria-pressed={index === page}
            />
          ))}
        </div>
      )}
    </div>
  );
}
