import { isDraftVisible } from './blogPostPolicy';
import type { BlogPostCardViewModel } from './blogPostTypes';

interface BlogPostCardInput {
  slug: string;
  title: string;
  description: string;
  pubDate: string | Date;
  tags: string[];
  draft: boolean;
  archived: boolean;
}

function toDate(dateValue: string | Date) {
  return dateValue instanceof Date ? dateValue : new Date(dateValue);
}

function formatBlogDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function buildBlogPostCardViewModel(
  post: BlogPostCardInput,
): BlogPostCardViewModel {
  const date = toDate(post.pubDate);

  return {
    slug: post.slug,
    href: `/blog/${post.slug}`,
    title: post.title,
    description: post.description,
    pubDateIso: date.toISOString(),
    formattedPubDate: formatBlogDate(date),
    tags: post.tags,
    showDraftBadge: isDraftVisible(post.draft, post.archived),
  };
}
