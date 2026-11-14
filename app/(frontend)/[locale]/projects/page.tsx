import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProjectsListing from "@/components/Projects/ProjectsListing/ProjectsListing";

import styles from "./projects.module.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "metadata.projects",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "projects",
  });

  const tCommon = await getTranslations({
    locale,
    namespace: "common",
  });

  return (
    <main className={styles.projectsPage}>
      <section className={styles.projectsSection}>
        <div className="container">
          <div className={styles.projectsIntro}>
            <span className={styles.projectsEyebrow}>
              {t("section.eyebrow")}
            </span>

            <h2 className={styles.projectsTitle}>
              {t("section.title")}
            </h2>

            <p className={styles.projectsLead}>
              {t("section.description")}
            </p>
          </div>

            <ProjectsListing
  locale={locale}
  allLabel={t("categories.all")}
  emptyLabel={t("categories.empty")}
  loadingLabel={tCommon("loading.projects")}
  errorLabel={t("categories.loadError")}
/>
        </div>
      </section>
    </main>
  );
}
