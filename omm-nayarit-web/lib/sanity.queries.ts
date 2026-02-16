import { groq } from "next-sanity";

export const avisosQuery = groq`
  *[_type == "aviso"] | order(publishedAt desc)[0...5]{
    _id,
    title,
    slug,
    summary,
    link,
    publishedAt
  }
`;

export const noticiasQuery = groq`
  *[_type == "noticia"] | order(publishedAt desc)[0...4]{
    _id,
    title,
    slug,
    summary,
    image,
    publishedAt
  }
`;

export const fechasClaveQuery = groq`
  *[_type == "fechasClave"] | order(_createdAt desc)[0]{
    title,
    items[]{
      label,
      date
    }
  }
`;

// 👇 NUEVO: documentos por categoría
export const documentosPorCategoriaQuery = groq`
  *[_type == "documento" && category == $category]
  | order(year desc, _createdAt desc){
    _id,
    title,
    year,
    "url": file.asset->url
  }
`;

export const galeriaQuery = groq`
  *[_type == "galeria"] | order(year desc, _createdAt desc)[0]{
    title,
    year,
    heroImage{
      "url": asset->url,
      caption
    },
    images[]{
      _key,
      "url": asset->url,
      caption
    }
  }
`;