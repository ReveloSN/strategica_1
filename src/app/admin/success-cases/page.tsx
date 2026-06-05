import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";
import Link from "next/link";
import { Plus, Edit2, Trash2, TrendingUp } from "lucide-react";

export default async function SuccessCasesAdmin() {
  const successCases = await prisma.successCase.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Casos de Éxito</h1>
          <p className={styles.subtitle}>Gestiona los casos de éxito de la agencia.</p>
        </div>
        <Link href="/admin/success-cases/new" className={styles.primaryButton}>
          <Plus size={18} /> Nuevo Caso
        </Link>
      </div>

      <div className={styles.grid}>
        {successCases.length > 0 ? (
          successCases.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardContent}>
                <h3>{item.clientName}</h3>
                <p className={styles.category}>Métricas: {item.metrics}</p>
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
            <TrendingUp size={48} />
            <h3>No hay casos de éxito aún</h3>
            <p>Agrega tu primer caso de éxito para demostrar resultados.</p>
          </div>
        )}
      </div>
    </div>
  );
}
