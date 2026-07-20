"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
} from "react";

import styles from "./Partners.module.css";

export type Partner = {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  href?: string;
};

type PartnersProps = {
  partners: Partner[];
  title: string;
  ariaLabel: string;
  getOpenDetailsLabel: (name: string) => string;
  closeDetailsLabel: string;
  visitWebsiteLabel: string;
};

const AUTO_SCROLL_STEP = 1;
const AUTO_SCROLL_INTERVAL = 28;

export default function Partners({
  partners,
  title,
  ariaLabel,
  getOpenDetailsLabel,
  closeDetailsLabel,
  visitWebsiteLabel,
}: PartnersProps) {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const closeDetails = useCallback((restoreFocus = true) => {
    setSelectedPartner((currentPartner) => {
      if (restoreFocus && currentPartner) {
        window.requestAnimationFrame(() => {
          triggerRefs.current.get(currentPartner.id)?.focus();
        });
      }

      return null;
    });
  }, []);

  const togglePartner = (partner: Partner) => {
    setSelectedPartner((currentPartner) =>
      currentPartner?.id === partner.id ? null : partner,
    );
  };

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const updateScrollableState = () => {
      setCanScroll(carousel.scrollWidth > carousel.clientWidth + 1);
    };

    updateScrollableState();

    const resizeObserver = new ResizeObserver(updateScrollableState);
    resizeObserver.observe(carousel);

    return () => {
      resizeObserver.disconnect();
    };
  }, [partners]);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (
      !carousel ||
      !canScroll ||
      isPaused ||
      selectedPartner ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

      if (maxScrollLeft <= 0) return;

      if (carousel.scrollLeft >= maxScrollLeft - 1) {
        carousel.scrollTo({
          left: 0,
          behavior: "smooth",
        });

        return;
      }

      carousel.scrollLeft += AUTO_SCROLL_STEP;
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [canScroll, isPaused, selectedPartner]);

  useEffect(() => {
    if (!selectedPartner) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDetails();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      const clickedDetails = detailsRef.current?.contains(target);
      const clickedTrigger = Array.from(triggerRefs.current.values()).some(
        (trigger) => trigger.contains(target),
      );

      if (!clickedDetails && !clickedTrigger) {
        closeDetails(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [closeDetails, selectedPartner]);

  const handlePointerEnter = () => {
    setIsPaused(true);
  };

  const handlePointerLeave = () => {
    setIsPaused(false);
  };

  const handleFocus = () => {
    setIsPaused(true);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsPaused(false);
    }
  };

  if (!partners.length) return null;

  return (
    <section className={styles.partners} aria-label={ariaLabel}>
      <div className={styles.partnersHeader}>
        <span className={styles.headerLine} aria-hidden="true" />

        <p className={styles.partnersTitle}>{title}</p>

        <span className={styles.headerLine} aria-hidden="true" />
      </div>

      {selectedPartner && (
        <div
  ref={detailsRef}
  id={`partner-details-${selectedPartner.id}`}
  className={styles.partnerDetails}
  role="region"
  aria-label={selectedPartner.name}
  aria-live="polite"
>
          <div className={styles.detailsHighlight} aria-hidden="true" />

          <div className={styles.detailsContent}>
            <div className={styles.detailsIdentity}>
              <span className={styles.detailsLogoFrame}>
                {selectedPartner.logoUrl ? (
                  <Image
                    src={selectedPartner.logoUrl}
                    alt={`${selectedPartner.name} logo`}
                    width={60}
                    height={60}
                    className={styles.detailsLogo}
                  />
                ) : (
                  <span className={styles.detailsMark} aria-hidden="true">
                    {selectedPartner.name.charAt(0)}
                  </span>
                )}
              </span>

              <div className={styles.detailsText}>
                <h3 className={styles.detailsName}>
                  {selectedPartner.name}
                </h3>

                {selectedPartner.description && (
                  <p className={styles.detailsDescription}>
                    {selectedPartner.description}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.detailsActions}>
              {selectedPartner.href && (
                <a
                  href={selectedPartner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.websiteLink}
                >
                  <span>{visitWebsiteLabel}</span>

                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M8 16L16 8M10 8H16V14"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              )}

              <button
                type="button"
                className={styles.closeButton}
                onClick={() => closeDetails()}
                aria-label={closeDetailsLabel}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M7 7L17 17M17 7L7 17"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={styles.carouselShell}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocusCapture={handleFocus}
        onBlurCapture={handleBlur}
      >
        <div
          ref={carouselRef}
          className={`${styles.carousel} ${
            canScroll ? styles.isScrollable : styles.isCentered
          }`}
        >
          <ul className={styles.carouselTrack}>
            {partners.map((partner) => {
              const isSelected = selectedPartner?.id === partner.id;
              const detailsId = `partner-details-${partner.id}`;

              return (
                <li key={partner.id} className={styles.partnerItem}>
                  <button
                    ref={(element) => {
                      if (element) {
                        triggerRefs.current.set(partner.id, element);
                      } else {
                        triggerRefs.current.delete(partner.id);
                      }
                    }}
                    type="button"
                    className={`${styles.partnerCard} ${
                      isSelected ? styles.isSelected : ""
                    }`}
                    onClick={() => togglePartner(partner)}
                    aria-expanded={isSelected}
                    aria-controls={detailsId}
                    aria-label={getOpenDetailsLabel(partner.name)}
                  >
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

                      <span className={styles.partnerName}>{partner.name}</span>
                    </span>

                    <span
                      className={styles.detailsIndicator}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="M9 6L15 12L9 18"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}