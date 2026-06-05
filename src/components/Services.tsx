"use client";

import { motion } from "framer-motion";
import { 
  LineChart, 
  Share2, 
  PenTool, 
  Video, 
  Megaphone, 
  Layout, 
  BarChart 
} from "lucide-react";
import styles from "./Services.module.css";

const services = [
  {
    icon: <LineChart size={32} />,
    title: "Estrategia digital",
    description: "Diseñamos hojas de ruta claras y basadas en datos para alcanzar los objetivos de negocio de tu marca."
  },
  {
    icon: <Share2 size={32} />,
    title: "Gestión de redes sociales",
    description: "Creamos y gestionamos comunidades activas que conectan genuinamente con tu audiencia."
  },
  {
    icon: <PenTool size={32} />,
    title: "Branding",
    description: "Construimos identidades visuales y verbales únicas que destacan y perduran en el tiempo."
  },
  {
    icon: <Video size={32} />,
    title: "Producción audiovisual",
    description: "Desarrollamos contenido en video de alta calidad que cuenta tu historia de forma impactante."
  },
  {
    icon: <Megaphone size={32} />,
    title: "Campañas publicitarias",
    description: "Optimizamos tu inversión en medios digitales para lograr el máximo retorno de inversión."
  },
  {
    icon: <Layout size={32} />,
    title: "Diseño web",
    description: "Creamos experiencias digitales premium, rápidas y optimizadas para conversiones."
  },
  {
    icon: <BarChart size={32} />,
    title: "Análisis de métricas",
    description: "Medimos y analizamos continuamente para tomar decisiones informadas y escalar tus resultados."
  }
];

export default function Services() {
  return (
    <section id="services" className={`section section-gray ${styles.servicesSection}`}>
      <div className="container">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>Nuestros Servicios</h2>
          <p className={styles.sectionSubtitle}>
            Soluciones integrales diseñadas para impulsar tu presencia digital.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.iconWrapper}>
                {service.icon}
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
