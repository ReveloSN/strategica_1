"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Target } from "lucide-react";
import styles from "./SuccessCases.module.css";

const cases = [
  {
    client: "TechCorp Inc.",
    problem: "Baja tasa de conversión en su e-commerce principal y alto costo por adquisición.",
    strategy: "Rediseño UX/UI, optimización de embudos y campañas de retargeting en Meta Ads.",
    result: "+150% en ventas mensuales",
    metric: "150%",
    metricLabel: "Crecimiento",
    icon: <TrendingUp size={24} />
  },
  {
    client: "EcoLife Brands",
    problem: "Falta de identidad de marca clara y engagement nulo en redes sociales.",
    strategy: "Rebranding completo y estrategia de contenidos enfocada en valores sostenibles.",
    result: "+50k seguidores reales en 6 meses",
    metric: "300%",
    metricLabel: "Engagement",
    icon: <Users size={24} />
  }
];

export default function SuccessCases() {
  return (
    <section id="success" className={`section section-dark ${styles.successSection}`}>
      <div className="container">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>Casos de Éxito</h2>
          <p className={styles.sectionSubtitle}>
            Transformamos desafíos en resultados medibles y escalables.
          </p>
        </motion.div>

        <div className={styles.casesList}>
          {cases.map((item, index) => (
            <motion.div 
              key={index}
              className={styles.caseCard}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className={styles.caseContent}>
                <h3 className={styles.clientName}>{item.client}</h3>
                
                <div className={styles.detailGroup}>
                  <h4 className={styles.detailTitle}>El Problema</h4>
                  <p className={styles.detailText}>{item.problem}</p>
                </div>
                
                <div className={styles.detailGroup}>
                  <h4 className={styles.detailTitle}>La Estrategia</h4>
                  <p className={styles.detailText}>{item.strategy}</p>
                </div>
                
                <div className={styles.resultGroup}>
                  <div className={styles.metricBox}>
                    <span className={styles.metricValue}>{item.metric}</span>
                    <span className={styles.metricLabel}>{item.metricLabel}</span>
                  </div>
                  <div className={styles.resultText}>
                    <div className={styles.resultIcon}>{item.icon}</div>
                    <span>{item.result}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
