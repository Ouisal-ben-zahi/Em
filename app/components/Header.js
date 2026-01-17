"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

const logoImg = "/logos/logoEMIMMO.png";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
      <div className={`${styles.container} ${styles.nav}`}>
        <div className={styles.brand}>
          <Link href="/" onClick={closeMenu}>
            <Image src={logoImg} alt="MOROCCO IMMOBILIER" width={180} height={60} className={styles.logoImg} />
          </Link>
        </div>
        <nav className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ""}`}>
          <Link href="/" className={pathname === "/" ? styles.active : ""} onClick={closeMenu}>Accueil</Link>
          <Link href="/projets" className={pathname === "/projets" ? styles.active : ""} onClick={closeMenu}>Nos projets</Link>
          <Link href="/services" className={pathname === "/services" ? styles.active : ""} onClick={closeMenu}>Services</Link>
          <Link href="/contact" className={pathname === "/contact" ? styles.active : ""} onClick={closeMenu}>Contact</Link>
        </nav>
        <div className={styles.navCta}>
          <button 
            className={`${styles.btnMenu} ${isMenuOpen ? styles.btnMenuOpen : ""}`} 
            aria-label="Menu"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

