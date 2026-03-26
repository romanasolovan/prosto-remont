"use client";

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
import QuoteRequestModal from "@/components/QuoteRequestModal/QuoteRequestModal";
import { useState } from "react";

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const openQuoteModal = () => setIsQuoteModalOpen(true);
  const closeQuoteModal = () => setIsQuoteModalOpen(false);

  return (
    <div className={styles.home}>
      <HomeHero />
      <TrustedBrands />
      <WhyChooseUs />
      <ServicesPreview />
      <ProjectsPreview />
      <ClientOpinionsPreview />
      <QuoteHighlight onOpenQuoteModal={openQuoteModal} />
      {isQuoteModalOpen && <QuoteRequestModal onClose={closeQuoteModal} />}
      <ProcessPreview />
      <ContactCTA />
    </div>
  );
}
