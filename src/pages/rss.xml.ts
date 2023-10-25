import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  const blog = await getCollection("posts");

  return rss({
    title: "Daniel Boll’s Blog",
    description:
      "Salve! I'm a Tech Lead from Brazil. I'm passionate about technology and constantly seeking new challenges to expand my skillset. I enjoy mastering new programming languages and frameworks and contributing to open source projects. I also like sharing my progress through live coding.",
    site: site ?? "https://daniel-boll.me",
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
  });
};
