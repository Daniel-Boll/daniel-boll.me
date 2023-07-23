import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      cover: image().optional(),
      coverAlt: z.string().optional(),

      title: z.string(),
      description: z.string(),
      featured: z.boolean().default(false),
      publishedAt: z.date(),
      updatedAt: z.date().optional(),

      seriesId: z.string().optional(),
      orderInSeries: z.number().optional(),
      isDraft: z.boolean().default(false),
    }),
});

const series = defineCollection({
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { posts, series };
