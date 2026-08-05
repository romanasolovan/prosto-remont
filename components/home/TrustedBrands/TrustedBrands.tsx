"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
} from "react";

import DataLoader from "@/components/ui/DataLoader/DataLoader";
import { clientFetchJson } from "@/lib/clientFetchJson";

import styles from "./TrustedBrands.module.css";

type SupportedLocale = "pl" | "en" | "uk" | "ru";

type BrandDescriptions = Record<SupportedLocale, string>;

type BrandProjectPreview = {
  src: string;
  alt: string;
};

type BrandFeaturedProject = {
  id: string;
  title: string;
  slug: string;
  previewImage: BrandProjectPreview | null;
};

type Brand = {
  id: string;
  name: string;
  mark: string;
  logoSrc?: string;
  logoAlt?: string;
  href?: string;
  description: BrandDescriptions;
  website?: string;
  featuredProject: BrandFeaturedProject | null;
};

type TrustedBrandsResponse = {
  success: boolean;
  brands: Brand[];
};

type PopupPosition = {
  left: number;
  arrowLeft: number;
};

type BrandDetailsStyle = CSSProperties & {
  "--details-left": string;
  "--details-arrow-left": string;
};

type BrandItemProps = {
  brand: Brand;
  isSelected: boolean;
  isDuplicate?: boolean;
  getOpenDetailsLabel: (name: string) => string;
  onSelect: (
    brand: Brand,
    trigger: HTMLButtonElement,
  ) => void;
  setTriggerRef: (
    brandId: string,
    element: HTMLButtonElement | null,
  ) => void;
};

const POPUP_SIDE_GAP = 12;
const POPUP_ARROW_EDGE_GAP = 26;

const isSupportedLocale = (
  locale: string,
): locale is SupportedLocale => {
  return ["pl", "en", "uk", "ru"].includes(locale);
};

function BrandVisual({ brand }: { brand: Brand }) {
  return (
    <>
      <span className={styles.brandBadge}>
        {brand.logoSrc ? (
          <Image
            src={brand.logoSrc}
            alt={brand.logoAlt || `${brand.name} logo`}
            fill
            sizes="(max-width: 767px) 44px, 48px"
            className={styles.brandLogo}
          />
        ) : (
          <span className={styles.brandMark} aria-hidden="true">
            {brand.mark}
          </span>
        )}
      </span>

      <span className={styles.brandName}>{brand.name}</span>
    </>
  );
}

function BrandItem({
  brand,
  isSelected,
  isDuplicate = false,
  getOpenDetailsLabel,
  onSelect,
  setTriggerRef,
}: BrandItemProps) {
  if (isDuplicate) {
    return (
      <li className={styles.trustedItem}>
        <button
          type="button"
          className={styles.brandButton}
          onClick={(event) => {
            onSelect(brand, event.currentTarget);
          }}
          tabIndex={-1}
          aria-hidden="true"
        >
          <BrandVisual brand={brand} />
        </button>
      </li>
    );
  }

  return (
    <li className={styles.trustedItem}>
      <button
        ref={(element) => {
          setTriggerRef(brand.id, element);
        }}
        type="button"
        className={`${styles.brandButton} ${
          isSelected ? styles.isSelected : ""
        }`}
        onClick={(event) => {
          onSelect(brand, event.currentTarget);
        }}
        aria-expanded={isSelected}
        aria-controls={`trusted-brand-details-${brand.id}`}
        aria-label={getOpenDetailsLabel(brand.name)}
      >
        <BrandVisual brand={brand} />
      </button>
    </li>
  );
}

