"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";
import styles from "./Header.module.css";
import MobileMenu from "../MobileMenu/MobileMenu";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import QuoteRequestModal from "@/components/QuoteRequestModal/QuoteRequestModal";
import Image from "next/image";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);
  const t = useTranslations("navigation");
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/projects", label: t("projects") },
    { href: "/process", label: t("process") },
    { href: "/contact", label: t("contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;

    const node = headerRef.current;

    const updateHeaderHeight = () => {
      setHeaderHeight(node.offsetHeight);
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
    });

    resizeObserver.observe(node);
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (mobileMenuOpen) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.touchAction = "";
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.touchAction = "";
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const openQuoteModal = () => {
    setMobileMenuOpen(false);
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${isCompact ? styles.headerCompact : ""} ${
          mobileMenuOpen ? styles.headerMenuOpen : ""
        }`}
      >
        <div className={styles.headerDecor} aria-hidden="true">
          <span className={styles.headerLineLeft} />
          <span className={styles.headerLineRight} />
          <span className={styles.headerBaseLine} />
        </div>

        <div className="container">
          <div className={styles.headerShell}>
            <div className={styles.headerGlow} aria-hidden="true" />

            <div className={styles.headerContent}>
              <Link
                href="/"
                className={styles.logo}
                onClick={closeMobileMenu}
                aria-label="Prosto Remont home"
              >
                <Image
                  src="/LOGO_FULL.svg"
                  alt="Prosto Remont logo"
                  width={180}
                  height={60}
                  priority
                  style={{ width: "100%", height: "auto" }}
                />
              </Link>

              <nav
                className={styles.desktopNav}
                aria-label="Primary navigation"
              >
                <ul className={styles.navList}>
                  {navLinks.map((link) => {
                    const isActive = isActiveLink(link.href);

                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`${styles.navLink} ${
                            isActive ? styles.navLinkActive : ""
                          }`}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className={styles.headerActions}>
                <button
                  type="button"
                  onClick={openQuoteModal}
                  className={styles.quoteButton}
                  aria-haspopup="dialog"
                  aria-expanded={isQuoteModalOpen}
                >
                  <span className={styles.quoteButtonAura} aria-hidden="true" />
                  <span
                    className={styles.quoteButtonShine}
                    aria-hidden="true"
                  />

                  <span className={styles.quoteButtonIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>

                  <span className={styles.quoteButtonText}>
                    {t("requestQuote")}
                  </span>
                </button>

                <LanguageSwitcher />

                <button
                  className={`${styles.mobileMenuButton} ${
                    mobileMenuOpen ? styles.mobileMenuButtonOpen : ""
                  }`}
                  onClick={toggleMobileMenu}
                  aria-label={
                    mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
                  }
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-navigation"
                  type="button"
                >
                  <span className={styles.hamburger}></span>
                  <span className={styles.hamburger}></span>
                  <span className={styles.hamburger}></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className={styles.headerSpacer}
        style={{ height: `${headerHeight}px` }}
        aria-hidden="true"
      />

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        navLinks={navLinks}
        topOffset={headerHeight}
        onQuoteClick={openQuoteModal}
      />

      {isQuoteModalOpen && <QuoteRequestModal onClose={closeQuoteModal} />}
    </>
  );
}
