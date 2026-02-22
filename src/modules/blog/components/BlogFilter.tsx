import { useEffect, useMemo, useState } from 'react';
import {
  applyActiveTagsToUrl,
  buildAvailableTagSlugSet,
  buildBlogTagViewModel,
  filterPostsByActiveTags,
  keepKnownTags,
  resolveInitialActiveTags,
  toggleTag,
} from '../services/blogFilter';
import type { BlogTagOption, SerializedBlogPost } from '../services/blogPosts';
import styles from './BlogFilter.module.css';
import PostCard from './PostCard';

interface Props {
  posts: SerializedBlogPost[];
  tagOptions: BlogTagOption[];
  initialTags?: string[];
}

const tagListId = 'blog-filter-tag-list';
const emptyTags: string[] = [];

function areTagsEqual(left: string[], right: string[]) {
  if (left.length !== right.length) {
    return false;
  }

  return left.every((tag, index) => tag === right[index]);
}

export default function BlogFilter({ posts, tagOptions, initialTags }: Props) {
  const resolvedInitialTags = initialTags ?? emptyTags;

  const availableTagSlugs = useMemo(
    () => buildAvailableTagSlugSet(tagOptions),
    [tagOptions],
  );

  const [activeTags, setActiveTags] = useState<string[]>(() =>
    resolveInitialActiveTags({
      initialTags: resolvedInitialTags,
      tagsParam: null,
      availableTagSlugs,
    }),
  );
  const [isUrlSyncComplete, setIsUrlSyncComplete] = useState(false);
  const [tagQuery, setTagQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const resolvedTags = resolveInitialActiveTags({
      initialTags: resolvedInitialTags,
      tagsParam: url.searchParams.get('tags'),
      availableTagSlugs,
    });

    setActiveTags((previousTags) =>
      areTagsEqual(previousTags, resolvedTags) ? previousTags : resolvedTags,
    );
    setIsUrlSyncComplete(true);
  }, [resolvedInitialTags, availableTagSlugs]);

  useEffect(() => {
    setActiveTags((previousTags) => {
      const normalizedTags = keepKnownTags(previousTags, availableTagSlugs);
      return areTagsEqual(previousTags, normalizedTags)
        ? previousTags
        : normalizedTags;
    });
  }, [availableTagSlugs]);

  // Update URL when tags change
  useEffect(() => {
    if (!isUrlSyncComplete) {
      return;
    }

    const url = new URL(window.location.href);
    applyActiveTagsToUrl(url, activeTags);
    window.history.replaceState({}, '', url.toString());
  }, [activeTags, isUrlSyncComplete]);

  useEffect(() => {
    setIsExpanded(false);
  }, [tagQuery]);

  const handleToggleTag = (tag: string) => {
    setActiveTags((previousTags) => toggleTag(previousTags, tag));
  };

  const clearAll = () => setActiveTags([]);
  const {
    normalizedTagQuery,
    isTagSearchVisible,
    filteredTagOptions,
    shouldCollapseTags,
    visibleTagOptions,
    hiddenTagCount,
  } = buildBlogTagViewModel({
    tagOptions,
    tagQuery,
    isExpanded,
  });

  const filteredPosts = filterPostsByActiveTags(posts, activeTags);

  return (
    <div className={styles.container}>
      <nav className={styles.categories} aria-label="Blog categories">
        <div className={styles.filterHeader}>
          <h2 className={styles.filterTitle}>Filter posts by tag</h2>
          {activeTags.length > 0 && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={clearAll}
            >
              Clear filters
            </button>
          )}
        </div>

        {isTagSearchVisible && (
          <div className={styles.tagSearch}>
            <label htmlFor="blog-tag-search" className="visually-hidden">
              Search tags
            </label>
            <input
              id="blog-tag-search"
              type="search"
              className={styles.tagSearchInput}
              placeholder="Search tags"
              value={tagQuery}
              onChange={(event) => setTagQuery(event.target.value)}
            />
          </div>
        )}

        <ul id={tagListId} className={styles.tagList}>
          {visibleTagOptions.map((tagOption) => {
            const isActive = activeTags.includes(tagOption.slug);
            return (
              <li key={tagOption.slug}>
                <button
                  type="button"
                  className={`${styles.tag} ${isActive ? styles.active : ''}`}
                  onClick={() => handleToggleTag(tagOption.slug)}
                  aria-pressed={isActive}
                  title={tagOption.description}
                >
                  <span>{`#${tagOption.slug}`}</span>
                  <span className={styles.tagCount}>{tagOption.count}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {shouldCollapseTags && (
          <button
            type="button"
            className={styles.showMoreBtn}
            onClick={() => setIsExpanded((previousValue) => !previousValue)}
            aria-controls={tagListId}
            aria-expanded={isExpanded}
          >
            {isExpanded
              ? 'Show fewer tags'
              : `Show ${hiddenTagCount} more tags`}
          </button>
        )}

        {normalizedTagQuery && filteredTagOptions.length === 0 && (
          <p className={styles.noTagMatches}>
            {`No tags match "${tagQuery.trim()}".`}
          </p>
        )}
      </nav>

      {filteredPosts.length > 0 ? (
        <div className={styles.postsList}>
          {filteredPosts.map((post) => (
            <PostCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              description={post.description}
              pubDate={post.pubDate}
              tags={post.tags}
              isDraft={post.draft && !post.archived}
            />
          ))}
        </div>
      ) : (
        <p className={styles.noPosts}>
          {'No posts found with selected tags. Try different filters or '}
          <button type="button" className={styles.clearLink} onClick={clearAll}>
            clear all filters
          </button>
          .
        </p>
      )}
    </div>
  );
}
