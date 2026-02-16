import { defineField, defineType } from "sanity";

export default defineType({
  name: "fechasClave",
  title: "Fechas clave",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título (ej. Fechas 2026)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Eventos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Nombre del evento",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "date",
              title: "Fecha",
              type: "date",
            },
          ],
          preview: {
            select: { title: "label", subtitle: "date" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
