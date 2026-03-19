"use client";

import { useEffect, useRef } from "react";
import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import styles from "./MobileMenu.module.css";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  topOffset: number;
  onQuoteClick?: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  topOffset,
  onQuoteClick,
}: MobileMenuProps) {
  const touchStart = useRef<number | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
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

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <nav
        ref={panelRef}
        className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{ top: `${topOffset - 2}px` }}
        aria-label={tMenu("eyebrow")}
      >
        <div className={styles.menuShell}>
          <div className={styles.menuGlow} aria-hidden="true" />

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
            <span className={styles.quoteCardAura} aria-hidden="true" />
            <span className={styles.quoteCardShine} aria-hidden="true" />

            <span className={styles.quoteCardIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <span className={styles.quoteCardContent}>
              <span className={styles.quoteCardTitle}>
                {tNav("requestQuote")}
              </span>
              <span className={styles.quoteCardText}>{tMenu("quoteText")}</span>
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
      </nav>
    </>
  );
}
