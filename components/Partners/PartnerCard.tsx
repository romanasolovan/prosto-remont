import Image from "next/image";
import {
  useCarouselItemContext,
} from "../Carousel/CarouselItemContext"
import type { Partner } from "./types";
import styles from "./Partners.module.css";

type PartnerCardProps = {
  partner: Partner;
  isSelected: boolean;
  getOpenDetailsLabel: (name: string) => string;
  onSelect: (
    partner: Partner,
    trigger: HTMLButtonElement,
  ) => void;
  setTriggerRef: (
    partnerId: string,
    element: HTMLButtonElement | null,
  ) => void;
};

function PartnerVisual({
  partner,
}: {
  partner: Partner;
}) {
  return (
    <>
      <span className={styles.partnerIdentity}>
        <span className={styles.logoFrame}>
          {partner.logoUrl ? (
            <Image
              src={partner.logoUrl}
              alt={`${partner.name} logo`}
              width={44}
              height={44}
              className={styles.partnerLogo}
              loading="lazy"
            />
          ) : (
            <span
              className={styles.partnerMark}
              aria-hidden="true"
            >
              {partner.name.charAt(0)}
            </span>
          )}
        </span>

        <span className={styles.partnerName}>
          {partner.name}
        </span>
      </span>

      <span
        className={styles.detailsIndicator}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9 6L15 12L9 18"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  );
}

export default function PartnerCard({
  partner,
  isSelected,
  getOpenDetailsLabel,
  onSelect,
  setTriggerRef,
}: PartnerCardProps) {
  const { isContinuation } =
    useCarouselItemContext();

  return (
    <li className={styles.partnerItem}>
      <button
        ref={(element) => {
          if (!isContinuation) {
            setTriggerRef(
              partner.id,
              element,
            );
          }
        }}
        type="button"
        className={`${styles.partnerCard} ${
          isSelected ? styles.isSelected : ""
        }`}
        tabIndex={
          isContinuation ? -1 : undefined
        }
        onPointerDown={(event) => {
          if (isContinuation) {
            event.preventDefault();
          }
        }}
        onClick={(event) => {
          onSelect(
            partner,
            event.currentTarget,
          );
        }}
        aria-expanded={
          isContinuation
            ? undefined
            : isSelected
        }
        aria-controls={
          isContinuation
            ? undefined
            : `partner-details-${partner.id}`
        }
        aria-label={
          isContinuation
            ? undefined
            : getOpenDetailsLabel(
                partner.name,
              )
        }
      >
        <PartnerVisual partner={partner} />
      </button>
    </li>
  );
}