import Image from "next/image";

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
          onSelect(
            brand,
            event.currentTarget,
          );
        }}
        aria-expanded={isSelected}
        aria-controls={`trusted-brand-details-${brand.id}`}
        aria-label={getOpenDetailsLabel(
          brand.name,
        )}
      >
        <BrandVisual brand={brand} />
      </button>
    </li>
  );
}