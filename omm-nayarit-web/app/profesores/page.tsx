import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel del comité · OMM Nayarit",
};

export default function ProfesoresPage() {
  return (
    <section className="space-y-8 py-8">
      <div>
        <h1 className="text-2xl font-semibold">Panel para el comité estatal</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">
          Página de uso interno del comité. Aquí se concentran los accesos a las
          carpetas de exámenes, resultados y material de entrenamiento.
        </p>
      </div>

      <div className="grid gap-4 text-xs md:grid-cols-3">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <h2 className="text-sm font-semibold text-slate-100">
            Carpeta de exámenes
          </h2>
          <p className="mt-2 text-slate-300">
            Subir aquí los PDF de exámenes (eliminatorio, semifinal y final) por año.
          </p>
          <a
            href="URL_CARPETA_EXAMENES"
            target="_blank"
            className="mt-3 inline-flex rounded-full bg-blue-600 px-4 py-2 text-[11px] font-semibold text-white hover:bg-blue-500"
          >
            Abrir carpeta de exámenes
          </a>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <h2 className="text-sm font-semibold text-slate-100">
            Carpeta de resultados
          </h2>
          <p className="mt-2 text-slate-300">
            Aquí se guardan los resultados oficiales por año.
          </p>
          <a
            href="URL_CARPETA_RESULTADOS"
            target="_blank"
            className="mt-3 inline-flex rounded-full bg-blue-600 px-4 py-2 text-[11px] font-semibold text-white hover:bg-blue-500"
          >
            Abrir carpeta de resultados
          </a>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <h2 className="text-sm font-semibold text-slate-100">
            Material de entrenamiento
          </h2>
          <p className="mt-2 text-slate-300">
            Problemas, guías y colecciones para entrenamientos.
          </p>
          <a
            href="URL_CARPETA_MATERIAL"
            target="_blank"
            className="mt-3 inline-flex rounded-full bg-blue-600 px-4 py-2 text-[11px] font-semibold text-white hover:bg-blue-500"
          >
            Abrir carpeta de material
          </a>
        </article>
      </div>
    </section>
  );
}
