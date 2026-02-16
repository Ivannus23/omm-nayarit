import { defineField, defineType } from "sanity";

export default defineType({
  name: "galeria",
  title: "Galería OMM Nayarit",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Año",
      type: "number",
      validation: (rule) => rule.min(2000).max(2100),
    }),

    // 👇 Imagen exclusiva para el hero
    defineField({
      name: "heroImage",
      title: "Imagen principal (hero)",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "caption",
          title: "Pie de foto (opcional)",
          type: "string",
        },
      ],
    }),

    // 👇 Imágenes de la galería
    defineField({
      name: "images",
      title: "Imágenes de la galería",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              title: "Pie de foto",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "year" },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `Año ${subtitle}` : "",
      };
    },
  },
});
