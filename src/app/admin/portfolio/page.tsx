import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";
import Link from "next/link";
import { Plus, Video } from "lucide-react";
import ProjectCard from "./ProjectCard";

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
            <ProjectCard key={project.id} project={project} />
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
