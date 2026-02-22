import type { CollectionEntry } from 'astro:content';
import { buildBlogPostCardViewModel } from './blogPostCardViewModel';

export function presentServerBlogPostCard(post: CollectionEntry<'blog'>) {
  return buildBlogPostCardViewModel({
    slug: post.slug,
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate,
    tags: post.data.tags || [],
    draft: post.data.draft,
    archived: post.data.archived,
  });
}
