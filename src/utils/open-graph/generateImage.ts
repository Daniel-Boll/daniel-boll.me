import sharp from "sharp";
import { readFile } from "node:fs/promises";
import satori from "satori";
import type { SatoriOptions } from "satori";
import { OpenGraphTemplate } from "./template";

export const generateOgImage = async ({
  title,
  description,
  date,
}: {
  title: string;
  description: string;
  date: Date;
}): Promise<Buffer> => {
  const options: SatoriOptions = {
    width: 600,
    height: 315,
    embedFont: true,
    fonts: [
      {
        name: "JetBrainsMono",
        data: await readFile("./public/fonts/JetBrainsMono-Bold.ttf"),
        weight: 600,
        style: "normal",
      },
      {
        name: "NotoSansJP",
        data: await readFile("./public/fonts/NotoSansJP-Bold.ttf"),
        weight: 600,
        style: "normal",
      },
    ],
  };

  const svg = await satori(
    OpenGraphTemplate({
      title,
      description,
      date,
    }),
    options
  );

  const sharpSvg = Buffer.from(svg);

  const buffer = await sharp(sharpSvg).toBuffer();

  return buffer;
};
