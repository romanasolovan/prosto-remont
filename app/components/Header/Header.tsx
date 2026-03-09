"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./Header.module.css";
import MobileMenu from "../MobileMenu/MobileMenu";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Image from "next/image";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const headerRef = useRef<HTMLElement | null>(null);
  const t = useTranslations("navigation");

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/projects", label: t("projects") },
    { href: "/process", label: t("process") },
    { href: "/contact", label: t("contact") },
  ];

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    const handleScroll = () => {
      setIsCompact(window.scrollY > 24);
    };

    updateHeaderHeight();
    handleScroll();

    window.addEventListener("resize", updateHeaderHeight);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${isCompact ? styles.headerCompact : ""}`}
      >
        <div className="container">
          <div className={styles.headerContent}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/LOGO_FULL.svg"
                alt="Prosto Remont logo"
                width={180}
                height={60}
                priority
                style={{ width: "100%", height: "auto" }}
              />
            </Link>

            <nav className={styles.desktopNav}>
              <ul className={styles.navList}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.navLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.headerActions}>
              <LanguageSwitcher />

              <button
                className={`${styles.mobileMenuButton} ${
                  mobileMenuOpen ? styles.mobileMenuButtonOpen : ""
                }`}
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                <span className={styles.hamburger}></span>
                <span className={styles.hamburger}></span>
                <span className={styles.hamburger}></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        topOffset={headerHeight}
      />
    </>
  );
}
