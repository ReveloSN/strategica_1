"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import styles from "./page.module.css";

export default function NewSuccessCase() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    initialProblem: "",
    strategyApplied: "",
    results: "",
    metrics: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/success-cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/success-cases");
        router.refresh();
      } else {
        alert("Error al crear el caso de éxito");
      }
    } catch (error) {
      console.error(error);
      alert("Error al crear el caso de éxito");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/admin/success-cases" className={styles.backButton}>
          <ArrowLeft size={18} /> Volver
        </Link>
        <h1 className={styles.title}>Nuevo Caso de Éxito</h1>
        <p className={styles.subtitle}>Agrega un caso de éxito a la web.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="clientName">Nombre del Cliente</label>
          <input
            type="text"
            id="clientName"
            required
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            placeholder="Ej: Marca X"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="initialProblem">Problema Inicial</label>
          <textarea
            id="initialProblem"
            rows={3}
            value={formData.initialProblem}
            required
            onChange={(e) => setFormData({ ...formData, initialProblem: e.target.value })}
            placeholder="Breve descripción del problema..."
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="strategyApplied">Estrategia Aplicada</label>
          <textarea
            id="strategyApplied"
            rows={3}
            value={formData.strategyApplied}
            required
            onChange={(e) => setFormData({ ...formData, strategyApplied: e.target.value })}
            placeholder="Breve descripción de la solución..."
          ></textarea>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="results">Resultados</label>
          <textarea
            id="results"
            rows={3}
            value={formData.results}
            required
            onChange={(e) => setFormData({ ...formData, results: e.target.value })}
            placeholder="Resultados obtenidos..."
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="metrics">Métricas Clave</label>
          <input
            type="text"
            id="metrics"
            value={formData.metrics}
            onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
            placeholder="Ej: +45% Conversión, -20% CPA"
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton} disabled={loading}>
            <Save size={18} /> {loading ? "Guardando..." : "Guardar Caso de Éxito"}
          </button>
        </div>
      </form>
    </div>
  );
}
