"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const links = [
  { name: "Trabajos", href: "#portfolio" },
  { name: "Nosotros", href: "#about" },
  { name: "Servicios", href: "#services" },
  { name: "Contacto", href: "#contact" },
];

interface NavbarProps {
  onServicesClick?: () => void;
  servicesActive?: boolean;
}

export default function Navbar({ onServicesClick, servicesActive = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo} aria-label="Ir al inicio">
          STRA<span>T</span><span>É</span>GICA
        </Link>

        <nav className={styles.desktopNav} aria-label="Navegación principal">
          <ul className={styles.navLinks}>
            {links.map((link, index) => (
              <li key={link.name}>
                {link.name === "Servicios" ? (
                  <button
                    type="button"
                    className={`${styles.link} ${styles.linkButton} ${servicesActive ? styles.activeLink : ""}`}
                    onClick={onServicesClick}
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`${styles.link} ${index === 0 ? styles.activeLink : ""}`}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link href="#contact" className="btn-primary">
            Hablemos
          </Link>
        </nav>

        <button
          className={styles.mobileToggle}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav className={styles.mobileNav} aria-label="Navegación móvil">
          <ul className={styles.mobileNavLinks}>
            {links.map((link) => (
              <li key={link.name}>
                {link.name === "Servicios" ? (
                  <button
                    type="button"
                    className={`${styles.mobileLink} ${styles.mobileLinkButton}`}
                    onClick={() => {
                      onServicesClick?.();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={styles.mobileLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
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
        </nav>
      )}
    </header>
  );
}
