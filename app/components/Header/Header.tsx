"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./Header.module.css";
import MobileMenu from "../MobileMenu/MobileMenu";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Image from "next/image";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations("navigation");

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/projects", label: t("projects") },
    { href: "/process", label: t("process") },
    { href: "/contact", label: t("contact") },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/LOGO_FULL.svg"
                alt="Prosto Remont logo"
                width={150}
                height={50}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
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

              {/* Mobile Menu Toggle */}
              <button
                className={styles.mobileMenuButton}
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
      />
    </>
  );
}
