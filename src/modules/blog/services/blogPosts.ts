import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import {
  getCanonicalBlogTag,
  getUnknownBlogTagSlugs,
  resolveBlogTagLabel,
} from './blogTags';

export interface SerializedBlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
  draft: boolean;
  archived: boolean;
}

export interface BlogTagOption {
  slug: string;
  label: string;
  description?: string;
  count: number;
  isCanonical: boolean;
}

const isProductionBuild = import.meta.env.PROD;
const featuredPostsLimit = 3;

function sortByPubDateDescending(posts: CollectionEntry<'blog'>[]) {
  return posts.sort(
    (left, right) => right.data.pubDate.valueOf() - left.data.pubDate.valueOf(),
  );
}

export function isDraftVisible(isDraft: boolean, isArchived = false) {
  return isDraft && !isArchived;
}

export async function getRoutableBlogPosts(): Promise<
  CollectionEntry<'blog'>[]
> {
  const posts = await getCollection('blog');
  const activePosts = posts.filter(({ data }) => !data.archived);
  return sortByPubDateDescending(activePosts);
}

export async function getListVisibleBlogPosts(): Promise<
  CollectionEntry<'blog'>[]
> {
  const posts = await getRoutableBlogPosts();

  if (!isProductionBuild) {
    return posts;
  }

  return posts.filter(({ data }) => !data.draft);
}

export async function getSortedBlogPosts(): Promise<CollectionEntry<'blog'>[]> {
  return getListVisibleBlogPosts();
}

export async function getFeaturedBlogPosts(): Promise<
  CollectionEntry<'blog'>[]
> {
  const posts = await getListVisibleBlogPosts();
  return posts.slice(0, featuredPostsLimit);
}

function buildBlogTagCountMap(posts: CollectionEntry<'blog'>[]) {
  const countMap = new Map<string, number>();

  for (const post of posts) {
    const uniqueTags = new Set(post.data.tags || []);
    for (const tag of uniqueTags) {
      countMap.set(tag, (countMap.get(tag) ?? 0) + 1);
    }
  }

  return countMap;
}

export function getBlogTagOptions(posts: CollectionEntry<'blog'>[]) {
  const countMap = buildBlogTagCountMap(posts);

  return [...countMap.entries()]
    .map(([slug, count]) => {
      const canonicalTag = getCanonicalBlogTag(slug);
      return {
        slug,
        label: resolveBlogTagLabel(slug),
        description: canonicalTag?.description,
        count,
        isCanonical: Boolean(canonicalTag),
      } satisfies BlogTagOption;
    })
    .sort((left, right) => {
      if (left.count !== right.count) {
        return right.count - left.count;
      }
      return left.label.localeCompare(right.label);
    });
}

export function getBlogCategories(posts: CollectionEntry<'blog'>[]) {
  return getBlogTagOptions(posts).map((tagOption) => tagOption.slug);
}

export function getUnknownBlogTags(posts: CollectionEntry<'blog'>[]) {
  return getUnknownBlogTagSlugs(posts.flatMap((post) => post.data.tags || []));
}

export function serializeBlogPosts(
  posts: CollectionEntry<'blog'>[],
): SerializedBlogPost[] {
  return posts.map((post) => ({
    slug: post.slug,
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate.toISOString(),
    tags: post.data.tags || [],
    draft: post.data.draft,
    archived: post.data.archived,
  }));
}
