"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
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

type PopupPosition = {
  left: number;
  arrowLeft: number;
};

type PartnerDetailsStyle = CSSProperties & {
  "--partner-details-left": string;
  "--partner-details-arrow-left": string;
};

type PartnerItemProps = {
  partner: Partner;
  isSelected: boolean;
  isDuplicate?: boolean;
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

const POPUP_SIDE_GAP = 10;
const POPUP_ARROW_EDGE_GAP = 24;

function PartnerVisual({ partner }: { partner: Partner }) {
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
    </>
  );
}

function PartnerItem({
  partner,
  isSelected,
  isDuplicate = false,
  getOpenDetailsLabel,
  onSelect,
  setTriggerRef,
}: PartnerItemProps) {
  if (isDuplicate) {
    return (
      <li className={styles.partnerItem}>
        <button
          type="button"
          className={styles.partnerCard}
          onClick={(event) => {
            onSelect(partner, event.currentTarget);
          }}
          tabIndex={-1}
          aria-hidden="true"
        >
          <PartnerVisual partner={partner} />
        </button>
      </li>
    );
  }

  return (
    <li className={styles.partnerItem}>
      <button
        ref={(element) => {
          setTriggerRef(partner.id, element);
        }}
        type="button"
        className={`${styles.partnerCard} ${
          isSelected ? styles.isSelected : ""
        }`}
        onClick={(event) => {
          onSelect(partner, event.currentTarget);
        }}
        aria-expanded={isSelected}
        aria-controls={`partner-details-${partner.id}`}
        aria-label={getOpenDetailsLabel(partner.name)}
      >
        <PartnerVisual partner={partner} />
      </button>
    </li>
  );
}

