"use client";

import { useState } from "react";

export function ContactSection() {
  const [status, setStatus] = useState(
    "El mensaje se abrirá en tu aplicación de correo para que puedas enviarlo."
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const nombre = (data.get("nombre") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const mensaje = (data.get("mensaje") as string)?.trim();

    setStatus("");

    if (!nombre || !email || !mensaje) {
      setStatus("Por favor completa todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("Por favor ingresa un correo válido.");
      return;
    }

    const destinatario = "ommnayarit@gmail.com";
    const asunto = "Consulta desde el sitio OMM Nayarit";
    const cuerpo = `
Nombre: ${nombre}
Correo: ${email}

Mensaje:
${mensaje}
    `.trim();

    const mailto =
      `mailto:${encodeURIComponent(destinatario)}` +
      `?subject=${encodeURIComponent(asunto)}` +
      `&body=${encodeURIComponent(cuerpo)}`;

    setStatus("Abriendo tu aplicación de correo...");
    window.location.href = mailto;
  };

  return (
    <section
      id="contacto"
      className="border-t border-slate-800 bg-gradient-to-b from-slate-950 to-slate-950 py-10"
    >
      <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-xl font-semibold">Contacto</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Si tienes dudas sobre la participación de tu escuela, el proceso de selección
            o los entrenamientos, puedes escribir al comité estatal.
          </p>
          <div className="mt-4 text-sm text-slate-200">
            <p className="font-semibold">Correo electrónico directo:</p>
            <a
              href="mailto:ommnayarit@gmail.com"
              className="text-blue-400 hover:text-blue-300"
            >
              ommnayarit@gmail.com
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-xs"
        >
          <div className="mb-3">
            <label htmlFor="nombre" className="mb-1 block text-[11px]">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Tu nombre completo"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="mb-1 block text-[11px]">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tunombre@correo.com"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mensaje" className="mb-1 block text-[11px]">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={4}
              placeholder="Escribe tu duda o comentario"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-1 w-full rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
          >
            Enviar mensaje
          </button>
          {status && (
            <p className="mt-2 text-[11px] text-slate-400">{status}</p>
          )}
        </form>
      </div>
    </section>
  );
}
