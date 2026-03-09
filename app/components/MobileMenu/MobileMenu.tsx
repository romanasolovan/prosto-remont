"use client";

import { useRef } from "react";
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
  topOffset: number;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  topOffset,
}: MobileMenuProps) {
  const touchStart = useRef<number | null>(null);

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

  return (
    <nav
      className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ top: `${topOffset}px` }}
    >
      <ul className={styles.navList}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={styles.navLink} onClick={onClose}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
