import Image from "next/image";
import {
  useCarouselItemContext,
} from "../Carousel/CarouselItemContext";
import type { BrandItemProps } from "./types";
import styles from "./TrustedBrands.module.css";

function BrandVisual({
  brand,
}: {
  brand: BrandItemProps["brand"];
}) {
  return (
    <>
      <span className={styles.brandBadge}>
        {brand.logoSrc ? (
          <Image
            src={brand.logoSrc}
            alt={
              brand.logoAlt ||
              `${brand.name} logo`
            }
            fill
            sizes="(max-width: 767px) 44px, 48px"
            className={styles.brandLogo}
          />
        ) : (
          <span
            className={styles.brandMark}
            aria-hidden="true"
          >
            {brand.mark}
          </span>
        )}
      </span>

      <span className={styles.brandName}>
        {brand.name}
      </span>
    </>
  );
}

export default function BrandItem({
  brand,
  isSelected,
  getOpenDetailsLabel,
  onSelect,
  setTriggerRef,
}: BrandItemProps) {
  const { isContinuation } =
    useCarouselItemContext();

  return (
    <li className={styles.trustedItem}>
      <button
        ref={(element) => {
          if (!isContinuation) {
            setTriggerRef(
              brand.id,
              element,
            );
          }
        }}
        type="button"
        className={`${styles.brandButton} ${
          isSelected ? styles.isSelected : ""
        }`}
        tabIndex={
          isContinuation ? -1 : undefined
        }
        onPointerDown={(event) => {
          if (isContinuation) {
            /*
             * Keep pointer-clicking the visual
             * continuation from moving browser
             * focus into an aria-hidden track.
             */
            event.preventDefault();
          }
        }}
        onClick={(event) => {
          onSelect(
            brand,
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
            : `trusted-brand-details-${brand.id}`
        }
        aria-label={
          isContinuation
            ? undefined
            : getOpenDetailsLabel(
                brand.name,
              )
        }
      >
        <BrandVisual brand={brand} />
      </button>
    </li>
  );
}