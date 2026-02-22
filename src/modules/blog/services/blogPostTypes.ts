export interface SerializedBlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
  draft: boolean;
  archived: boolean;
}

export interface BlogPostCardViewModel {
  slug: string;
  href: string;
  title: string;
  description: string;
  pubDateIso: string;
  formattedPubDate: string;
  tags: string[];
  showDraftBadge: boolean;
}
