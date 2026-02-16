import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Olimpiada Estatal de Matemáticas · Nayarit",
  description:
    "Sitio oficial de la Olimpiada Estatal de Matemáticas de Nayarit. Convocatorias, exámenes, resultados y comité organizador.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-slate-50">
        {/* Contenedor general con fondo tipo Next */}
        <div className="relative min-h-screen overflow-x-hidden">
          {/* CAPA DE FONDO (debajo de todo) */}
          <div className="pointer-events-none fixed inset-0 -z-10 bg-slate-950">
            {/* Brillo radial superior */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_55%)]" />
            {/* Brillo radial inferior */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.16),transparent_55%)]" />
            {/* Malla / grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.9)_0,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.9)_0,rgba(148,163,184,0.18)_1px,transparent_1px)] bg-[size:80px_80px]" />
          </div>

          {/* CONTENIDO REAL */}
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 pb-20 pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
