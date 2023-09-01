import { defineCollection, z } from "astro:content";

// TODO: Add an optional from-to color gradient
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

      from: z.string().optional().default("gray-100"),
      to: z.string().optional().default("gray-800")
    }),
});

const tils = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
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

export const collections = { posts, series, tils };
