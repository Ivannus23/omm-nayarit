import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo + texto */}
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo-omm-nayarit.svg"
            alt="Olimpiada Mexicana de Matemáticas - Delegación Nayarit"
            width={80}
            height={80}
            // h-10 en mobile, h-12 en pantallas más grandes; w-auto mantiene proporción
            className="h-12 w-auto sm:h-14 brightness-0 invert"

          />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-50">
              Olimpiada Estatal de Matemáticas
            </p>
            <p className="text-[11px] text-slate-400">Delegación Nayarit</p>
          </div>
        </Link>

        {/* aquí tus links / botón menú */}
        {/* ... */}
      </nav>
    </header>
  );
}
