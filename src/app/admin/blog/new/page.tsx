"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import styles from "./page.module.css";

export default function NewBlogPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    imageUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        alert("Error al crear el artículo");
      }
    } catch (error) {
      console.error(error);
      alert("Error al crear el artículo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/admin/blog" className={styles.backButton}>
          <ArrowLeft size={18} /> Volver
        </Link>
        <h1 className={styles.title}>Nuevo Artículo de Blog</h1>
        <p className={styles.subtitle}>Agrega un nuevo artículo corporativo.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Título del Artículo</label>
          <input
            type="text"
            id="title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ej: Las 5 tendencias de marketing para 2026"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="author">Autor</label>
          <input
            type="text"
            id="author"
            required
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Contenido Principal</label>
          <textarea
            id="content"
            rows={10}
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Escribe el contenido del artículo aquí..."
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imageUrl">URL de la Imagen de Portada</label>
          <input
            type="url"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton} disabled={loading}>
            <Save size={18} /> {loading ? "Guardando..." : "Publicar Artículo"}
          </button>
        </div>
      </form>
    </div>
  );
}