export default function TrustedBrands() {
  const t = useTranslations("about.trustedBrands");
  const tCommon = useTranslations("common");

  const currentLocale = useLocale();

  const locale: SupportedLocale = isSupportedLocale(currentLocale)
    ? currentLocale
    : "pl";

  const [trustedBrands, setTrustedBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] =
    useState<Brand | null>(null);
  const [popupPosition, setPopupPosition] =
    useState<PopupPosition | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInteractionPaused, setIsInteractionPaused] =
    useState(false);

  const trustedContentRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);

  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(
    new Map(),
  );

  const setTriggerRef = useCallback(
    (brandId: string, element: HTMLButtonElement | null) => {
      if (element) {
        triggerRefs.current.set(brandId, element);
        return;
      }

      triggerRefs.current.delete(brandId);
    },
    [],
  );

  const updatePopupPosition = useCallback(() => {
    const content = trustedContentRef.current;
    const details = detailsRef.current;
    const trigger = activeTriggerRef.current;

    if (!content || !details || !trigger) {
      return;
    }

    const contentRect = content.getBoundingClientRect();
    const detailsRect = details.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();

    const triggerCenter =
      triggerRect.left +
      triggerRect.width / 2 -
      contentRect.left;

    const maximumLeft = Math.max(
      POPUP_SIDE_GAP,
      contentRect.width -
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

  const closeDetails = useCallback((restoreFocus = true) => {
    setSelectedBrand((currentBrand) => {
      if (restoreFocus && currentBrand) {
        window.requestAnimationFrame(() => {
          triggerRefs.current.get(currentBrand.id)?.focus();
        });
      }

      return null;
    });

    activeTriggerRef.current = null;
    setPopupPosition(null);
  }, []);

  const handleBrandSelect = useCallback(
    (brand: Brand, trigger: HTMLButtonElement) => {
      if (selectedBrand?.id === brand.id) {
        closeDetails();
        return;
      }

      activeTriggerRef.current = trigger;
      setPopupPosition(null);
      setSelectedBrand(brand);
    },
    [closeDetails, selectedBrand],
  );

  useEffect(() => {
    let isMounted = true;

    const fetchTrustedBrands = async () => {
      setIsLoading(true);

      try {
        const data =
          await clientFetchJson<TrustedBrandsResponse>(
            "/api/public/trusted-brands",
            {
              success: false,
              brands: [],
            },
          );

        if (!isMounted) return;

        setTrustedBrands(
          Array.isArray(data.brands) ? data.brands : [],
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchTrustedBrands();

    return () => {
      isMounted = false;
    };
  }, []);

  useLayoutEffect(() => {
    if (!selectedBrand) {
      return;
    }

    const animationFrameId =
      window.requestAnimationFrame(() => {
        updatePopupPosition();
      });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [selectedBrand, updatePopupPosition]);

  useEffect(() => {
    if (!selectedBrand) {
      return;
    }

    const handleResize = () => {
      updatePopupPosition();
    };

    window.addEventListener("resize", handleResize);

    const content = trustedContentRef.current;
    const details = detailsRef.current;

    if (!content || !details) {
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    const resizeObserver = new ResizeObserver(() => {
      updatePopupPosition();
    });

    resizeObserver.observe(content);
    resizeObserver.observe(details);

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, [selectedBrand, updatePopupPosition]);

  useEffect(() => {
    if (!selectedBrand) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDetails();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) return;

      const clickedInsideDetails =
        detailsRef.current?.contains(target) ?? false;

      const clickedPrimaryTrigger = Array.from(
        triggerRefs.current.values(),
      ).some((trigger) => trigger.contains(target));

      const clickedActiveTrigger =
        activeTriggerRef.current?.contains(target) ?? false;

      if (
        !clickedInsideDetails &&
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
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );
    };
  }, [closeDetails, selectedBrand]);

  const handlePointerEnter = () => {
    setIsInteractionPaused(true);
  };

  const handlePointerLeave = () => {
    setIsInteractionPaused(false);
  };

  const handleFocus = () => {
    setIsInteractionPaused(true);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextFocusedElement = event.relatedTarget;

    if (
      !(nextFocusedElement instanceof Node) ||
      !event.currentTarget.contains(nextFocusedElement)
    ) {
      setIsInteractionPaused(false);
    }
  };

  const getBrandDescription = (brand: Brand) => {
    return (
      brand.description[locale] ||
      brand.description.pl ||
      brand.description.en ||
      brand.description.uk ||
      brand.description.ru ||
      ""
    );
  };

  const shouldPauseCarousel =
    Boolean(selectedBrand) || isInteractionPaused;

  const detailsStyle: BrandDetailsStyle | undefined =
    popupPosition
      ? {
          "--details-left": `${popupPosition.left}px`,
          "--details-arrow-left": `${popupPosition.arrowLeft}px`,
        }
      : undefined;

  return (
    <section
      className={styles.trustedSection}
      aria-labelledby="trusted-by-title"
    >
      <div className="container">
        <div className={styles.trustedInner}>
          <div className={styles.trustedHeader}>
            <span className={styles.sectionLabel}>
              {t("eyebrow")}
            </span>

            <h2
              className={styles.trustedTitle}
              id="trusted-by-title"
            >
              {t("title")}
            </h2>

            <p className={styles.trustedDescription}>
              {t("description")}
            </p>
          </div>

          {isLoading ? (
            <DataLoader
              label={tCommon("loading.trustedBrands")}
            />
          ) : trustedBrands.length > 0 ? (
            <div
              ref={trustedContentRef}
              className={styles.trustedContent}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
              onFocusCapture={handleFocus}
              onBlurCapture={handleBlur}
            >
              {selectedBrand ? (
                <div
                  ref={detailsRef}
                  id={`trusted-brand-details-${selectedBrand.id}`}
                  className={`${styles.brandDetails} ${
                    popupPosition ? styles.isPositioned : ""
                  }`}
                  style={detailsStyle}
                  role="region"
                  aria-label={selectedBrand.name}
                  aria-live="polite"
                >
                  <div className={styles.detailsHeader}>
                    <div className={styles.detailsIdentity}>
                      <div className={styles.detailsLogo}>
                        {selectedBrand.logoSrc ? (
                          <Image
                            src={selectedBrand.logoSrc}
                            alt={
                              selectedBrand.logoAlt ||
                              `${selectedBrand.name} logo`
                            }
                            fill
                            sizes="48px"
                            className={
                              styles.detailsLogoImage
                            }
                          />
                        ) : (
                          <span
                            className={styles.detailsMark}
                            aria-hidden="true"
                          >
                            {selectedBrand.mark}
                          </span>
                        )}
                      </div>

                      <div
                        className={
                          styles.detailsTitleGroup
                        }
                      >
                        <span
                          className={styles.detailsEyebrow}
                        >
                          {t("details.brandLabel")}
                        </span>

                        <h3 className={styles.detailsName}>
                          {selectedBrand.name}
                        </h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={styles.detailsClose}
                      onClick={() => closeDetails()}
                      aria-label={t("details.close")}
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

                  <div className={styles.detailsBody}>
                    <div
                      className={styles.detailsInformation}
                    >
                      <p
                        className={
                          styles.detailsDescription
                        }
                      >
                        {getBrandDescription(
                          selectedBrand,
                        ) || t("details.noDescription")}
                      </p>

                      {selectedBrand.website ? (
                        <a
                          href={selectedBrand.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.websiteLink}
                        >
                          <span>
                            {t("details.visitWebsite")}
                          </span>

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
                    </div>

                    {selectedBrand.featuredProject ? (
                      <div
                        className={styles.projectPreview}
                      >
                        {selectedBrand.featuredProject
                          .previewImage ? (
                          <div
                            className={styles.projectMedia}
                          >
                            <Image
                              src={
                                selectedBrand
                                  .featuredProject
                                  .previewImage.src
                              }
                              alt={
                                selectedBrand
                                  .featuredProject
                                  .previewImage.alt
                              }
                              fill
                              sizes="82px"
                              className={styles.projectImage}
                            />
                          </div>
                        ) : null}

                        <div
                          className={styles.projectContent}
                        >
                          <span
                            className={styles.projectLabel}
                          >
                            {t(
                              "details.relatedProject",
                            )}
                          </span>

                          <span
                            className={styles.projectTitle}
                          >
                            {
                              selectedBrand.featuredProject
                                .title
                            }
                          </span>

                          <Link
                            href={`/${locale}/projects/${selectedBrand.featuredProject.slug}`}
                            className={styles.projectButton}
                            aria-label={t(
                              "details.openProject",
                              {
                                title:
                                  selectedBrand
                                    .featuredProject.title,
                              },
                            )}
                          >
                            <span>
                              {t("details.viewProject")}
                            </span>

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
                          </Link>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}

              <div
                className={styles.trustedCarousel}
                role="region"
                aria-label={t("regionLabel")}
              >
                <div
                  className={`${styles.trustedTrack} ${
                    shouldPauseCarousel
                      ? styles.isPaused
                      : ""
                  }`}
                >
                  <ul className={styles.trustedList}>
                    {trustedBrands.map((brand) => (
                      <BrandItem
                        key={brand.id}
                        brand={brand}
                        isSelected={
                          selectedBrand?.id === brand.id
                        }
                        getOpenDetailsLabel={(name) =>
                          t("details.open", { name })
                        }
                        onSelect={handleBrandSelect}
                        setTriggerRef={setTriggerRef}
                      />
                    ))}
                  </ul>

                  <ul
                    className={styles.trustedList}
                    aria-hidden="true"
                  >
                    {trustedBrands.map((brand) => (
                      <BrandItem
                        key={`${brand.id}-duplicate`}
                        brand={brand}
                        isSelected={false}
                        isDuplicate
                        getOpenDetailsLabel={(name) =>
                          t("details.open", { name })
                        }
                        onSelect={handleBrandSelect}
                        setTriggerRef={setTriggerRef}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}