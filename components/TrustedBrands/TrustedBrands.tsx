"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import DataLoader from "@/components/ui/DataLoader/DataLoader";
import { clientFetchJson } from "@/lib/clientFetchJson";

import BrandItem from "./BrandItem";
import BrandDetails from "./BrandDetails";
import { useBrandDetails } from "./hooks/useBrandDetails";
import Carousel from "@/components/Carousel/Carousel";
import BrandDialog from "./BrandDialog";

import type {
  Brand,
  BrandDetailsStyle,
  SupportedLocale,
  TrustedBrandsResponse,
} from "./types";

import styles from "./TrustedBrands.module.css";


const isSupportedLocale = (
  locale: string,
): locale is SupportedLocale => {
  return ["pl", "en", "uk", "ru"].includes(locale);
};


export default function TrustedBrands() {
  const t = useTranslations("about.trustedBrands");
  const tCommon = useTranslations("common");

  const currentLocale = useLocale();

  const locale: SupportedLocale = isSupportedLocale(currentLocale)
    ? currentLocale
    : "pl";

  const [trustedBrands, setTrustedBrands] = useState<Brand[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const trustedContentRef = useRef<HTMLDivElement>(null);
  const {
  selectedBrand,
  isDetailsExpanded,
  popupPosition,
  detailsRef,
  setTriggerRef,
  handleBrandSelect,
  closeDetails,
  openExpandedDetails,
  showCompactDetails,
} = useBrandDetails({
  contentRef: trustedContentRef,
});
 
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
      
            >
             {selectedBrand ? (
  isDetailsExpanded ? (
    <BrandDialog
      brand={selectedBrand}
      locale={locale}
      description={getBrandDescription(
        selectedBrand,
      )}
      brandLabel={t("details.brandLabel")}
      closeLabel={t("details.close")}
      noDescriptionLabel={t(
        "details.noDescription",
      )}
      visitWebsiteLabel={t(
        "details.visitWebsite",
      )}
      relatedProjectLabel={t(
        "details.relatedProject",
      )}
      viewProjectLabel={t(
        "details.viewProject",
      )}
      showLessLabel={t("details.showLess")}
      getOpenProjectLabel={(title) =>
        t("details.openProject", {
          title,
        })
      }
      onShowLess={showCompactDetails}
      onClose={() => closeDetails()}
    />
  ) : (
    <BrandDetails
      brand={selectedBrand}
      locale={locale}
      description={getBrandDescription(
        selectedBrand,
      )}
      detailsStyle={detailsStyle}
      detailsRef={detailsRef}
      brandLabel={t("details.brandLabel")}
      closeLabel={t("details.close")}
      noDescriptionLabel={t(
        "details.noDescription",
      )}
      visitWebsiteLabel={t(
        "details.visitWebsite",
      )}
      relatedProjectLabel={t(
        "details.relatedProject",
      )}
      viewProjectLabel={t(
        "details.viewProject",
      )}
      readMoreLabel={t("details.readMore")}
      getOpenProjectLabel={(title) =>
        t("details.openProject", {
          title,
        })
      }
      onReadMore={openExpandedDetails}
      onClose={() => closeDetails()}
    />
  )
) : null}

              <Carousel
  ariaLabel={t("regionLabel")}
  previousLabel={t("carousel.previous")}
  nextLabel={t("carousel.next")}
  className={styles.trustedCarousel}
  viewportClassName={styles.trustedViewport}
  trackClassName={styles.trustedList}
  autoplay
  motionMode="continuous"
  continuousSpeed={40}
  startDelay={300}
resumeDelay={800}
  isPaused={Boolean(selectedBrand)}
>
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
</Carousel>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}