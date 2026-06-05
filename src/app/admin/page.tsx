import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

export default async function AdminDashboard() {
  const projectsCount = await prisma.project.count();
  const casesCount = await prisma.successCase.count();
  const teamCount = await prisma.teamMember.count();
  const blogCount = await prisma.blogPost.count();

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard General</h1>
      <p className={styles.subtitle}>Bienvenido al panel de administración de STRATÉGICA.</p>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Portafolio</h3>
          <p className={styles.statValue}>{projectsCount}</p>
          <p className={styles.statDesc}>Proyectos de video</p>
        </div>
        <div className={styles.statCard}>
          <h3>Casos de Éxito</h3>
          <p className={styles.statValue}>{casesCount}</p>
          <p className={styles.statDesc}>Publicados</p>
        </div>
        <div className={styles.statCard}>
          <h3>Equipo</h3>
          <p className={styles.statValue}>{teamCount}</p>
          <p className={styles.statDesc}>Miembros</p>
        </div>
        <div className={styles.statCard}>
          <h3>Blog</h3>
          <p className={styles.statValue}>{blogCount}</p>
          <p className={styles.statDesc}>Artículos</p>
        </div>
      </div>
    </div>
  );
}
