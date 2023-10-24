export const getAssetsPath = (filename: string = "Default Value") => {
  return `/assets/${filename.split("/assets/")[1]}`;
};

export const getOgImagePath = (filename: string = "Default Value") => {
  if (filename.startsWith("/")) filename = filename.substring(1);

  if (filename.endsWith("/"))
    filename = filename.substring(0, filename.length - 1);

  if (filename === "") filename = "Default Value";

  return `./open-graph/${filename}.png`;
};
