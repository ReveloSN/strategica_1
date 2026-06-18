"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, X, Video } from "lucide-react";
import type { ClientUploadedFileData } from "uploadthing/types";
import { useUploadThing } from "@/lib/uploadthing";
import styles from "../../new/page.module.css";

type UploadedProjectFile = ClientUploadedFileData<{ url: string }>;

type ProjectData = {
  id: string;
  title: string;
  description: string;
  category: string;
  videoUrl: string;
  coverImage: string;
};

export default function EditProjectForm({ project }: { project: ProjectData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: project.title || "",
    description: project.description || "",
    category: project.category || "",
    videoUrl: project.videoUrl || "",
    coverImage: project.coverImage || "",
  });

  const { startUpload: uploadCover, isUploading: isUploadingCover } = useUploadThing("coverImageUploader", {
    onClientUploadComplete: (res: UploadedProjectFile[]) => {
      if (res && res[0]) {
        setFormData((prev) => ({ ...prev, coverImage: res[0].url }));
      }
    },
    onUploadError: () => {
      alert("Error al subir la imagen");
    },
  });

  const { startUpload: uploadVideo, isUploading: isUploadingVideo } = useUploadThing("videoUploader", {
    onClientUploadComplete: (res: UploadedProjectFile[]) => {
      if (res && res[0]) {
        setFormData((prev) => ({ ...prev, videoUrl: res[0].url }));
      }
    },
    onUploadError: () => {
      alert("Error al subir el video");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push("/admin/portfolio");
        router.refresh();
      } else {
        alert("Error al actualizar el proyecto");
      }
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el proyecto");
    } finally {
      setLoading(false);
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await uploadCover(Array.from(e.target.files));
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await uploadVideo(Array.from(e.target.files));
    }
  };

  const isUploading = isUploadingCover || isUploadingVideo;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/admin/portfolio" className={styles.backButton}>
          <ArrowLeft size={18} /> Volver
        </Link>
        <h1 className={styles.title}>Editar Proyecto</h1>
        <p className={styles.subtitle}>Modifica los datos del proyecto.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Título del Proyecto</label>
          <input type="text" id="title" required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ej: Campaña publicitaria 2026" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Categoría</label>
          <input type="text" id="category" required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="Ej: Producción Audiovisual" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Descripción (opcional)</label>
          <textarea id="description" rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Breve descripción del proyecto..." />
        </div>

        <div className={styles.formGroup}>
          <label>URL del Video (YouTube, Vimeo, TikTok, Instagram) o Subir Archivo MP4</label>

          {formData.videoUrl && formData.videoUrl.includes("uploadthing") ? (
            <div className={styles.uploadPreview}>
              <div className={styles.fileInfo}>
                <Video size={20} />
                <span>Video subido correctamente</span>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, videoUrl: "" })}
                className={styles.removeButton}
              >
                <X size={16} /> Quitar
              </button>
            </div>
          ) : (
            <>
              <div className={styles.uploadBox}>
                <label className={styles.uploadLabel}>
                  {isUploadingVideo ? "Subiendo video..." : "Seleccionar Video (Máx 64MB)"}
                  <input
                    type="file"
                    accept="video/mp4,video/*"
                    onChange={handleVideoUpload}
                    disabled={isUploadingVideo}
                    className={styles.hiddenInput}
                  />
                </label>
              </div>
              <p className={styles.orText}>- O pega una URL externa -</p>
              <input type="url" id="videoUrl"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://youtube.com/watch?v=..." />
            </>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Imagen de Portada</label>

          {formData.coverImage && formData.coverImage.includes("uploadthing") ? (
            <div className={styles.uploadPreview}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={formData.coverImage} alt="Preview" className={styles.imagePreview} />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, coverImage: "" })}
                className={styles.removeButton}
              >
                <X size={16} /> Quitar
              </button>
            </div>
          ) : (
            <>
              <div className={styles.uploadBox}>
                <label className={styles.uploadLabel}>
                  {isUploadingCover ? "Subiendo imagen..." : "Seleccionar Imagen (Máx 4MB)"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleCoverUpload}
                    disabled={isUploadingCover}
                    className={styles.hiddenInput}
                  />
                </label>
              </div>
              <p className={styles.orText}>- O pega una URL externa -</p>
              <input type="url" id="coverImage" required={!formData.coverImage}
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="https://ejemplo.com/imagen.jpg" />
            </>
          )}
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton} disabled={loading || isUploading}>
            <Save size={18} /> {loading || isUploading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
