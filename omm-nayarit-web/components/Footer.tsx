import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
      <div className="mx-auto max-w-6xl px-4">
        <p>Olimpiada Estatal de Matemáticas · Nayarit</p>
        <p>Universidad Autónoma de Nayarit · Unidad Académica de Ciencias Básicas e Ingenierías</p>
        <p className="mt-1 text-[11px] text-slate-600">
          Sitio desarrollado por Indra Studio
          <span className="mx-1 opacity-40">·</span>
          <Link href="/profesores" className="text-slate-500 hover:text-slate-300">
            Acceso comité
          </Link>
        </p>
      </div>
    </footer>
  );
}
