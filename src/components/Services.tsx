"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Layout,
  LineChart,
  Megaphone,
  PenTool,
  Share2,
  Video,
  X,
} from "lucide-react";
import styles from "./Services.module.css";

const services = [
  {
    icon: <LineChart size={26} />,
    title: "Estrategia digital",
    description: "Diseñamos hojas de ruta claras y basadas en datos para alcanzar los objetivos de negocio de tu marca.",
  },
  {
    icon: <Share2 size={26} />,
    title: "Gestión de redes sociales",
    description: "Creamos y gestionamos comunidades activas que conectan genuinamente con tu audiencia.",
  },
  {
    icon: <PenTool size={26} />,
    title: "Branding",
    description: "Construimos identidades visuales y verbales únicas que destacan y perduran en el tiempo.",
  },
  {
    icon: <Video size={26} />,
    title: "Producción audiovisual",
    description: "Desarrollamos contenido en video de alta calidad que cuenta tu historia de forma impactante.",
  },
  {
    icon: <Megaphone size={26} />,
    title: "Campañas publicitarias",
    description: "Optimizamos tu inversión en medios digitales para lograr el máximo retorno de inversión.",
  },
  {
    icon: <Layout size={26} />,
    title: "Diseño web",
    description: "Creamos experiencias digitales premium, rápidas y optimizadas para conversiones.",
  },
  {
    icon: <BarChart size={26} />,
    title: "Análisis de métricas",
    description: "Medimos continuamente para tomar decisiones informadas y escalar tus resultados.",
  },
];

interface ServicesProps {
  onClose?: () => void;
}

export default function Services({ onClose }: ServicesProps) {
  return (
    <section id="services" className={styles.servicesSection}>
      {onClose && (
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar servicios">
          <X size={20} />
        </button>
      )}
      <div className={styles.header}>
        <p>SEC.03 // SERVICES</p>
        <h2>Sistemas creativos para marcas que necesitan dirección.</h2>
      </div>

      <div className={styles.grid}>
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            className={styles.card}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.05 }}
          >
            <div className={styles.cardMeta}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.iconWrapper}>{service.icon}</div>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
