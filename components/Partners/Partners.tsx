"use client";


import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
} from "react";
import { useLocale } from "next-intl";

import PartnerCard from "./PartnerCard";
import PartnerDetails from "./PartnerDetails";

import type {
  Partner,
  PopupPosition,
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
};


const POPUP_SIDE_GAP = 10;
const POPUP_ARROW_EDGE_GAP = 24;


export default function Partners({
  partners,
  title,
  ariaLabel,
  getOpenDetailsLabel,
  closeDetailsLabel,
  visitWebsiteLabel,
  readMoreLabel,
  showLessLabel,
}: PartnersProps) {

//   const isSupportedLocale = (
//   locale: string,
// ): locale is SupportedLocale => {
//   return ["pl", "en", "uk", "ru"].includes(locale);
//   };
  
  const currentLocale = useLocale();

const locale: SupportedLocale = [
  "pl",
  "en",
  "uk",
  "ru",
].includes(currentLocale)
  ? (currentLocale as SupportedLocale)
  : "pl";

  const [isDetailsExpanded, setIsDetailsExpanded] =
  useState(false);

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
      setIsDetailsExpanded(false);
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
      setIsDetailsExpanded(false);
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
        onFocusCapture={handleFocus}
        onBlurCapture={handleBlur}
      >
        {selectedPartner ? (
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
showLessLabel={showLessLabel}
  isExpanded={isDetailsExpanded}
  onToggleExpanded={() => {
    setIsDetailsExpanded((current) => !current);
  }}
  onClose={() => closeDetails()}
/>
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
            </ul>

            {shouldAnimate ? (
              <ul
                className={styles.partnerList}
                aria-hidden="true"
              >
                {partners.map((partner) => (
                  <PartnerCard
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