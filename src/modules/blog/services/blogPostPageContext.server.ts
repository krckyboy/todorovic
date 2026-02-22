import type { CollectionEntry } from 'astro:content';

interface BuildBlogPostPageContextInput {
  post: CollectionEntry<'blog'>;
  allPosts: CollectionEntry<'blog'>[];
  site: URL;
}

interface BlogPostingJsonLd {
  '@context': 'https://schema.org';
  '@type': 'BlogPosting';
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': 'Person';
    name: string;
    url: string;
  };
}

export interface BlogPostPageContext {
  canonicalPostURL: string;
  ogImagePath: string;
  isSearchIndexable: boolean;
  shouldRenderNoindexMeta: boolean;
  prevPost: CollectionEntry<'blog'> | null;
  nextPost: CollectionEntry<'blog'> | null;
  relatedPostsExcludedSlugs: string[];
  blogPostingJsonLd: BlogPostingJsonLd;
}

export function buildBlogPostPageContext({
  post,
  allPosts,
  site,
}: BuildBlogPostPageContextInput): BlogPostPageContext {
  const currentPostIndex = allPosts.findIndex(
    (entry) => entry.slug === post.slug,
  );
  const nextPost = currentPostIndex > 0 ? allPosts[currentPostIndex - 1] : null;
  const prevPost =
    currentPostIndex >= 0 && currentPostIndex < allPosts.length - 1
      ? allPosts[currentPostIndex + 1]
      : null;
  const relatedPostsExcludedSlugs = [prevPost?.slug, nextPost?.slug].filter(
    (slug): slug is string => Boolean(slug),
  );
  const canonicalPostURL = new URL(`/blog/${post.slug}/`, site).toString();
  const ogImagePath = post.data.image?.url ?? `/og/blog/${post.slug}.svg`;

  const blogPostingJsonLd: BlogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.data.title,
    description: post.data.description,
    url: canonicalPostURL,
    datePublished: post.data.pubDate.toISOString(),
    ...(post.data.updatedDate && {
      dateModified: post.data.updatedDate.toISOString(),
    }),
    author: {
      '@type': 'Person',
      name: post.data.author,
      url: new URL('/', site).toString(),
    },
  };

  return {
    canonicalPostURL,
    ogImagePath,
    isSearchIndexable: !post.data.draft,
    shouldRenderNoindexMeta: post.data.draft,
    prevPost,
    nextPost,
    relatedPostsExcludedSlugs,
    blogPostingJsonLd,
  };
}
