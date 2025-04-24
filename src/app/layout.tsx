import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agregador de Links - Encontre os Melhores Links sobre Tecnologia, Música e Esportes",
  description: "Agregador de Links: Descubra os melhores links sobre tecnologia, música, esportes e mais. Organizados por categorias para facilitar sua navegação.",
  keywords: "agregador de links, links úteis, tecnologia, música, esportes",
  authors: [{ name: "Link Agregador" }],
  robots: "index, follow"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
