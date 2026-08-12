"use client";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocale } from "next-intl";
import PartnerCard from "./PartnerCard";
import PartnerDetails from "./PartnerDetails";
import PartnerDialog from "./PartnerDialog";
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
  previousLabel: string;
  nextLabel: string;
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

  const [isDetailsExpanded, setIsDetailsExpanded] =
  useState(false);

  const [selectedPartner, setSelectedPartner] =
    useState<Partner | null>(null);

  const [popupPosition, setPopupPosition] =
    useState<PopupPosition | null>(null);
  
  const [canScrollPrevious, setCanScrollPrevious] =
  useState(false);

const [canScrollNext, setCanScrollNext] =
  useState(false);

const [hasCarouselOverflow, setHasCarouselOverflow] =
  useState(false);

  const carouselShellRef = useRef<HTMLDivElement>(null);
const carouselViewportRef = useRef<HTMLDivElement>(null);
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

  const updateCarouselState = useCallback(() => {
  const viewport = carouselViewportRef.current;

  if (!viewport) {
    return;
  }

  const maximumScrollLeft =
    viewport.scrollWidth - viewport.clientWidth;

  const hasOverflow = maximumScrollLeft > 1;

  setHasCarouselOverflow(hasOverflow);
  setCanScrollPrevious(
    hasOverflow && viewport.scrollLeft > 1,
  );
  setCanScrollNext(
    hasOverflow &&
      viewport.scrollLeft < maximumScrollLeft - 1,
  );
  }, []);

  const scrollToPartner = useCallback(
  (direction: "previous" | "next") => {
    const viewport = carouselViewportRef.current;

    if (!viewport) {
      return;
    }

    const items = Array.from(
      viewport.querySelectorAll<HTMLElement>(
        `.${styles.partnerItem}`,
      ),
    );

    if (!items.length) {
      return;
    }

    const firstItem = items[0];

    if (!firstItem) {
      return;
    }

    const currentScrollLeft = viewport.scrollLeft;

    const targets = items.map(
      (item) => item.offsetLeft - firstItem.offsetLeft,
    );

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    targets.forEach((target, index) => {
      const distance = Math.abs(
        target - currentScrollLeft,
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    const targetIndex =
      direction === "next"
        ? Math.min(nearestIndex + 1, items.length - 1)
        : Math.max(nearestIndex - 1, 0);

    const targetLeft = targets[targetIndex];

    if (targetLeft === undefined) {
      return;
    }

    viewport.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  },
  [],
  );
  
  useEffect(() => {
  const viewport = carouselViewportRef.current;

  if (!viewport) {
    return;
  }

  const handleScroll = () => {
    updateCarouselState();
  };

  updateCarouselState();

  viewport.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  const resizeObserver = new ResizeObserver(() => {
    updateCarouselState();
  });

  resizeObserver.observe(viewport);

  const list = viewport.querySelector(
    `.${styles.partnerList}`,
  );

  if (list) {
    resizeObserver.observe(list);
  }

  return () => {
    viewport.removeEventListener(
      "scroll",
      handleScroll,
    );

    resizeObserver.disconnect();
  };
}, [partners, updateCarouselState]);

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

  useLayoutEffect(() => {
  if (!selectedPartner || isDetailsExpanded) {
    return;
  }

  const animationFrameId =
    window.requestAnimationFrame(() => {
      updatePopupPosition();
    });

  return () => {
    window.cancelAnimationFrame(animationFrameId);
  };
}, [
  selectedPartner,
  isDetailsExpanded,
  updatePopupPosition,
]);

  useEffect(() => {
  if (!selectedPartner || isDetailsExpanded) {
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
  }, [selectedPartner, isDetailsExpanded, updatePopupPosition]);

  useEffect(() => {
  if (!selectedPartner || isDetailsExpanded) {
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
  }, [closeDetails,
  selectedPartner,
  isDetailsExpanded,]);

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
      onShowLess={() => {
        setIsDetailsExpanded(false);
      }}
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
      onReadMore={() => {
        setIsDetailsExpanded(true);
      }}
      onClose={() => closeDetails()}
    />
  )
        ) : null}
        
        {hasCarouselOverflow ? (
  <>
    <button
      type="button"
      className={`${styles.carouselControl} ${styles.carouselControlPrevious}`}
      onClick={() => {
        scrollToPartner("previous");
      }}
      disabled={!canScrollPrevious}
      aria-label={previousLabel}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M15 6L9 12L15 18"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>

    <button
      type="button"
      className={`${styles.carouselControl} ${styles.carouselControlNext}`}
      onClick={() => {
        scrollToPartner("next");
      }}
      disabled={!canScrollNext}
      aria-label={nextLabel}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9 6L15 12L9 18"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </>
) : null}

        <div
  ref={carouselViewportRef}
  className={styles.carousel}
  role="region"
  aria-label={ariaLabel}
>
  <ul className={styles.partnerList}>
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
</div>
      </div>
    </section>
  );
}