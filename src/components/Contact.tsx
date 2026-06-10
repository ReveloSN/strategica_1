"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    form.reset();
    setStatus("Mensaje recibido. Te responderemos pronto.");
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.content}>
        <div className={styles.copy}>
          <p>SEC.04 // INITIATE</p>
          <h2>
            ¿Listo para elevar <br />
            <span>tu marca?</span>
          </h2>
          <p className={styles.description}>
            Iniciemos una conversación sobre tus objetivos comerciales y cómo nuestro enfoque estratégico puede ayudarte a alcanzarlos.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <label>
              Nombre
              <input type="text" name="name" placeholder="Tu nombre" required />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="tu@email.com" required />
            </label>
          </div>
          <label>
            Empresa
            <input type="text" name="company" placeholder="Nombre de tu empresa" />
          </label>
          <label>
            Mensaje
            <textarea name="message" rows={4} placeholder="¿Cómo podemos ayudarte?" required />
          </label>
          <button type="submit" className={styles.submitBtn}>
            Contactar ahora <Send size={16} />
          </button>
          {status && (
            <span className={styles.status} role="status">
              {status}
            </span>
          )}
        </form>
      </div>
    </section>
  );
}
