import { getTranslations } from "next-intl/server";

import StorySection from "@/components/AboutPage/StorySection";
import ValuesSection from "@/components/AboutPage/ValuesSection";
import AboutDetailsSection from "@/components/AboutPage/AboutDetailsSection";
import TrustedBrands from "@/components/TrustedBrands/TrustedBrands";

import styles from "./about.module.css";

const detailParagraphKeys = ["first", "second", "third", "fourth"] as const;

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <main className={styles.aboutPage}>
      <StorySection />
      <ValuesSection />
      <AboutDetailsSection
        paragraphs={detailParagraphKeys.map((key) =>
          t(`details.paragraphs.${key}`),
        )}
        closing={t("details.closing")}
      />
      <TrustedBrands />
    </main>
  );
}