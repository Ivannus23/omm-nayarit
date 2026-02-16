import { defineField, defineType } from "sanity";

export default defineType({
  name: "documento",
  title: "Documento descargable",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Convocatoria", value: "convocatoria" },
          { title: "Resultados finales generales", value: "resultados-finales" },
          { title: "Calendario de entrenamientos", value: "calendario" },
          { title: "Examen eliminatorio", value: "examen-eliminatorio" },
          { title: "Examen semifinal", value: "examen-semifinal" },
          { title: "Examen final", value: "examen-final" },
          { title: "Resultados por año", value: "resultados" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Año",
      type: "number",
      validation: (rule) =>
        rule.min(2000).max(2100).warning("Revisa que el año sea correcto"),
    }),
    defineField({
      name: "file",
      title: "Archivo PDF",
      type: "file",
      options: {
        storeOriginalFilename: true,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "year",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `Año ${subtitle}` : "",
      };
    },
  },
});
