import type { BlogTagOption } from './blogPosts';
import type { SerializedBlogPost } from './blogPostTypes';

export const tagSearchThreshold = 12;
export const collapsedVisibleTagCount = 10;

export interface BlogTagViewModel {
  normalizedTagQuery: string;
  isTagSearchVisible: boolean;
  filteredTagOptions: BlogTagOption[];
  shouldCollapseTags: boolean;
  visibleTagOptions: BlogTagOption[];
  hiddenTagCount: number;
}

export function buildAvailableTagSlugSet(tagOptions: BlogTagOption[]) {
  return new Set(tagOptions.map((tagOption) => tagOption.slug));
}

export function keepKnownTags(tags: string[], availableTagSlugs: Set<string>) {
  return tags.filter((tag) => availableTagSlugs.has(tag));
}

export function parseTagsParam(tagsParam: string) {
  return tagsParam
    .split(',')
    .map((tag) => {
      try {
        return decodeURIComponent(tag);
      } catch {
        return tag;
      }
    })
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function resolveInitialActiveTags({
  initialTags,
  tagsParam,
  availableTagSlugs,
}: {
  initialTags: string[];
  tagsParam: string | null;
  availableTagSlugs: Set<string>;
}) {
  if (!tagsParam) {
    return keepKnownTags(initialTags, availableTagSlugs);
  }

  return keepKnownTags(parseTagsParam(tagsParam), availableTagSlugs);
}

export function applyActiveTagsToUrl(url: URL, activeTags: string[]) {
  if (activeTags.length > 0) {
    url.searchParams.set('tags', activeTags.join(','));
    return;
  }

  url.searchParams.delete('tags');
}

export function toggleTag(activeTags: string[], tag: string) {
  if (activeTags.includes(tag)) {
    return activeTags.filter((existingTag) => existingTag !== tag);
  }

  return [...activeTags, tag];
}

export function buildBlogTagViewModel({
  tagOptions,
  tagQuery,
  isExpanded,
}: {
  tagOptions: BlogTagOption[];
  tagQuery: string;
  isExpanded: boolean;
}): BlogTagViewModel {
  const normalizedTagQuery = tagQuery.trim().toLowerCase();
  const isTagSearchVisible = tagOptions.length > tagSearchThreshold;
  const filteredTagOptions = normalizedTagQuery
    ? tagOptions.filter(
        ({ slug, label }) =>
          slug.toLowerCase().includes(normalizedTagQuery) ||
          label.toLowerCase().includes(normalizedTagQuery),
      )
    : tagOptions;

  const shouldCollapseTags =
    !normalizedTagQuery && filteredTagOptions.length > tagSearchThreshold;
  const visibleTagOptions =
    shouldCollapseTags && !isExpanded
      ? filteredTagOptions.slice(0, collapsedVisibleTagCount)
      : filteredTagOptions;
  const hiddenTagCount = Math.max(
    filteredTagOptions.length - visibleTagOptions.length,
    0,
  );

  return {
    normalizedTagQuery,
    isTagSearchVisible,
    filteredTagOptions,
    shouldCollapseTags,
    visibleTagOptions,
    hiddenTagCount,
  };
}

export function filterPostsByActiveTags(
  posts: SerializedBlogPost[],
  activeTags: string[],
) {
  if (activeTags.length === 0) {
    return posts;
  }

  return posts.filter((post) =>
    activeTags.every((tag) => post.tags.includes(tag)),
  );
}
