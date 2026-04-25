import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import styles from "./projectDetails.module.css";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

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

export default async function ProjectDetailsPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  const tCategories = await getTranslations({
    locale,
    namespace: "projects.categories",
  });

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.projectDetailsPage}>
      <section className={styles.projectHero}>
        <div className="container">
          <Link href={`/${locale}/projects`} className={styles.backButton}>
            {t("navigation.backToProjects")}
          </Link>

          <div className={styles.heroInner}>
            <span className={styles.categoryBadge}>
              {tCategories(project.category)}
            </span>

            <h1 className={styles.projectTitle}>{project.title}</h1>

            <p className={styles.projectDescription}>{project.description}</p>
          </div>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className="container">
          <div className={styles.galleryGrid}>
            {project.galleryImages.length > 0 ? (
              project.galleryImages.map((image, index) => (
                <div key={`${image}-${index}`} className={styles.galleryCard}>
                  <img
                    src={image}
                    alt={`${project.title} image ${index + 1}`}
                    className={styles.galleryImage}
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

      {project.subprojects && project.subprojects.length > 0 ? (
        <section className={styles.subprojectsSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <span className={styles.sectionEyebrow}>
                {t("projectDetails.eyebrow")}
              </span>
              <h2 className={styles.sectionTitle}>
                {t("projectDetails.subprojectsTitle")}
              </h2>
              <p className={styles.sectionText}>
                {t("projectDetails.subprojectsDescription")}
              </p>
            </div>

            <div className={styles.subprojectsGrid}>
              {project.subprojects.map((item) => (
                <article key={item.slug} className={styles.subprojectCard}>
                  <div className={styles.subprojectMedia}>
                    {item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className={styles.subprojectImage}
                      />
                    ) : (
                      <div className={styles.subprojectPlaceholder} />
                    )}
                  </div>

                  <div className={styles.subprojectContent}>
                    <h3 className={styles.subprojectTitle}>{item.title}</h3>
                    <p className={styles.subprojectDescription}>
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
