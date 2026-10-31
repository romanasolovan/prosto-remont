
"use client";

import { useState } from "react";
import Image from "next/image";

import type {
  PublicProjectGallerySection,
  PublicProjectMediaItem,
} from "@/types/projects";

import GalleryLightbox from "./GalleryLightbox";
import styles from "./ProjectGallery.module.css";

export type GalleryLabels = {
  close: string;
  previous: string;
  next: string;
  openImage: string;
  openVideo: string;
  viewOriginal: string;
  video: string;
};

type ProjectGalleryProps = {
  sections: PublicProjectGallerySection[];
  fallbackImages: string[];
  projectTitle: string;
  labels: GalleryLabels;
};

type GalleryGroup = {
  id: string;
  title: string;
  description: string | null;
  items: PublicProjectMediaItem[];
};

function getFallbackItems(
  images: string[],
): PublicProjectMediaItem[] {
  return images.map((url, index) => {
    const isVideo = /\.(mp4|webm)(?:[?#]|$)/i.test(url);

    return {
      id: `legacy-${index}`,
      type: isVideo ? "video" : "image",
      url,
      posterUrl: null,
      caption: null,
      sourceUrl: null,
    };
  });
}

export default function ProjectGallery({
  sections,
  fallbackImages,
  projectTitle,
  labels,
}: ProjectGalleryProps) {
  const [activeGroup, setActiveGroup] = useState<GalleryGroup | null>(
    null,
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const populatedSections = sections.filter(
    (section) => section.mediaItems.length > 0,
  );

  const groups: GalleryGroup[] =
    populatedSections.length > 0
      ? populatedSections.map((section) => ({
          id: section.id,
          title: section.title,
          description: section.description,
          items: section.mediaItems,
        }))
      : [
          {
            id: "legacy-gallery",
            title: projectTitle,
            description: null,
            items: getFallbackItems(fallbackImages),
          },
        ];

  const visibleGroups = groups.filter(
    (group) => group.items.length > 0,
  );

  if (visibleGroups.length === 0) {
    return null;
  }

  return (
    <>
      <div className={styles.gallery}>
        {visibleGroups.map((group) => (
          <section
            key={group.id}
            className={styles.section}
            aria-labelledby={
              group.id === "legacy-gallery"
                ? undefined
                : `gallery-${group.id}`
            }
            aria-label={
              group.id === "legacy-gallery"
                ? projectTitle
                : undefined
            }
          >
            {group.id !== "legacy-gallery" && (
              <div className={styles.sectionIntro}>
                <h2
                  id={`gallery-${group.id}`}
                  className={styles.sectionTitle}
                >
                  {group.title}
                </h2>

                {group.description && (
                  <p className={styles.sectionDescription}>
                    {group.description}
                  </p>
                )}
              </div>
            )}

            <div className={styles.grid}>
              {group.items.map((item, index) => {
                const isVideo = item.type === "video";
                const thumbnail = isVideo
                  ? item.posterUrl
                  : item.url;

                const mediaLabel =
                  item.caption ||
                  `${group.title} — ${index + 1}`;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={styles.tile}
                    aria-label={`${isVideo ? labels.openVideo : labels.openImage}: ${mediaLabel}`}
                    onClick={() => {
                      setActiveIndex(index);
                      setActiveGroup(group);
                    }}
                  >
                    {thumbnail ? (
                      <Image
                        src={thumbnail}
                        alt=""
                        fill
                        sizes="(max-width: 767px) 50vw, (max-width: 1199px) 33vw, 30vw"
                        className={styles.image}
                      />
                    ) : (
                      <span className={styles.videoFallback}>
                        <span aria-hidden="true">▶</span>
                      </span>
                    )}

                    {isVideo && (
                      <>
                        <span
                          className={styles.playIcon}
                          aria-hidden="true"
                        >
                          ▶
                        </span>
                        <span
                          className={styles.videoBadge}
                          aria-hidden="true"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <rect
                              x="3"
                              y="5"
                              width="13"
                              height="14"
                              rx="2"
                            />
                            <path d="m16 10 5-3v10l-5-3" />
                          </svg>
                        </span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {activeGroup && (
        <GalleryLightbox
          key={activeGroup.id}
          items={activeGroup.items}
          groupTitle={activeGroup.title}
          initialIndex={activeIndex}
          labels={labels}
          onClose={() => setActiveGroup(null)}
        />
      )}
    </>
  );
}
