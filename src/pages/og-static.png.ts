import { generateOgImageForPost } from "@utils/generate-og-images";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// NOTE: Uncomment this to see the image in the browser
// export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const slug = url.searchParams.get("slug");
  if (!slug) return new Response("Slug not provided", { status: 400 });

  const post = await getCollection("posts", (p) => p.id === slug);
  if (post.length === 0) return new Response("Post not found", { status: 404 });

  return new Response(await generateOgImageForPost(post[0]), {
    headers: { "Content-Type": "image/png" },
  });
};
