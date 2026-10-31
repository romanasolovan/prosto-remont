import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import ProjectGallery from "@/components/Projects/ProjectGallery/ProjectGallery";
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

  const fallbackImages =
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

      <section
        className={styles.gallerySection}
        aria-label={project.title}
      >
        <div className="container">
          <div className={styles.galleryDivider} />

          <ProjectGallery
            sections={project.gallerySections ?? []}
            fallbackImages={fallbackImages}
            projectTitle={project.title}
            labels={{
              close: t("gallery.close"),
              previous: t("gallery.previous"),
              next: t("gallery.next"),
              openImage: t("gallery.openImage"),
              openVideo: t("gallery.openVideo"),
              viewOriginal: t("gallery.viewOriginal"),
              video: t("gallery.video"),
            }}
          />
        </div>
      </section>
    </main>
  );
}
