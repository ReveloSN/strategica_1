import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

export default async function AdminDashboard() {
  const projectsCount = await prisma.project.count();
  const teamCount = await prisma.teamMember.count();

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
          <h3>Equipo</h3>
          <p className={styles.statValue}>{teamCount}</p>
          <p className={styles.statDesc}>Miembros</p>
        </div>
      </div>
    </div>
  );
}
