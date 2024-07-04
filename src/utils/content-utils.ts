import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { getCollection } from "astro:content";

export async function getSortedPosts() {
  const allBlogPosts = await getCollection("posts", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  // Sort all posts by date
  const sorted = allBlogPosts.sort((a, b) => {
    const dateA = new Date(a.data.published);
    const dateB = new Date(b.data.published);
    return dateA > dateB ? -1 : 1;
  });

  // Handle linking within series
  const seriesMap = new Map();

  // Group posts by series
  for (const post of sorted) {
    const series = post.data.series;
    if (series) {
      if (!seriesMap.has(series)) {
        seriesMap.set(series, []);
      }
      seriesMap.get(series).push(post);
    }
  }

  // Assign next and previous posts within the same series
  for (const seriesPosts of seriesMap.values()) {
    for (let i = 1; i < seriesPosts.length; i++) {
      seriesPosts[i].data.nextSlug = seriesPosts[i - 1].slug;
      seriesPosts[i].data.nextTitle = seriesPosts[i - 1].data.title;
    }
    for (let i = 0; i < seriesPosts.length - 1; i++) {
      seriesPosts[i].data.prevSlug = seriesPosts[i + 1].slug;
      seriesPosts[i].data.prevTitle = seriesPosts[i + 1].data.title;
    }
  }

  // Assign next and previous posts for non-series posts
  sorted.forEach((post, index) => {
    if (!post.data.series) {
      if (index > 0) {
        post.data.nextSlug = sorted[index - 1].slug;
        post.data.nextTitle = sorted[index - 1].data.title;
      }
      if (index < sorted.length - 1) {
        post.data.prevSlug = sorted[index + 1].slug;
        post.data.prevTitle = sorted[index + 1].data.title;
      }
    }
  });

  return sorted;
}

export type Tag = {
  name: string;
  count: number;
};

export async function getTagList(): Promise<Tag[]> {
  const allBlogPosts = await getCollection("posts", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const countMap: { [key: string]: number } = {};
  allBlogPosts.map((post) => {
    post.data.tags.map((tag: string) => {
      if (!countMap[tag]) countMap[tag] = 0;
      countMap[tag]++;
    });
  });

  // sort tags
  const keys: string[] = Object.keys(countMap).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });

  return keys.map((key) => ({ name: key, count: countMap[key] }));
}

export type Category = {
  name: string;
  count: number;
};

export async function getCategoryList(): Promise<Category[]> {
  const allBlogPosts = await getCollection("posts", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  const count: { [key: string]: number } = {};
  allBlogPosts.map((post) => {
    if (!post.data.category) {
      const ucKey = i18n(I18nKey.uncategorized);
      count[ucKey] = count[ucKey] ? count[ucKey] + 1 : 1;
      return;
    }
    count[post.data.category] = count[post.data.category]
      ? count[post.data.category] + 1
      : 1;
  });

  const lst = Object.keys(count).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });

  const ret: Category[] = [];
  for (const c of lst) {
    ret.push({ name: c, count: count[c] });
  }
  return ret;
}

export type Series = {
  name: string;
  count: number;
};

export async function getSeriesList(): Promise<Series[]> {
  const allBlogPosts = await getCollection("posts", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  const count: { [key: string]: number } = {};
  allBlogPosts.map((post) => {
    if (!post.data.series) return;

    count[post.data.series] = count[post.data.series]
      ? count[post.data.series] + 1
      : 1;
  });

  const lst = Object.keys(count).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });

  const ret: Series[] = [];
  for (const c of lst) {
    ret.push({ name: c, count: count[c] });
  }
  return ret;
}
