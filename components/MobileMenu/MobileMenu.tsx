"use client";

import { CSSProperties, useEffect, useRef } from "react";
import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import styles from "./MobileMenu.module.css";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuGeometry {
  top: number;
  left: number;
  width: number;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  geometry: MobileMenuGeometry;
  onQuoteClick?: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  geometry,
  onQuoteClick,
}: MobileMenuProps) {
  const touchStart = useRef<number | null>(null);
  const pathname = usePathname();

  const tNav = useTranslations("navigation");
  const tMenu = useTranslations("mobileMenu");

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;

    const delta = e.touches[0].clientX - touchStart.current;

    if (delta > 80) {
      onClose();
      touchStart.current = null;
    }
  };

  const handleQuoteAction = () => {
    onClose();
    onQuoteClick?.();
  };

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const sharedStyle = {
    ["--mobile-menu-top" as string]: `${geometry.top}px`,
    ["--mobile-menu-left" as string]: `${geometry.left}px`,
    ["--mobile-menu-width" as string]: `${geometry.width}px`,
  } as CSSProperties;

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
        onClick={onClose}
        style={sharedStyle}
        aria-hidden="true"
      />

      <nav
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={sharedStyle}
        aria-label={tMenu("eyebrow")}
        aria-hidden={!isOpen}
      >
        <div className={styles.menuShell}>
          <div className={styles.menuScrollArea}>
            <div className={styles.menuTop}>
              <p className={styles.menuEyebrow}>{tMenu("eyebrow")}</p>

              <button
                type="button"
                onClick={onClose}
                className={styles.closeButton}
                aria-label={tMenu("close")}
              >
                <span></span>
                <span></span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleQuoteAction}
              className={styles.quoteCard}
            >
              <span className={styles.quoteCardIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect
                    x="4.75"
                    y="4.75"
                    width="11.25"
                    height="14.5"
                    rx="1.1"
                    stroke="currentColor"
                    strokeWidth="1.45"
                  />
                  <path
                    d="M7.4 8.1H13.35"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7.4 11.35H12.55"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7.4 14.6H11.85"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11.55 16.95L17.9 10.6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16.95 9.65L18.9 11.6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10.95 17.55L11.55 16.95L12.55 17.95L11.95 18.55L10.55 18.95L10.95 17.55Z"
                    fill="currentColor"
                  />
                </svg>
              </span>

              <span className={styles.quoteCardContent}>
                <span className={styles.quoteCardTitle}>
                  {tNav("requestQuote")}
                </span>
                <span className={styles.quoteCardText}>
                  {tMenu("quoteText")}
                </span>
              </span>

              <span className={styles.quoteCardArrow} aria-hidden="true">
                ↗
              </span>
            </button>

            <ul className={styles.navList}>
              {navLinks.map((link, index) => {
                const isActive = isActiveLink(link.href);

                return (
                  <li
                    key={link.href}
                    className={styles.navItem}
                    style={{ animationDelay: `${index * 45}ms` }}
                  >
                    <Link
                      href={link.href}
                      className={`${styles.navLink} ${
                        isActive ? styles.navLinkActive : ""
                      }`}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className={styles.navLinkLabel}>{link.label}</span>
                      <span className={styles.navLinkArrow} aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className={styles.menuFooterNote}>
              <span className={styles.menuFooterLine} aria-hidden="true" />
              <p>{tMenu("footerNote")}</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
