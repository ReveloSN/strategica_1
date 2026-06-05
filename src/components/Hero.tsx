"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Hero.module.css";
import ThreeBackground from "./ThreeBackground";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <ThreeBackground />
      <div className={`container ${styles.content}`}>
        <motion.div 
          className={styles.textContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className={styles.title}>
            Eliminamos las <span className={styles.accentText}>hipótesis.</span><br />
            Multiplicamos tus <span className={styles.accentText}>resultados.</span>
          </h1>
          <p className={styles.subtitle}>
            Agencia de marketing digital especializada en estrategias orientadas a ROI. No vendemos promesas. Entregamos métricas que transforman tu negocio.
          </p>
          <div className={styles.buttonGroup}>
            <Link href="#contacto" className={styles.primaryButton}>
              Solicita una auditoría gratuita <ArrowRight size={18} />
            </Link>
            <Link href="#casos" className={styles.secondaryButton}>
              Ver casos de éxito
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
