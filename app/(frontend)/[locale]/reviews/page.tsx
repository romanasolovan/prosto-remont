// import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
// import type { Metadata } from "next";
import styles from "./reviews.module.css";
import ClientOpinions from "@/components/ClientOpinions/ClientOpinions";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ locale: string }>;
// }): Promise<Metadata> {
//   const { locale } = await params;
//   const t = await getTranslations({ locale, namespace: "metadata.reviews" });

//   return {
//     title: t("title"),
//     description: t("description"),
//   };
// }

export default function ReviewsPage() {
  const t = useTranslations("clientOpinions");

  return (
    <main className={styles.reviewsPage}>
      {/* <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroBackground} aria-hidden="true">
          <span className={styles.bgWord}>Reviews</span>
        </div>

        <div className="container">
          <div className={styles.heroInner}>
            <span className={styles.heroEyebrow}>Client opinions</span>
            <h1 className={styles.heroTitle}>{t("title")}</h1>
            <p className={styles.heroLead}>
              Confidence is built through the experience clients carry away.
            </p>
          </div>
        </div>
      </section> */}

      <section className={styles.reviewsSection}>
        <div className="container">
          <div className={styles.reviewsShell}>
            <ClientOpinions />
          </div>
        </div>
      </section>
    </main>
  );
}
