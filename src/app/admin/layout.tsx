"use client";

import Link from "next/link";
import { LayoutDashboard, Video, Users, Settings, LogOut } from "lucide-react";
import styles from "./AdminLayout.module.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>STRATÉGICA</h2>
          <p>Admin Panel</p>
        </div>
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navLink}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/portfolio" className={styles.navLink}>
            <Video size={20} /> Portafolio
          </Link>
          <Link href="/admin/team" className={styles.navLink}>
            <Users size={20} /> Equipo
          </Link>
          <Link href="/admin/settings" className={styles.navLink}>
            <Settings size={20} /> Configuración
          </Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.navLink}>
            <LogOut size={20} /> Salir al sitio
          </Link>
        </div>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
