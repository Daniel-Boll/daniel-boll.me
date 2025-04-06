import { generateOgImageForSite } from "@utils/generate-og-images";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  return new Response(await generateOgImageForSite(), {
    headers: { "Content-Type": "image/png" },
  });
};
