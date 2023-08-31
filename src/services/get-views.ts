const client = new Map<string, number>();

export const getViewsBySlug = async (slug?: string): Promise<number> => {
  if (!slug) return 0;

  const views = client.get(slug) || 0;
  client.set(slug, views + 1);
  return views;
};
