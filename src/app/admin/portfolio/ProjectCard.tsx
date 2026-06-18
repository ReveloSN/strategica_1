"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Edit2, Trash2, Video } from "lucide-react";
import styles from "./page.module.css";

type ProjectCardProps = {
  project: {
    id: string;
    title: string;
    category: string;
    coverImage: string | null;
  };
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`¿Estás seguro de que deseas eliminar el proyecto "${project.title}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Error al eliminar el proyecto.");
      }
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el proyecto.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.coverImage} alt={project.title} />
        ) : (
          <div className={styles.placeholderImage}>
            <Video size={40} />
          </div>
        )}
      </div>
      <div className={styles.cardContent}>
        <h3>{project.title}</h3>
        <p className={styles.category}>{project.category}</p>
        <div className={styles.actions}>
          <Link href={`/admin/portfolio/${project.id}/edit`} className={styles.actionBtn} title="Editar">
            <Edit2 size={16} />
          </Link>
          <button
            className={`${styles.actionBtn} ${styles.danger}`}
            title="Eliminar"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
