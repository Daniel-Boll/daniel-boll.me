import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import preact from "@astrojs/preact";
import rehypePrettyCode, {
  Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import { SITE_URL } from "./src/data/config";
import { remarkReadingTime } from "./src/plugins";
import fs from "fs";
import vercel from "@astrojs/vercel/serverless";
const prettyCodeOptions: PrettyCodeOptions = {
  keepBackground: false,
  theme: JSON.parse(
    fs.readFileSync("./src/data/md-themes/moonlight.json", "utf8")
  ),
};

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  experimental: {
    assets: true,
  },
  integrations: [mdx(), tailwind(), sitemap(), prefetch(), preact()],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
    remarkPlugins: [remarkReadingTime],
  },
  output: "server",
  adapter: vercel({
    analytics: true,
    imageService: true,
  }),
});
