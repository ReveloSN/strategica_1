import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";
import Link from "next/link";
import { Plus, Edit2, Trash2, Video } from "lucide-react";

export default async function PortfolioAdmin() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Administrar Portafolio</h1>
          <p className={styles.subtitle}>Gestiona los videos y proyectos de la página.</p>
        </div>
        <Link href="/admin/portfolio/new" className={styles.primaryButton}>
          <Plus size={18} /> Nuevo Proyecto
        </Link>
      </div>

      <div className={styles.grid}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className={styles.card}>
              <div className={styles.cardImage}>
                {project.coverImage ? (
                  <img src={project.coverImage} alt={project.title} />
                ) : (
                  <div className={styles.placeholderImage}><Video size={40} /></div>
                )}
              </div>
              <div className={styles.cardContent}>
                <h3>{project.title}</h3>
                <p className={styles.category}>{project.category}</p>
                <div className={styles.actions}>
                  <button className={styles.actionBtn} title="Editar">
                    <Edit2 size={16} />
                  </button>
                  <button className={`${styles.actionBtn} ${styles.danger}`} title="Eliminar">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <Video size={48} />
            <h3>No hay proyectos aún</h3>
            <p>Agrega tu primer video al portafolio para mostrarlo en la web.</p>
          </div>
        )}
      </div>
    </div>
  );
}
