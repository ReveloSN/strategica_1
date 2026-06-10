import type { Metadata } from "next";
import {
  Bodoni_Moda,
  Hanken_Grotesk,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "STRATÉGICA | Agencia de Marketing Digital",
  description: "Ayudamos a marcas a crecer mediante estrategias digitales orientadas a resultados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bodoni.variable} ${hanken.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
