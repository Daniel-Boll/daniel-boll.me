import { generateOgImage } from "@/utils/open-graph/generateImage";
import type { APIRoute, GetStaticPaths, GetStaticPathsItem } from "astro";
import { getCollection } from "astro:content";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("posts");

  const result: GetStaticPathsItem[] = posts.map((post) => ({
    params: {
      slug: `posts/${post.slug}`,
    },
    props: {
      title: post.data.title,
      description: post.data.description,
      date: post.data.publishedAt,
    },
  }));

  return result;
};

export const GET: APIRoute = async ({ props }) => {
  const response = await generateOgImage({
    title: props.title,
    description: props.description,
    date: new Date(props.date),
  });
  return new Response(response, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  });
};
