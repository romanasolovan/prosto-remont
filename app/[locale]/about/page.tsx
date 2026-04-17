import styles from "./about.module.css";

import StorySection from "@/components/AboutPage/StorySection";
import ValuesSection from "@/components/AboutPage/ValuesSection";
import ClientOpinionsCTA from "@/components/AboutPage/ClientOpinionsCTA";
import TrustedBrands from "@/components/home/TrustedBrands/TrustedBrands";

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      <div className={styles.pageDecor} aria-hidden="true" />

      {/* <StatsHero /> */}
      <StorySection />
      <ValuesSection />

      <div className={styles.trustedWrapper}>
        <TrustedBrands />
      </div>

      <ClientOpinionsCTA />
    </main>
  );
}
