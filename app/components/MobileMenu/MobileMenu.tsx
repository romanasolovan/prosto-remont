"use client";

import { Link } from "@/navigation";
import styles from "./MobileMenu.module.css";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
}: MobileMenuProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      {/* Menu */}
      <nav className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
        <ul className={styles.navList}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={styles.navLink}
                onClick={onClose}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
