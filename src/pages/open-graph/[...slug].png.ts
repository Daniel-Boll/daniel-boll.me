import { generateOgImage } from "@/utils/open-graph/generateImage";
import type { APIRoute, GetStaticPaths, GetStaticPathsItem } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("posts");
  const tils = await getCollection("tils");

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

  result.push(
    ...tils.map((til) => ({
      params: {
        slug: `til/${til.slug}`,
      },
      props: {
        title: "Today I Learned",
        description: til.data.title,
        date: til.data.publishedAt,
        tags: til.data.tags,
      },
    }))
  );

  return result;
};

export const GET: APIRoute = async ({ props }) => {
  const response = await generateOgImage({
    title: props.title,
    description: props.description,
    date: new Date(props.date),
    tags: props?.tags,
  });
  return new Response(response, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  });
};
