import type { CSSProperties } from "react";

export type SupportedLocale = "pl" | "en" | "uk" | "ru";

export type BrandDescriptions = Record<
  SupportedLocale,
  string
>;

export type BrandProjectPreview = {
  src: string;
  alt: string;
};

export type BrandFeaturedProject = {
  id: string;
  title: string;
  slug: string;
  previewImage: BrandProjectPreview | null;
};

export type Brand = {
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

export type TrustedBrandsResponse = {
  success: boolean;
  brands: Brand[];
};

export type PopupPosition = {
  left: number;
  arrowLeft: number;
};

export type BrandDetailsStyle = CSSProperties & {
  "--details-left": string;
  "--details-arrow-left": string;
};

export type BrandItemProps = {
  brand: Brand;
  isSelected: boolean;
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