import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";
import Link from "next/link";
import { Plus, Edit2, Trash2, FileText } from "lucide-react";

export default async function BlogAdmin() {
  const blogPosts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.subtitle}>Gestiona los artículos del blog corporativo.</p>
        </div>
        <Link href="/admin/blog/new" className={styles.primaryButton}>
          <Plus size={18} /> Nuevo Artículo
        </Link>
      </div>

      <div className={styles.grid}>
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <div key={post.id} className={styles.card}>
              <div className={styles.cardContent}>
                <h3>{post.title}</h3>
                <p className={styles.category}>Autor: {post.author}</p>
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
            <FileText size={48} />
            <h3>No hay artículos aún</h3>
            <p>Agrega tu primer artículo al blog para generar tráfico.</p>
          </div>
        )}
      </div>
    </div>
  );
}
