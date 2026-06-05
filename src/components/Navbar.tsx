"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Inicio", href: "#hero" },
    { name: "Servicios", href: "#services" },
    { name: "Portafolio", href: "#portfolio" },
    { name: "Casos de Éxito", href: "#success" },
    { name: "Equipo", href: "#team" },
    { name: "Blog", href: "#blog" },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? "glass" : ""} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          STRATÉGICA
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navLinks}>
            {links.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className={styles.link}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="#contact" className="btn-primary">
            Hablemos
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className={styles.mobileToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className={styles.mobileNav}>
          <ul className={styles.mobileNavLinks}>
            {links.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className={styles.mobileLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                href="#contact" 
                className="btn-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hablemos
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
