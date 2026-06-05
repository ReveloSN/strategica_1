"use client";

import { motion } from "framer-motion";
import styles from "./Team.module.css";

const teamMembers = [
  {
    name: "Elena Torres",
    role: "CEO & Directora Estratégica",
    description: "Especialista en crecimiento digital con más de 10 años de experiencia.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Carlos Mendoza",
    role: "Head of Marketing",
    description: "Experto en campañas de performance y análisis de datos.",
    photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Sofía Ruiz",
    role: "Directora Creativa",
    description: "Apasionada por el diseño de interfaces y la identidad visual de marcas premium.",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
  }
];

export default function Team() {
  return (
    <section id="team" className={`section section-light ${styles.teamSection}`}>
      <div className="container">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>Nuestro Equipo</h2>
          <p className={styles.sectionSubtitle}>
            Profesionales apasionados por hacer crecer tu marca.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className={styles.memberCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.photoContainer}>
                <img src={member.photo} alt={member.name} className={styles.photo} />
                <div className={styles.socialOverlay}>
                  <a href="#" className={styles.socialLink}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                  <a href="#" className={styles.socialLink}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </a>
                </div>
              </div>
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>{member.name}</h3>
                <span className={styles.memberRole}>{member.role}</span>
                <p className={styles.memberDescription}>{member.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
