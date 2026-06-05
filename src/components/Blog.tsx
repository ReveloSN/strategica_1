"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./Blog.module.css";

const posts = [
  {
    title: "El futuro del marketing conversacional en 2026",
    excerpt: "Descubre cómo la IA y la automatización están redefiniendo la manera en que las marcas se comunican con sus clientes.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    date: "12 May 2026"
  },
  {
    title: "5 estrategias para escalar tu e-commerce",
    excerpt: "Las tácticas probadas que utilizamos para multiplicar las ventas de nuestros clientes en el sector retail.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    date: "05 May 2026"
  },
  {
    title: "Por qué el diseño UI/UX es tu mejor inversión",
    excerpt: "Un análisis de cómo el diseño centrado en el usuario impacta directamente en el retorno de inversión.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
    date: "28 Abr 2026"
  }
];

export default function Blog() {
  return (
    <section id="blog" className={`section section-gray ${styles.blogSection}`}>
      <div className="container">
        <div className={styles.header}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.sectionTitle}>Últimas Noticias</h2>
            <p className={styles.sectionSubtitle}>Tendencias, estrategias y reflexiones.</p>
          </motion.div>
          
          <motion.button 
            className={`btn-secondary ${styles.btnAll}`}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ver todo el blog
          </motion.button>
        </div>

        <div className={styles.grid}>
          {posts.map((post, index) => (
            <motion.div 
              key={index}
              className={styles.postCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.imageContainer}>
                <img src={post.image} alt={post.title} className={styles.image} />
              </div>
              <div className={styles.postContent}>
                <span className={styles.date}>{post.date}</span>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                <a href="#" className={styles.readMore}>
                  Leer artículo <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
