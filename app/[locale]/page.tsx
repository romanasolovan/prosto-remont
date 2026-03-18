import { Link } from "@/navigation";
import styles from "./page.module.css";
import TrustedBrands from "@/components/home/TrustedBrands/TrustedBrands";
import HomeHero from "@/components/home/HomeHero/HomeHero";
import WhyChooseUs from "@/components/home/WhyChooseUs/WhyChooseUs";
import ClientOpinionsPreview from "@/components/home/ClientOpinionsPreview/ClientOpinionsPreview";
import QuoteHighlight from "@/components/home/QuoteHighlight/QuoteHighlight";
import ServicesPreview from "@/components/home/ServicesPreview/ServicesPreview";
import ProjectsPreview from "@/components/home/ProjectsPreview/ProjectsPreview";
import ProcessPreview from "@/components/home/ProcessPreview/ProcessPreview";

export default function Home() {
  return (
    <div className={styles.home}>
      <HomeHero />
      <TrustedBrands />
      <WhyChooseUs />
      <ServicesPreview />
      <ProjectsPreview />
      <ClientOpinionsPreview />
      <QuoteHighlight />
      <ProcessPreview />

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaLine} aria-hidden="true" />
            <h2 className={styles.ctaTitle}>
              Ready to shape your next renovation?
            </h2>
            <p className={styles.ctaDescription}>
              Start with a clear conversation, explore the process, and take the
              next step with confidence.
            </p>
            <Link
              href="/process"
              className={`btn btn-primary ${styles.ctaButton}`}
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
