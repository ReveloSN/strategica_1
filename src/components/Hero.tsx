"use client";

import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Hero.module.css";

const brandLetters = ["S", "T", "R", "A", "T", "É", "G", "I", "C", "A"];

export default function Hero() {
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const brandmark = document.querySelector<HTMLElement>("[data-brandmark]");
    const letters = gsap.utils.toArray<HTMLElement>(".hero-letter");
    const revealElements = gsap.utils.toArray<HTMLElement>(".reveal-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((element) => observer.observe(element));

    if (prefersReducedMotion || !brandmark || letters.length === 0) {
      return () => observer.disconnect();
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scale = Math.max(0.6, 1 - scrollY * 0.0008);
      const translateY = scrollY * 0.15;
      const opacity = Math.max(0, 1 - scrollY * 0.0015);

      gsap.set(brandmark, {
        scale,
        y: -translateY,
        opacity,
        transformOrigin: "center center",
      });

      letters.forEach((letter, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        const speed = 0.1 + (index % 3) * 0.05;

        gsap.set(letter, {
          x: scrollY * speed * direction,
        });
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.brandStage}>
        <div className={styles.brandmark} data-brandmark>
          <h1 className={styles.title} aria-label="STRATÉGICA">
            {brandLetters.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className={`hero-letter ${styles.letter} ${index === 4 || index === 5 ? styles.mutedLetter : ""}`}
                aria-hidden="true"
              >
                {letter}
              </span>
            ))}
          </h1>
          <div className={styles.pill} aria-hidden="true" />
        </div>
      </div>

      <div id="about" className={`reveal-up ${styles.editorialIntro}`}>
        <h2>Creemos en el diseño como una herramienta estratégica, no solo estética.</h2>
        <div className={styles.introGrid}>
          <p>
            Fundada en 2010, Estratégica nació de la necesidad de cerrar la brecha entre la consultoría de negocios tradicional y las agencias creativas convencionales.
          </p>
          <p>
            No seguimos tendencias; construimos sistemas diseñados para perdurar. Trabajamos en estrecha colaboración con nuestros clientes.
          </p>
        </div>
        <Link href="#services" className="btn-primary">
          Saber más
        </Link>
      </div>
    </section>
  );
}
