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

  // Get the current upvote count
  const upvotes = await kv.hget(`post:${slug}`, "upvotes");

  // Return the current upvote count
  return new Response(
    JSON.stringify({
      upvotes: Number(upvotes),
    }),
    { status: 200 }
  );
};

export const POST: APIRoute = async ({ params }) => {
  const { slug } = params;

  if (!slug) return new Response(null, { status: 404 });

  // Get the current upvotes count
  const upvotes = await kv.hget(`post:${slug}`, "upvotes");

  // // Increment the upvotes count
  await kv.hincrby(`post:${slug}`, "upvotes", 1);

  // Return the current upvotes count
  return new Response(
    JSON.stringify({
      upvotes: Number(upvotes) + 1,
    }),
    { status: 200 }
  );
};
