"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type {
  PublicProject,
  PublicProjectMediaItem,
} from "@/types/projects";
import GalleryLightbox from "@/components/Projects/ProjectGallery/GalleryLightbox";
import type { GalleryLabels } from "@/components/Projects/ProjectGallery/ProjectGallery";
import styles from "./ProjectVideoShowcase.module.css";

type PreviewVideo = {
  id: string;
  title: string;
  media: PublicProjectMediaItem;
};

type ProjectVideoShowcaseProps = {
  projects: PublicProject[];
};

function getProjectVideos(projects: PublicProject[]): PreviewVideo[] {
  return projects.flatMap((project) => {
    const firstVideo = project.gallerySections
      ?.flatMap((section) => section.mediaItems)
      .find((item) => item.type === "video" && item.url);

    if (!firstVideo) return [];

    return [
      {
        id: `${project.id}-${firstVideo.id}`,
        title: project.title,
        media: firstVideo,
      },
    ];
  });
}

const pad = (value: number) => String(value).padStart(2, "0");

export default function ProjectVideoShowcase({
  projects,
}: ProjectVideoShowcaseProps) {

const t = useTranslations("home.projectsPreview.videos");
const tGallery = useTranslations("projects.gallery");

const galleryLabels: GalleryLabels = {
  close: tGallery("close"),
  previous: tGallery("previous"),
  next: tGallery("next"),
  openImage: tGallery("openImage"),
  openVideo: tGallery("openVideo"),
  viewOriginal: tGallery("viewOriginal"),
  video: tGallery("video"),
};

const [activeVideoIndex, setActiveVideoIndex] = useState(0);
const [openedVideo, setOpenedVideo] = useState<PreviewVideo | null>(
  null,
);

  const projectVideos = getProjectVideos(projects);
  const videoCount = projectVideos.length;

  const safeIndex =
    videoCount > 0 ? activeVideoIndex % videoCount : 0;

  const activeVideo = projectVideos[safeIndex];
  const hasNavigation = videoCount > 1;

  const goToPreviousVideo = () => {
    if (!hasNavigation) return;

    setActiveVideoIndex((current) =>
      (current - 1 + videoCount) % videoCount,
    );
  };

  const goToNextVideo = () => {
    if (!hasNavigation) return;

    setActiveVideoIndex((current) => (current + 1) % videoCount);
  };

  return (
    <>
      <section
        className={styles.videoPanel}
        aria-label={t("ariaLabel")}
      >
        <div className={styles.panelHeader}>
          <span className={styles.panelNumber}>01</span>
          <h3 className={styles.panelTitle}>{t("title")}</h3>

          {hasNavigation && (
            <div className={styles.videoControls}>
              <button
                type="button"
                className={styles.controlButton}
                onClick={goToPreviousVideo}
                aria-label={t("previous")}
              >
                ←
              </button>

              <button
                type="button"
                className={`${styles.controlButton} ${styles.controlButtonPrimary}`}
                onClick={goToNextVideo}
                aria-label={t("next")}
              >
                →
              </button>
            </div>
          )}
        </div>

        {activeVideo ? (
          <>
            <div className={styles.videoStage}>
              {hasNavigation && (
                <button
                  type="button"
                  className={`${styles.videoGhost} ${styles.videoGhostLeft}`}
                  onClick={goToPreviousVideo}
                  aria-label={t("previous")}
                />
              )}

              <button
                key={activeVideo.id}
                type="button"
                className={styles.videoCard}
                onClick={() => setOpenedVideo(activeVideo)}
               aria-label={t("play", { title: activeVideo.title })}
              >
                {activeVideo.media.posterUrl && (
                  <Image
                    src={activeVideo.media.posterUrl}
                    alt=""
                    fill
                    sizes="(max-width: 1023px) 90vw, 45vw"
                    className={styles.videoPoster}
                  />
                )}

                <span
                  className={styles.videoOverlay}
                  aria-hidden="true"
                />

                <span
                  className={styles.playButton}
                  aria-hidden="true"
                >
                  ▶
                </span>

                <span className={styles.videoTitle}>
                  {activeVideo.title}
                </span>

                <span className={styles.videoLabel}>
                  	{t("label")}
                </span>

                <span className={styles.videoCounter}>
                  {pad(safeIndex + 1)} / {pad(videoCount)}
                </span>
              </button>

              {hasNavigation && (
                <button
                  type="button"
                  className={`${styles.videoGhost} ${styles.videoGhostRight}`}
                  onClick={goToNextVideo}
                  	aria-label={t("next")}
                />
              )}
            </div>

            {hasNavigation && (
              <div className={styles.videoDots}>
                {projectVideos.map((video, index) => (
                  <button
                    key={video.id}
                    type="button"
                    className={`${styles.videoDot} ${
                      index === safeIndex
                        ? styles.videoDotActive
                        : ""
                    }`}
                    onClick={() => setActiveVideoIndex(index)}
                    aria-label={t("show", { number: index + 1, title: video.title })}
                    aria-pressed={index === safeIndex}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className={styles.videoEmpty}>
            {t("empty")}
          </div>
        )}
      </section>

      {openedVideo && (
        <GalleryLightbox
          key={openedVideo.id}
          items={[openedVideo.media]}
          groupTitle={openedVideo.title}
          initialIndex={0}
          labels={galleryLabels}
          onClose={() => setOpenedVideo(null)}
        />
      )}
    </>
  );
}
