import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const tjenesterCollection = defineCollection({
  loader: glob({ pattern: ['*.md'], base: 'src/content/tjenester' }),
  schema: z.object({
    title: z.string(),
    category: z.array(z.string()),
    categorySlug: z.array(z.string()),
    description: z.string();
  })

    
});

export const collections = {
  tjenester: tjenesterCollection,
};
