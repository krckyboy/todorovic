import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export interface SerializedBlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
  draft: boolean;
}

const areDraftsIncluded = !import.meta.env.PROD;
const featuredPostsLimit = 3;

export function isDraftVisible(isDraft: boolean) {
  return areDraftsIncluded && isDraft;
}

export async function getSortedBlogPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection(
    'blog',
    ({ data }) => areDraftsIncluded || !data.draft,
  );

  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export async function getFeaturedBlogPosts(): Promise<
  CollectionEntry<'blog'>[]
> {
  const posts = await getSortedBlogPosts();
  return posts.slice(0, featuredPostsLimit);
}

export function getBlogCategories(posts: CollectionEntry<'blog'>[]) {
  return [...new Set(posts.flatMap((post) => post.data.tags || []))].sort();
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
    draft: isDraftVisible(post.data.draft),
  }));
}
