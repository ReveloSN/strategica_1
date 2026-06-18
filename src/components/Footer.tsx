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

const social = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/strategica_co?igsh=ZnI3bHU2YWJiYzl4",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@somosstrategica?_r=1&_t=ZS-97JpKfF45qi",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.976-1.539 4.99 4.99 0 0 1-1.18-3.147H10.48v12.37a3.02 3.02 0 1 1-3.02-3.021c.54 0 1.05.14 1.5.39v-4.3a7.35 7.35 0 1 0 5.48 7.07V9.77a8.77 8.77 0 0 0 5.149 1.696V6.686Z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61572452847677",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];
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
                <li key={item.name}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
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
        href="https://wa.me/573148768440"
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
