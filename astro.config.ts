import fs from "fs";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import preact from "@astrojs/preact";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import rehypePrettyCode from "rehype-pretty-code";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";
import Icons from "unplugin-icons/vite";
import { SITE_URL } from "./src/data/config";
import { remarkReadingTime } from "./src/plugins";
import partytown from "@astrojs/partytown";
const prettyCodeOptions: PrettyCodeOptions = {
  keepBackground: false,
  theme: JSON.parse(
    fs.readFileSync("./src/data/md-themes/moonlight.json", "utf8")
  ),
};

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [
    mdx(),
    tailwind(),
    sitemap(),
    prefetch(),
    preact({
      compat: true,
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
    remarkPlugins: [remarkReadingTime],
  },
  output: "server",
  adapter: vercel({
    analytics: true,
    imageService: true,
    functionPerRoute: false,
  }),
  vite: {
    plugins: [
      Icons({
        compiler: "jsx",
        jsx: "preact",
        autoInstall: true,
      }),
    ],
  },
});
