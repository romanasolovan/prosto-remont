
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { getProjectBySlug } from "@/lib/getProjectBySlug";

import styles from "./projectDetails.module.css";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailsPage({
  params,
}: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({
    locale,
    namespace: "projects",
  });

  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const primaryCategory = project.categories[0];

  const detailImages =
    project.galleryImages.length > 0
      ? project.galleryImages
      : project.coverImages;

  return (
    <main className={styles.projectDetailsPage}>
      <section className={styles.projectHero}>
        <div className="container">
          <Link
            href={`/${locale}/projects`}
            className={styles.backButton}
          >
            {t("navigation.backToProjects")}
          </Link>

          <div className={styles.heroInner}>
            {primaryCategory && (
              <span className={styles.categoryBadge}>
                {primaryCategory.name}
              </span>
            )}

            <h1 className={styles.projectTitle}>
              {project.title}
            </h1>

            <p className={styles.projectDescription}>
              {project.description}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className="container">
          <div className={styles.galleryGrid}>
            {detailImages.length > 0 ? (
              detailImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className={styles.galleryCard}
                >
                  <Image
                    src={image}
                    alt={`${project.title} image ${index + 1}`}
                    fill
                    className={styles.galleryImage}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))
            ) : (
              <>
                <div className={styles.galleryPlaceholder} />
                <div className={styles.galleryPlaceholder} />
                <div className={styles.galleryPlaceholder} />
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

