"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";
import styles from "./Header.module.css";
import MobileMenu from "../MobileMenu/MobileMenu";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import QuoteRequestModal from "@/components/QuoteRequestModal/QuoteRequestModal";
import Image from "next/image";

interface MobileMenuGeometry {
  top: number;
  left: number;
  width: number;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [menuGeometry, setMenuGeometry] = useState<MobileMenuGeometry>({
    top: 0,
    left: 0,
    width: 0,
  });

  const headerRef = useRef<HTMLElement | null>(null);
  const headerShellRef = useRef<HTMLDivElement | null>(null);

  const t = useTranslations("navigation");
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/projects", label: t("projects") },
    { href: "/reviews", label: t("reviews") },
    { href: "/blog", label: t("blog") },
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

  useLayoutEffect(() => {
    if (!headerRef.current) return;

    const node = headerRef.current;

    const updateHeaderHeight = () => {
      const height = node.offsetHeight;
      setHeaderHeight(height);
      document.documentElement.style.setProperty(
        "--header-height",
        `${height}px`,
      );
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateMenuGeometry = () => {
    if (!headerShellRef.current) return;

    const rect = headerShellRef.current.getBoundingClientRect();

    setMenuGeometry({
      top: Math.max(rect.bottom - 1, 0),
      left: rect.left,
      width: rect.width,
    });
  };

  useLayoutEffect(() => {
    updateMenuGeometry();
  }, [isCompact, mobileMenuOpen]);

  useEffect(() => {
    updateMenuGeometry();

    const handleScroll = () => updateMenuGeometry();
    const handleResize = () => updateMenuGeometry();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    let resizeObserver: ResizeObserver | null = null;

    if (headerShellRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateMenuGeometry();
      });

      resizeObserver.observe(headerShellRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver?.disconnect();
    };
  }, []);

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
        <div className="container">
          <div ref={headerShellRef} className={styles.headerShell}>
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
                  aria-label={t("requestQuote")}
                  aria-haspopup="dialog"
                  aria-expanded={isQuoteModalOpen}
                >
                  <span className={styles.quoteButtonInner}>
                    <span className={styles.quotePlus} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 6.5V17.5M6.5 12H17.5"
                          stroke="currentColor"
                          strokeWidth="1.35"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>

                    <span className={styles.quoteIcon} aria-hidden="true">
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
                  </span>
                </button>

                <div className={styles.languageSwitcherWrap}>
                  <LanguageSwitcher />
                </div>

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
        geometry={menuGeometry}
        onQuoteClick={openQuoteModal}
      />

      {isQuoteModalOpen && <QuoteRequestModal onClose={closeQuoteModal} />}
    </>
  );
}
