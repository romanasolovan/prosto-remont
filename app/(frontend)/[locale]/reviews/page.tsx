// import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
// import type { Metadata } from "next";
import styles from "./reviews.module.css";
import ClientOpinions from "@/components/ClientOpinions/ClientOpinions";
// import VideoReviews from "@/components/VideoReviews/VideoReviews";

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
      <section className={styles.reviewsSection}>
        <div className={styles.reviewsGrid} aria-hidden="true" />

        <div className={styles.watermark} aria-hidden="true">
          <span className={styles.watermarkText}>{t("watermark")}</span>
        </div>

        <div className="container">
          <div className={styles.videoSection}>{/* <VideoReviews /> */}</div>

          <div className={styles.opinionsSection}>
            <div className={styles.reviewsShell}>
              <ClientOpinions />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
