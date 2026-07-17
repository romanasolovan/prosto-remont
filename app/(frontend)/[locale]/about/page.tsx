import Image from "next/image";
import { getTranslations } from "next-intl/server";

import StorySection from "@/components/AboutPage/StorySection";
import ValuesSection from "@/components/AboutPage/ValuesSection";
import TrustedBrands from "@/components/home/TrustedBrands/TrustedBrands";

import styles from "./about.module.css";

const detailParagraphKeys = ["first", "second", "third", "fourth"] as const;

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <main className={styles.aboutPage}>
      <StorySection />
      <ValuesSection />

      <section
        className={styles.detailsSection}
        aria-labelledby="about-details-closing"
      >
        <div className="container">
          <div className={styles.detailsGrid}>
            <div className={styles.teamImageFrame}>
              <div className={styles.teamImageWrap}>
                <Image
                  src="/about/aboutTeam.jpg"
                  alt={t("details.imageAlt")}
                  fill
                  className={styles.teamImage}
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 44vw, 520px"
                />
              </div>
            </div>

            <div className={styles.detailsInner}>
              <div className={styles.detailsContent}>
                {detailParagraphKeys.map((key) => (
                  <p key={key} className={styles.detailsParagraph}>
                    {t(`details.paragraphs.${key}`)}
                  </p>
                ))}
              </div>

              <div className={styles.detailsClosing}>
                <p id="about-details-closing" className={styles.closingEyebrow}>
                  {t("details.closing")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustedBrands />
    </main>
  );
}
