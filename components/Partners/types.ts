export type SupportedLocale = "pl" | "en" | "uk" | "ru";

export type PartnerDescriptions = Record<
  SupportedLocale,
  string
>;

export type Partner = {
  id: string;
  name: string;
  description: PartnerDescriptions;
  logoUrl?: string;
  href?: string;
};

export type PopupPosition = {
  left: number;
  arrowLeft: number;
};