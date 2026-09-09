"use client";
import {
  useRef,
} from "react";
import { useLocale } from "next-intl";
import Carousel from "@/components/Carousel/Carousel";
import PartnerCard from "./PartnerCard";
import PartnerDetails from "./PartnerDetails";
import PartnerDialog from "./PartnerDialog";
import { usePartnerDetails } from "./hooks/usePartnerDetails";
import type {
  Partner,
  SupportedLocale,
} from "./types";
export type { Partner } from "./types";
import styles from "./Partners.module.css";

type PartnersProps = {
  partners: Partner[];
  title: string;
  ariaLabel: string;
  getOpenDetailsLabel: (name: string) => string;
  closeDetailsLabel: string;
  visitWebsiteLabel: string;
  readMoreLabel: string;
  showLessLabel: string;
  previousLabel: string;
  nextLabel: string;
};

export default function Partners({
  partners,
  title,
  ariaLabel,
  getOpenDetailsLabel,
  closeDetailsLabel,
  visitWebsiteLabel,
  readMoreLabel,
  showLessLabel,
  previousLabel,
  nextLabel,
}: PartnersProps) {

const currentLocale = useLocale();

const locale: SupportedLocale = [
  "pl",
  "en",
  "uk",
  "ru",
].includes(currentLocale)
  ? (currentLocale as SupportedLocale)
  : "pl";

  const carouselShellRef = useRef<HTMLDivElement>(null);
  const {
  selectedPartner,
  isDetailsExpanded,
  popupPosition,
  detailsRef,
  setTriggerRef,
  handlePartnerSelect,
  closeDetails,
  openExpandedDetails,
  showCompactDetails,
} = usePartnerDetails({
  shellRef: carouselShellRef,
});

  if (!partners.length) {
    return null;
  }
  
  const getPartnerDescription = (
  partner: Partner,
): string => {
  return (
    partner.description[locale] ||
    partner.description.pl ||
    partner.description.en ||
    partner.description.uk ||
    partner.description.ru ||
    ""
  );
};

  return (
    <section
      className={styles.partners}
      aria-label={ariaLabel}
    >
      <div className={styles.partnersHeader}>
        <span
          className={styles.headerLine}
          aria-hidden="true"
        />

        <p className={styles.partnersTitle}>{title}</p>

        <span
          className={styles.headerLine}
          aria-hidden="true"
        />
      </div>

      <div
        ref={carouselShellRef}
        className={styles.carouselShell}
      >
       {selectedPartner ? (
  isDetailsExpanded ? (
    <PartnerDialog
      partner={selectedPartner}
      description={getPartnerDescription(
        selectedPartner,
      )}
      closeDetailsLabel={closeDetailsLabel}
      visitWebsiteLabel={visitWebsiteLabel}
      showLessLabel={showLessLabel}
      onShowLess={showCompactDetails}
      onClose={() => closeDetails()}
    />
  ) : (
    <PartnerDetails
      partner={selectedPartner}
      description={getPartnerDescription(
        selectedPartner,
      )}
      popupPosition={popupPosition}
      detailsRef={detailsRef}
      closeDetailsLabel={closeDetailsLabel}
      visitWebsiteLabel={visitWebsiteLabel}
      readMoreLabel={readMoreLabel}
     onReadMore={openExpandedDetails}
      onClose={() => closeDetails()}
    />
  )
        ) : null}
        <Carousel
  ariaLabel={ariaLabel}
  previousLabel={previousLabel}
  nextLabel={nextLabel}
  viewportClassName={styles.carousel}
  trackClassName={styles.partnerList}
  autoplay
  motionMode="continuous"
  continuousSpeed={40}
  resumeDelay={2400}
  isPaused={Boolean(selectedPartner)}
>
  {partners.map((partner) => (
    <PartnerCard
      key={partner.id}
      partner={partner}
      isSelected={
        selectedPartner?.id === partner.id
      }
      getOpenDetailsLabel={
        getOpenDetailsLabel
      }
      onSelect={handlePartnerSelect}
      setTriggerRef={setTriggerRef}
    />
  ))}
</Carousel>
      </div>
    </section>
  );
}