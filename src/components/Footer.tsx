"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import styles from "./Footer.module.css";

const sitemap = [
  { label: "Trabajos", href: "#portfolio" },
  { label: "Nosotros", href: "#about" },
  { label: "Servicios", href: "#services" },
  { label: "Contacto", href: "#contact" },
];

const social = ["Instagram", "LinkedIn", "Behance"];
const legal = ["Privacidad", "Términos"];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              STRATÉGICA.
            </Link>
            <p className={styles.description}>
              Diseño estratégico y comunicación visual para marcas globales.
            </p>
            <div className={styles.coordinates}>
              <p>BOGOTÁ, COL</p>
              <p>LAT: 4.6097° N / LNG: 74.0817° W</p>
            </div>
          </div>

          <nav aria-label="Mapa del sitio">
            <h4>Mapa del Sitio</h4>
            <ul>
              {sitemap.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Redes sociales">
            <h4>Social</h4>
            <ul>
              {social.map((item) => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h4>Legal</h4>
            <ul>
              {legal.map((item) => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottomBar}>
          <p>© 2024 STRATEGICA AGENCY. ALL RIGHTS RESERVED.</p>
          <p>SYS. VERSION_2.0.4</p>
        </div>
      </div>

      <a
        href="https://wa.me/573001234567"
        className={styles.whatsappFloat}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={26} />
      </a>
    </footer>
  );
}
