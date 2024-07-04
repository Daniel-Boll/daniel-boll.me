import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import {
  transformerMetaHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers";
import swup from "@swup/astro";
import Compress from "astro-compress";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import Color from "colorjs.io";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeComponents from "rehype-components"; /* Render the custom directive content */
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive"; /* Handle directives */
import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives";
import remarkMath from "remark-math";
import { AdmonitionComponent } from "./src/plugins/rehype-component-admonition.mjs";
import { GithubCardComponent } from "./src/plugins/rehype-component-github-card.mjs";
import { GithubProfileComponent } from "./src/plugins/rehype-component-github-profile-card.js";
import { parseDirectiveNode } from "./src/plugins/remark-directive-rehype.js";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

const oklchToHex = (str) => {
  const DEFAULT_HUE = 250;
  const regex = /-?\d+(\.\d+)?/g;
  const matches = str.string.match(regex);
  const lch = [matches[0], matches[1], DEFAULT_HUE];
  return new Color("oklch", lch).to("srgb").toString({
    format: "hex",
  });
};

const prettyCodeOptions: import("rehype-pretty-code").Options = {
  // See Options section below.
  transformers: [transformerNotationDiff(), transformerMetaHighlight()],
};

// https://astro.build/config
export default defineConfig({
  site: "https://daniel-boll.me",
  base: "/",
  trailingSlash: "always",
  integrations: [
    mdx(),
    tailwind(),
    swup({
      theme: false,
      animationClass: "transition-",
      containers: ["main"],
      smoothScrolling: true,
      cache: true,
      preload: true,
      accessibility: true,
      globalInstance: true,
    }),
    icon({
      include: {
        "material-symbols": ["*"],
        "fa6-brands": ["*"],
        "fa6-regular": ["*"],
        "fa6-solid": ["*"],
      },
    }),
    Compress({
      Image: false,
    }),
    svelte(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      remarkMath,
      remarkReadingTime,
      remarkGithubAdmonitionsToDirectives,
      remarkDirective,
      parseDirectiveNode,
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [rehypePrettyCode, prettyCodeOptions],
      [
        rehypeComponents,
        {
          components: {
            github: GithubCardComponent,
            github_profile: GithubProfileComponent,
            note: (x, y) => AdmonitionComponent(x, y, "note"),
            tip: (x, y) => AdmonitionComponent(x, y, "tip"),
            important: (x, y) => AdmonitionComponent(x, y, "important"),
            caution: (x, y) => AdmonitionComponent(x, y, "caution"),
            warning: (x, y) => AdmonitionComponent(x, y, "warning"),
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["anchor"],
          },
          content: {
            type: "element",
            tagName: "span",
            properties: {
              className: ["anchor-icon"],
              "data-pagefind-ignore": true,
            },
            children: [
              {
                type: "text",
                value: "#",
              },
            ],
          },
        },
      ],
    ],
  },
  output: "server",
  prefetch: true,
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
    functionPerRoute: false,
    // isr: true,
  }),
  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // temporarily suppress this warning
          if (
            warning.message.includes("is dynamically imported by") &&
            warning.message.includes("but also statically imported by")
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
    css: {
      preprocessorOptions: {
        stylus: {
          define: {
            oklchToHex: oklchToHex,
          },
        },
      },
    },
  },
});
