import { defineCollection, reference, z } from "astro:content";

import { glob } from "astro/loaders";

export const collections = {
  tjenester: defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/tjenester" }),
    schema: ({image}) => z.object({
      name: z.string(), // Navn på tjeneste
      slug: z.string(),
      category: z.string(), // Kategorien tjenesta sorterer under
      relatedServices: z.array(reference("tjenester")).optional(), // Kryssreferansar
      icon: image().optional(), // Ikon for tenesta
      image: z.string().optional(), // Bilde for tenesta
    }),
  }),
};
