import type { APIRoute } from "astro";
import { createClient } from "@vercel/kv";

export const prerender = false;

const { KV_REST_API_URL, KV_REST_API_TOKEN } = import.meta.env;

const kv = createClient({
  url: KV_REST_API_URL,
  token: KV_REST_API_TOKEN,
});

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;

  if (!slug) return new Response(null, { status: 404 });

  // Get the current view count
  const views = await kv.hget(`post:${slug}`, "views");

  // Return the current view count
  return new Response(
    JSON.stringify({
      views: Number(views),
    }),
    { status: 200 }
  );
};

export const POST: APIRoute = async ({ params }) => {
  const { slug } = params;

  if (!slug) return new Response(null, { status: 404 });

  // Get the current view count
  const views = await kv.hget(`post:${slug}`, "views");

  // // Increment the view count
  await kv.hincrby(`post:${slug}`, "views", 1);

  // Return the current view count
  return new Response(
    JSON.stringify({
      views: Number(views) + 1,
    }),
    { status: 200 }
  );
};
