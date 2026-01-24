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
          <Link href="/" onClick={closeMenu} aria-label="Retour à l'accueil - EM IMMO">
            <Image src={logoImg} alt="Logo EM IMMO - Entrepreneurs Morocco Immobilier" width={180} height={60} className={styles.logoImg} priority />
          </Link>
        </div>
        <nav className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ""}`} aria-label="Navigation principale">
          <Link href="/" className={pathname === "/" ? styles.active : ""} onClick={closeMenu} aria-current={pathname === "/" ? "page" : undefined}>Accueil</Link>
          <Link href="/projets" className={pathname === "/projets" ? styles.active : ""} onClick={closeMenu} aria-current={pathname === "/projets" ? "page" : undefined}>Nos projets</Link>
          <Link href="/services" className={pathname === "/services" ? styles.active : ""} onClick={closeMenu} aria-current={pathname === "/services" ? "page" : undefined}>Services</Link>
          <Link href="/contact" className={pathname === "/contact" ? styles.active : ""} onClick={closeMenu} aria-current={pathname === "/contact" ? "page" : undefined}>Contact</Link>
        </nav>
        <div className={styles.navCta}>
          <button 
            className={`${styles.btnMenu} ${isMenuOpen ? styles.btnMenuOpen : ""}`} 
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </header>
  );
}

