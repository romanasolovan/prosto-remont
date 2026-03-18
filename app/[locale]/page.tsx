import { useTranslations } from "next-intl";
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
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  return (
    <div className={styles.home}>
      <HomeHero />
      <TrustedBrands />
      <WhyChooseUs />
      <ClientOpinionsPreview />
      <QuoteHighlight />
      <ServicesPreview />
      <ProjectsPreview />
      <ProcessPreview />

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaLine} aria-hidden="true" />
            <h2 className={styles.ctaTitle}>{t("contact.title")}</h2>
            <p className={styles.ctaDescription}>{t("contact.description")}</p>
            <Link
              href="/contact"
              className={`btn btn-primary ${styles.ctaButton}`}
            >
              {tCommon("contactUs")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
