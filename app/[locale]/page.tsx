import styles from "./page.module.css";
import TrustedBrands from "@/components/home/TrustedBrands/TrustedBrands";
import HomeHero from "@/components/home/HomeHero/HomeHero";
import WhyChooseUs from "@/components/home/WhyChooseUs/WhyChooseUs";
import ClientOpinionsPreview from "@/components/home/ClientOpinionsPreview/ClientOpinionsPreview";
import QuoteHighlight from "@/components/home/QuoteHighlight/QuoteHighlight";
import ServicesPreview from "@/components/home/ServicesPreview/ServicesPreview";
import ProjectsPreview from "@/components/home/ProjectsPreview/ProjectsPreview";
import ProcessPreview from "@/components/home/ProcessPreview/ProcessPreview";
import ContactCTA from "@/components/ContactCTA/ContactCTA";

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
      <ContactCTA />
    </div>
  );
}
