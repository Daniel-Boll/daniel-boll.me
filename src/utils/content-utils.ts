import { getCollection, type CollectionEntry } from 'astro:content'
import I18nKey from '@i18n/i18nKey'
import { i18n } from '@i18n/translation'

/** Newest first. */
export async function getSortedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const allBlogPosts = await getCollection('posts', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })

  /*
   * The previous comparator was `dateA > dateB ? -1 : 1`, which never returns 0. That is
   * an inconsistent comparator: for two posts sharing a `published` date it always claims
   * `a` sorts after `b`, so the final order depended on the order `getCollection()`
   * happened to return. Two posts here do share a date (2023-01-20), so their relative
   * order silently changed when the collection loader changed.
   *
   * Tie-break on `id` so the order is deterministic regardless of loader behaviour.
   * Give posts distinct `published` dates if you want a specific order between them.
   */
  return allBlogPosts.sort((a, b) => {
    const delta =
      new Date(b.data.published).getTime() - new Date(a.data.published).getTime()
    if (delta !== 0) return delta
    return a.id.localeCompare(b.id)
  })
}

export type AdjacentPost = {
  id: string
  title: string
}

/**
 * Neighbours of `index` in a newest-first list.
 * `next` is the newer post, `prev` the older one — matching the previous behaviour.
 *
 * Derived on read rather than written back onto `entry.data`: under the Content
 * Layer API entries come from a persisted data store, so mutating `.data` after
 * `getCollection()` is not supported.
 */
export function getAdjacentPosts(
  posts: CollectionEntry<'posts'>[],
  index: number,
): { prev: AdjacentPost | null; next: AdjacentPost | null } {
  const toAdjacent = (post?: CollectionEntry<'posts'>): AdjacentPost | null =>
    post ? { id: post.id, title: post.data.title } : null

  return {
    next: index > 0 ? toAdjacent(posts[index - 1]) : null,
    prev: index < posts.length - 1 ? toAdjacent(posts[index + 1]) : null,
  }
}

export type Tag = {
  name: string
  count: number
}

export async function getTagList(): Promise<Tag[]> {
  const allBlogPosts = await getCollection<'posts'>('posts', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })

  const countMap: { [key: string]: number } = {}
  allBlogPosts.map((post: { data: { tags: string[] } }) => {
    post.data.tags.map((tag: string) => {
      if (!countMap[tag]) countMap[tag] = 0
      countMap[tag]++
    })
  })

  // sort tags
  const keys: string[] = Object.keys(countMap).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })

  return keys.map(key => ({ name: key, count: countMap[key] }))
}

export type Category = {
  name: string
  count: number
}

export async function getCategoryList(): Promise<Category[]> {
  const allBlogPosts = await getCollection<'posts'>('posts', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })
  const count: { [key: string]: number } = {}
  allBlogPosts.map((post: { data: { category: string | number } }) => {
    if (!post.data.category) {
      const ucKey = i18n(I18nKey.uncategorized)
      count[ucKey] = count[ucKey] ? count[ucKey] + 1 : 1
      return
    }
    count[post.data.category] = count[post.data.category]
      ? count[post.data.category] + 1
      : 1
  })

  const lst = Object.keys(count).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })

  const ret: Category[] = []
  for (const c of lst) {
    ret.push({ name: c, count: count[c] })
  }
  return ret
}
