"use client";

import styles from "./page.module.css";
// import HomeSidePagination from "@/components/home/HomeSidePagination/HomeSidePagination";

import TrustedBrands from "@/components/home/TrustedBrands/TrustedBrands";
import HomeHero from "@/components/home/HomeHero/HomeHero";
import WhyChooseUs from "@/components/home/WhyChooseUs/WhyChooseUs";
import ClientOpinionsPreview from "@/components/home/ClientOpinionsPreview/ClientOpinionsPreview";
import QuoteHighlight from "@/components/home/QuoteHighlight/QuoteHighlight";
import ServicesPreview from "@/components/home/ServicesPreview/ServicesPreview";
// import ProjectsPreview from "@/components/home/ProjectsPreview/ProjectsPreview";
import QuoteRequestModal from "@/components/QuoteRequestModal/QuoteRequestModal";
import ProcessSection from "@/components/home/ProcessSection/ProcessSection";

import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import HomeMobileSectionNavigator from "@/components/home/HomeMobileSectionNavigator/HomeMobileSectionNavigator";

type SectionItem = {
  id: string;
  label: string;
};

export default function Home() {
  const t = useTranslations("home");

  const [activeSection, setActiveSection] = useState("hero");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const openQuoteModal = () => setIsQuoteModalOpen(true);
  const closeQuoteModal = () => setIsQuoteModalOpen(false);

  const sections: SectionItem[] = useMemo(
    () => [
      { id: "hero", label: t("pagination.hero") },
      { id: "trusted", label: t("pagination.trusted") },
      { id: "why", label: t("pagination.why") },
      { id: "services", label: t("pagination.services") },
      { id: "projects", label: t("pagination.projects") },
      { id: "reviews", label: t("pagination.reviews") },
      { id: "quote", label: t("pagination.quote") },
      { id: "process", label: t("pagination.process") },
      { id: "contact", label: t("pagination.contact") },
    ],
    [t],
  );

  useEffect(() => {
    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0.2, 0.35, 0.5, 0.65],
      },
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => {
      sectionElements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, [sections]);

  return (
    <div className={styles.home}>
      {/* <HomeSidePagination
        sections={sections}
        activeSection={activeSection}
        navLabel={t("pagination.navLabel")}
      /> */}

      <HomeMobileSectionNavigator
        sections={sections}
        activeSection={activeSection}
        triggerLabel={t("pagination.mobileTrigger")}
        title={t("pagination.mobileTitle")}
        closeLabel={t("pagination.mobileClose")}
      />

      <section
        id="hero"
        className={`${styles.pageSection} ${styles.heroSection}`}
      >
        <HomeHero />
      </section>

      <section id="trusted" className={styles.pageSection}>
        <TrustedBrands />
      </section>

      <section id="services" className={styles.pageSection}>
        <ServicesPreview />
      </section>

      <section id="process" className={styles.pageSection}>
        <ProcessSection />
      </section>

      <section id="why" className={styles.pageSection}>
        <WhyChooseUs />
      </section>

      <section id="projects" className={styles.pageSection}>
        {/* <ProjectsPreview /> */}
      </section>

      <section id="reviews" className={styles.pageSection}>
        <ClientOpinionsPreview />
      </section>

      <section id="quote" className={styles.pageSection}>
        <QuoteHighlight onOpenQuoteModal={openQuoteModal} />
        {isQuoteModalOpen && <QuoteRequestModal onClose={closeQuoteModal} />}
      </section>
    </div>
  );
}
