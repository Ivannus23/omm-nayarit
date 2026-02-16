"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = [
  { href: "#convocatoria", label: "Convocatoria" },
  { href: "#avisos", label: "Avisos" },
  { href: "#examenes", label: "Exámenes" },
  { href: "#resultados", label: "Resultados" },
  { href: "#momentos", label: "Galería" },   // asegúrate de poner id="momentos" en esa sección
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo + texto */}
        <Link href="#inicio" className="flex items-center gap-4">
          <Image
            src="/logo-omm-nayarit.svg"
            alt="Olimpiada Mexicana de Matemáticas - Delegación Nayarit"
            width={80}
            height={80}
            // h-12 en mobile, h-14 en pantallas más grandes; w-auto mantiene proporción
            className="h-12 w-auto sm:h-14 brightness-0 invert"
          />
          <div className="leading-tight hidden sm:block">
            <p className="text-sm font-semibold text-slate-50">
              Olimpiada Estatal de Matemáticas
            </p>
            <p className="text-[11px] text-slate-400">Delegación Nayarit</p>
          </div>
        </Link>

        {/* Links desktop */}
        <div className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-blue-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

                {/* Botón menú mobile */}
        <button
          className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-100 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Abrir menú de navegación"
        >
          <span>Menú</span>
          <div className="relative h-4 w-4">
            {/* Línea superior */}
            <span
              className={
                "absolute inset-x-0 top-0 h-[2px] rounded-full bg-slate-100 transition-transform " +
                (open ? "translate-y-[6px] rotate-45" : "")
              }
            />
            {/* Línea central */}
            <span
              className={
                "absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-slate-100 transition-opacity " +
                (open ? "opacity-0" : "opacity-100")
              }
            />
            {/* Línea inferior */}
            <span
              className={
                "absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-slate-100 transition-transform " +
                (open ? "-translate-y-[6px] -rotate-45" : "")
              }
            />
          </div>
        </button>

      </nav>

      {/* Menú desplegable mobile */}
      {open && (
        <div className="border-t border-slate-800 bg-slate-950/95 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-3 text-sm text-slate-100">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
