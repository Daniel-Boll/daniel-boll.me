import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
// Imported from "astro/zod" rather than "astro:content": `z` from "astro:content" is
// deprecated in Astro 6+, and under pnpm the re-export leaves TypeScript unable to name
// Zod 4's inferred type for `collections` (TS2742).
import { z } from "astro/zod";

const postsCollection = defineCollection({
	loader: glob({
		pattern: "**/[^_]*.{md,mdx}",
		base: "./src/content/posts",
	}),
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		ogImage: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().default(""),
		lang: z.string().optional().default(""),
	}),
});

// `spec/about.md` carries no frontmatter, so this collection intentionally has no schema.
const specCollection = defineCollection({
	loader: glob({
		pattern: "**/[^_]*.{md,mdx}",
		base: "./src/content/spec",
	}),
});

export const collections = {
	posts: postsCollection,
	spec: specCollection,
};
