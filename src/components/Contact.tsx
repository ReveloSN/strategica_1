"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={`section section-light ${styles.contactSection}`}>
      <div className="container">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>Hablemos de tu Proyecto</h2>
          <p className={styles.sectionSubtitle}>
            Estamos listos para llevar tu marca al siguiente nivel. Contáctanos.
          </p>
        </motion.div>

        <div className={styles.grid}>
          <motion.div 
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <Mail size={24} />
              </div>
              <div>
                <h4 className={styles.infoTitle}>Email</h4>
                <p className={styles.infoText}>hola@strategica.com</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <Phone size={24} />
              </div>
              <div>
                <h4 className={styles.infoTitle}>Teléfono / WhatsApp</h4>
                <p className={styles.infoText}>+34 900 123 456</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <MapPin size={24} />
              </div>
              <div>
                <h4 className={styles.infoTitle}>Ubicación</h4>
                <p className={styles.infoText}>Paseo de la Castellana 15, Madrid</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.contactFormContainer}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Nombre completo</label>
                <input type="text" className={styles.input} placeholder="Tu nombre" />
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Email</label>
                  <input type="email" className={styles.input} placeholder="tu@email.com" />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Teléfono</label>
                  <input type="tel" className={styles.input} placeholder="+34..." />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Empresa</label>
                <input type="text" className={styles.input} placeholder="Nombre de tu empresa" />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Mensaje</label>
                <textarea className={styles.textarea} rows={4} placeholder="¿Cómo podemos ayudarte?"></textarea>
              </div>

              <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
                Solicitar asesoría <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
