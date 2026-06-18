"use client";

import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Play, X } from "lucide-react";
import { getEmbedUrl } from "@/lib/embed";
import styles from "./Portfolio.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  videoUrl: string;
  coverImage: string;
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/projects", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
      })
      .catch((err) => console.error("Error fetching projects", err));
  }, []);

  const columns = useMemo(() => {
    return projects.reduce<Project[][]>(
      (groups, project, index) => {
        groups[index % 4].push(project);
        return groups;
      },
      [[], [], [], []]
    );
  }, [projects]);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion || !sectionRef.current) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-reel-card]");
      const parallaxColumns = gsap.utils.toArray<HTMLElement>("[data-parallax-card]");

      if (cards.length > 0) {
        gsap.from(cards, {
          opacity: 0,
          y: 80,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      }

      if (parallaxColumns.length > 0) {
        parallaxColumns.forEach((column, index) => {
          gsap.to(column, {
            y: -36 - index * 12,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }
    },
    { scope: sectionRef, dependencies: [projects.length] }
  );

  const openProject = (url: string) => {
    setActiveVideo(getEmbedUrl(url));
  };

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    card.style.transform = `translate(${x * 0.04}px, ${y * 0.04}px) scale(1.015)`;
  };

  const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.transform = "translate(0, 0) scale(1)";
  };

  return (
    <section id="portfolio" className={styles.portfolioSection} ref={sectionRef}>
      <div className={styles.header}>
        <h2>Reels Portfolio</h2>
        <p>EXTENSIVE CATALOG</p>
      </div>

      {activeVideo && (
        <div className={styles.videoModal} onClick={() => setActiveVideo(null)} role="dialog" aria-modal="true">
          <div className={styles.videoContainer} onClick={(event) => event.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setActiveVideo(null)} aria-label="Cerrar video">
              <X size={18} />
            </button>
            <iframe
              src={activeVideo}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.iframe}
              title="Video del portafolio"
            />
          </div>
        </div>
      )}

      {projects.length > 0 ? (
        <div className={styles.grid}>
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`${styles.column} ${styles[`column${columnIndex + 1}`]}`}
              data-parallax-card
            >
              {column.map((project) => (
                <article
                  key={project.id}
                  className={styles.card}
                  data-reel-card
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className={styles.mediaButton} onClick={() => openProject(project.videoUrl)}>
                    <img src={project.coverImage} alt={project.title} className={styles.image} />
                    <span className={styles.overlay}>
                      <span className={styles.playIcon}>
                        <Play fill="currentColor" size={34} />
                      </span>
                      <span className={styles.overlayTitle}>{project.title}</span>
                    </span>
                  </button>
                  <h3>{project.title}</h3>
                  <p>{project.category}</p>
                </article>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>No hay proyectos en el portafolio aún.</p>
          <span>Añade reels desde el panel de administración para poblar esta grilla.</span>
        </div>
      )}
    </section>
  );
}
