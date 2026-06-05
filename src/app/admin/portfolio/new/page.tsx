"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import styles from "./page.module.css";

export default function NewProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    videoUrl: "",
    coverImage: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/portfolio");
        router.refresh();
      } else {
        alert("Error al crear el proyecto");
      }
    } catch (error) {
      console.error(error);
      alert("Error al crear el proyecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/admin/portfolio" className={styles.backButton}>
          <ArrowLeft size={18} /> Volver
        </Link>
        <h1 className={styles.title}>Nuevo Proyecto</h1>
        <p className={styles.subtitle}>Agrega un nuevo video al portafolio.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Título del Proyecto</label>
          <input
            type="text"
            id="title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ej: Campaña publicitaria 2026"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Categoría</label>
          <input
            type="text"
            id="category"
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="Ej: Producción Audiovisual"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Descripción (opcional)</label>
          <textarea
            id="description"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Breve descripción del proyecto..."
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="videoUrl">URL del Video (YouTube o Vimeo)</label>
          <input
            type="url"
            id="videoUrl"
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="coverImage">URL de la Imagen de Portada</label>
          <input
            type="url"
            id="coverImage"
            required
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton} disabled={loading}>
            <Save size={18} /> {loading ? "Guardando..." : "Guardar Proyecto"}
          </button>
        </div>
      </form>
    </div>
  );
}
