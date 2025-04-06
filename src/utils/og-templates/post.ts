import satori, { type SatoriOptions } from "satori";
import type { CollectionEntry } from "astro:content";
import { OpenGraphTemplate } from "./template";
import loadGoogleFonts from "@utils/load-google-font";

export default async (post: CollectionEntry<"posts">) => {
  const options: SatoriOptions = {
    width: 600,
    height: 315,
    embedFont: true,
    fonts: await loadGoogleFonts(),
  };

  return satori(
    OpenGraphTemplate({
      date: post.data.published,
      title: post.data.title,
      description: post.data.description,
      tags: post.data.tags,
    }),
    options,
  );
};
