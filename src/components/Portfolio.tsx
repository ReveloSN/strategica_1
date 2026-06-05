"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./Portfolio.module.css";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  videoUrl: string;
  coverImage: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
      })
      .catch((err) => console.error("Error fetching projects", err));
  }, []);

  // Helper to extract TikTok Video ID and generate Embed URL
  const getEmbedUrl = (url: string) => {
    if (url.includes("tiktok.com")) {
      const match = url.match(/video\/(\d+)/);
      if (match && match[1]) {
        return `https://www.tiktok.com/embed/v2/${match[1]}`;
      }
    }
    // Assume YouTube or Vimeo if not TikTok
    return url;
  };

  return (
    <section id="portfolio" className={`section section-light ${styles.portfolioSection}`}>
      <div className="container">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>Portafolio (Reels & Audiovisual)</h2>
          <p className={styles.sectionSubtitle}>
            Una muestra de nuestro trabajo impulsando marcas hacia el éxito en TikTok y otras plataformas.
          </p>
        </motion.div>

        {activeVideo && (
          <div className={styles.videoModal} onClick={() => setActiveVideo(null)}>
            <div className={styles.videoContainer}>
              <iframe
                src={activeVideo}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.iframe}
              ></iframe>
              <button className={styles.closeBtn} onClick={() => setActiveVideo(null)}>Cerrar</button>
            </div>
          </div>
        )}

        <div className={styles.grid}>
          {projects.length > 0 ? projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.imageContainer}>
                <img src={project.coverImage} alt={project.title} className={styles.image} />
                <div className={styles.overlay}>
                  <button 
                    className={styles.playButton} 
                    onClick={() => setActiveVideo(getEmbedUrl(project.videoUrl))}
                  >
                    <Play fill="currentColor" size={24} />
                  </button>
                </div>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.category}>{project.category}</span>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDescription}>{project.description}</p>
                <button 
                  className={`btn-secondary ${styles.btnProject}`}
                  onClick={() => setActiveVideo(getEmbedUrl(project.videoUrl))}
                >
                  Ver Reel / Proyecto
                </button>
              </div>
            </motion.div>
          )) : (
            <p style={{ textAlign: "center", color: "var(--color-gray-dark)", width: "100%" }}>
              No hay proyectos en el portafolio aún. Añade uno desde el panel de administración.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
