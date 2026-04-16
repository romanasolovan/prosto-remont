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
      const nextImagesPerPage = window.innerWidth >= 768 ? 2 : 1;

      setImagesPerPage((prev) => {
        if (prev !== nextImagesPerPage) {
          setPage(0);
        }
        return nextImagesPerPage;
      });
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

  const safePage = page >= pages.length ? 0 : page;

  useEffect(() => {
    if (pages.length <= 1) return;

    const interval = window.setInterval(() => {
      setPage((prevPage) => {
        const currentPage = prevPage >= pages.length ? 0 : prevPage;
        return (currentPage + 1) % pages.length;
      });
    }, 3000);

    return () => window.clearInterval(interval);
  }, [pages.length]);

  return (
    <div className={styles.carousel}>
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${safePage * 100}%)` }}
        >
          {pages.map((pageImages, pageIndex) => (
            <div className={styles.slide} key={pageIndex}>
              <div className={styles.grid}>
                {pageImages.map((src, index) => (
                  <div className={styles.imageWrap} key={`${src}-${index}`}>
                    <Image
                      src={src}
                      alt={`${alt} ${pageIndex * imagesPerPage + index + 1}`}
                      fill
                      className={styles.image}
                      sizes="(max-width: 767px) 100vw, 50vw"
                      priority={pageIndex === 0}
                    />
                  </div>
                ))}
              </div>
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
              className={`${styles.dot} ${
                index === safePage ? styles.active : ""
              }`}
              onClick={() => setPage(index)}
              aria-label={`Go to image group ${index + 1}`}
              aria-pressed={index === safePage}
            />
          ))}
        </div>
      )}
    </div>
  );
}
