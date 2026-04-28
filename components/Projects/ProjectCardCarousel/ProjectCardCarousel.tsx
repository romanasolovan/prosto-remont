"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "./ProjectCardCarousel.module.css";

type ProjectCardCarouselProps = {
  images: string[];
  alt: string;
  mobileImagesPerPage?: number;
  desktopImagesPerPage?: number;
  sizes?: string;
};

export default function ProjectCardCarousel({
  images,
  alt,
  mobileImagesPerPage = 1,
  desktopImagesPerPage = 2,
  sizes = "(max-width: 767px) 100vw, 50vw",
}: ProjectCardCarouselProps) {
  const [page, setPage] = useState(0);
  const [imagesPerPage, setImagesPerPage] = useState(mobileImagesPerPage);

  useEffect(() => {
    const handleResize = () => {
      const nextImagesPerPage =
        window.innerWidth >= 768 ? desktopImagesPerPage : mobileImagesPerPage;

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
  }, [mobileImagesPerPage, desktopImagesPerPage]);

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
    }, 4000);

    return () => window.clearInterval(interval);
  }, [pages.length]);

  if (!images.length) {
    return null;
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${safePage * 100}%)` }}
        >
          {pages.map((pageImages, pageIndex) => (
            <div className={styles.slide} key={pageIndex}>
              <div
                className={styles.grid}
                style={
                  {
                    "--images-per-page": pageImages.length,
                  } as React.CSSProperties
                }
              >
                {pageImages.map((src, index) => {
                  const imageNumber = pageIndex * imagesPerPage + index + 1;

                  return (
                    <div className={styles.imageWrap} key={`${src}-${index}`}>
                      <Image
                        src={src}
                        alt={`${alt} ${imageNumber}`}
                        fill
                        className={styles.image}
                        sizes={sizes}
                        priority={pageIndex === 0}
                      />
                    </div>
                  );
                })}
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