export default function Partners({
  partners,
  title,
  ariaLabel,
  getOpenDetailsLabel,
  closeDetailsLabel,
  visitWebsiteLabel,
}: PartnersProps) {
  const [selectedPartner, setSelectedPartner] =
    useState<Partner | null>(null);

  const [popupPosition, setPopupPosition] =
    useState<PopupPosition | null>(null);

  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const carouselShellRef = useRef<HTMLDivElement>(null);
  const carouselViewportRef = useRef<HTMLDivElement>(null);
  const primaryListRef = useRef<HTMLUListElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const activeTriggerRef =
    useRef<HTMLButtonElement | null>(null);

  const triggerRefs = useRef<
    Map<string, HTMLButtonElement>
  >(new Map());

  const setTriggerRef = useCallback(
    (
      partnerId: string,
      element: HTMLButtonElement | null,
    ) => {
      if (element) {
        triggerRefs.current.set(partnerId, element);
        return;
      }

      triggerRefs.current.delete(partnerId);
    },
    [],
  );

  const updateAnimationState = useCallback(() => {
    const viewport = carouselViewportRef.current;
    const primaryList = primaryListRef.current;

    if (!viewport || !primaryList) {
      return;
    }

    setShouldAnimate(
      primaryList.scrollWidth > viewport.clientWidth + 1,
    );
  }, []);

  const updatePopupPosition = useCallback(() => {
    const shell = carouselShellRef.current;
    const details = detailsRef.current;
    const trigger = activeTriggerRef.current;

    if (!shell || !details || !trigger) {
      return;
    }

    const shellRect = shell.getBoundingClientRect();
    const detailsRect = details.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();

    const triggerCenter =
      triggerRect.left +
      triggerRect.width / 2 -
      shellRect.left;

    const maximumLeft = Math.max(
      POPUP_SIDE_GAP,
      shellRect.width -
        detailsRect.width -
        POPUP_SIDE_GAP,
    );

    const preferredLeft =
      triggerCenter - detailsRect.width / 2;

    const left = Math.min(
      Math.max(preferredLeft, POPUP_SIDE_GAP),
      maximumLeft,
    );

    const arrowLeft = Math.min(
      Math.max(
        triggerCenter - left,
        POPUP_ARROW_EDGE_GAP,
      ),
      detailsRect.width - POPUP_ARROW_EDGE_GAP,
    );

    setPopupPosition({
      left,
      arrowLeft,
    });
  }, []);

  const closeDetails = useCallback(
    (restoreFocus = true) => {
      setSelectedPartner((currentPartner) => {
        if (restoreFocus && currentPartner) {
          window.requestAnimationFrame(() => {
            triggerRefs.current
              .get(currentPartner.id)
              ?.focus();
          });
        }

        return null;
      });

      activeTriggerRef.current = null;
      setPopupPosition(null);
    },
    [],
  );

  const handlePartnerSelect = useCallback(
    (
      partner: Partner,
      trigger: HTMLButtonElement,
    ) => {
      if (selectedPartner?.id === partner.id) {
        closeDetails();
        return;
      }

      activeTriggerRef.current = trigger;
      setPopupPosition(null);
      setSelectedPartner(partner);
    },
    [closeDetails, selectedPartner],
  );

  useEffect(() => {
    updateAnimationState();

    const viewport = carouselViewportRef.current;
    const primaryList = primaryListRef.current;

    if (!viewport || !primaryList) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      updateAnimationState();
    });

    resizeObserver.observe(viewport);
    resizeObserver.observe(primaryList);

    return () => {
      resizeObserver.disconnect();
    };
  }, [partners, updateAnimationState]);

  useLayoutEffect(() => {
    if (!selectedPartner) {
      return;
    }

    const animationFrameId =
      window.requestAnimationFrame(() => {
        updatePopupPosition();
      });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [selectedPartner, updatePopupPosition]);

  useEffect(() => {
    if (!selectedPartner) {
      return;
    }

    const handleResize = () => {
      updatePopupPosition();
    };

    window.addEventListener("resize", handleResize);

    const shell = carouselShellRef.current;
    const details = detailsRef.current;

    if (!shell || !details) {
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    const resizeObserver = new ResizeObserver(() => {
      updatePopupPosition();
    });

    resizeObserver.observe(shell);
    resizeObserver.observe(details);

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, [selectedPartner, updatePopupPosition]);

  useEffect(() => {
    if (!selectedPartner) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDetails();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      const clickedDetails =
        detailsRef.current?.contains(target) ?? false;

      const clickedPrimaryTrigger = Array.from(
        triggerRefs.current.values(),
      ).some((trigger) => trigger.contains(target));

      const clickedActiveTrigger =
        activeTriggerRef.current?.contains(target) ??
        false;

      if (
        !clickedDetails &&
        !clickedPrimaryTrigger &&
        !clickedActiveTrigger
      ) {
        closeDetails(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );
    };
  }, [closeDetails, selectedPartner]);

  const handleFocus = () => {
    setIsFocusPaused(true);
  };

  const handleBlur = (
    event: FocusEvent<HTMLDivElement>,
  ) => {
    const nextFocusedElement = event.relatedTarget;

    if (
      !(nextFocusedElement instanceof Node) ||
      !event.currentTarget.contains(nextFocusedElement)
    ) {
      setIsFocusPaused(false);
    }
  };

  if (!partners.length) {
    return null;
  }

  const isPaused =
    Boolean(selectedPartner) || isFocusPaused;

  const detailsStyle: PartnerDetailsStyle | undefined =
    popupPosition
      ? {
          "--partner-details-left": `${popupPosition.left}px`,
          "--partner-details-arrow-left": `${popupPosition.arrowLeft}px`,
        }
      : undefined;

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
        onFocusCapture={handleFocus}
        onBlurCapture={handleBlur}
      >
        {selectedPartner ? (
          <div
            ref={detailsRef}
            id={`partner-details-${selectedPartner.id}`}
            className={`${styles.partnerDetails} ${
              popupPosition ? styles.isPositioned : ""
            }`}
            style={detailsStyle}
            role="region"
            aria-label={selectedPartner.name}
            aria-live="polite"
          >
            <div
              className={styles.detailsHighlight}
              aria-hidden="true"
            />

            <div className={styles.detailsContent}>
              <div className={styles.detailsIdentity}>
                <span className={styles.detailsLogoFrame}>
                  {selectedPartner.logoUrl ? (
                    <Image
                      src={selectedPartner.logoUrl}
                      alt={`${selectedPartner.name} logo`}
                      width={52}
                      height={52}
                      className={styles.detailsLogo}
                    />
                  ) : (
                    <span
                      className={styles.detailsMark}
                      aria-hidden="true"
                    >
                      {selectedPartner.name.charAt(0)}
                    </span>
                  )}
                </span>

                <div className={styles.detailsText}>
                  <h3 className={styles.detailsName}>
                    {selectedPartner.name}
                  </h3>

                  {selectedPartner.description ? (
                    <p
                      className={
                        styles.detailsDescription
                      }
                    >
                      {selectedPartner.description}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className={styles.detailsActions}>
                {selectedPartner.href ? (
                  <a
                    href={selectedPartner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.websiteLink}
                  >
                    <span>{visitWebsiteLabel}</span>

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M8 16L16 8M10 8H16V14"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                ) : null}

                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={() => closeDetails()}
                  aria-label={closeDetailsLabel}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
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
        ) : null}

        <div
          ref={carouselViewportRef}
          className={styles.carousel}
        >
          <div
            className={`${styles.carouselTrack} ${
              shouldAnimate
                ? styles.isAnimated
                : styles.isCentered
            } ${isPaused ? styles.isPaused : ""}`}
          >
            <ul
              ref={primaryListRef}
              className={styles.partnerList}
            >
              {partners.map((partner) => (
                <PartnerItem
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
            </ul>

            {shouldAnimate ? (
              <ul
                className={styles.partnerList}
                aria-hidden="true"
              >
                {partners.map((partner) => (
                  <PartnerItem
                    key={`${partner.id}-duplicate`}
                    partner={partner}
                    isSelected={false}
                    isDuplicate
                    getOpenDetailsLabel={
                      getOpenDetailsLabel
                    }
                    onSelect={handlePartnerSelect}
                    setTriggerRef={setTriggerRef}
                  />
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}