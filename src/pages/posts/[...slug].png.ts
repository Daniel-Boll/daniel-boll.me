import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { siteConfig } from "@/config";
import { getPath } from "@utils/get-path";
import { generateOgImageForPost } from "@utils/generate-og-images";

export async function getStaticPaths() {
  if (!siteConfig.dynamicOgImage) {
    console.log("Dynamic OG image generation is disabled.");
    return [];
  }

  const posts = await getCollection("posts").then((p) =>
    p.filter(({ data }) => !data.draft && !data.image),
  );

  return posts.map((post) => {
    const slug = getPath(post.id, post.filePath, false);
    if (!slug) {
      console.error(`Failed to get slug for post: ${post.id}`);
      return null;
    }

    console.log(`Generating static path for post: ${post.id} (${slug})`);
    return {
      params: { slug },
      props: post,
    };
  });
}

export const GET: APIRoute = async ({ props }) => {
  if (!siteConfig.dynamicOgImage) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(
    await generateOgImageForPost(props as CollectionEntry<"posts">),
    {
      headers: { "Content-Type": "image/png" },
    },
  );
};
