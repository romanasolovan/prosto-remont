import { createNavigation } from "next-intl/navigation";
// import { routing } from "./routing";
import { locales } from "./i18n/request";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation({ locales });
