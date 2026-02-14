import { useState, useEffect } from "react";
import styles from "./BlogFilter.module.css";
import TagList from "./TagList";

interface Post {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
}

interface Props {
  posts: Post[];
  categories: string[];
  initialTags?: string[];
}

export default function BlogFilter({
  posts,
  categories,
  initialTags = [],
}: Props) {
  const [activeTags, setActiveTags] = useState<string[]>(initialTags);

  // Update URL when tags change
  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeTags.length > 0) {
      url.searchParams.set("tags", activeTags.join(","));
    } else {
      url.searchParams.delete("tags");
    }
    window.history.replaceState({}, "", url.toString());
  }, [activeTags]);

  // Read tags from URL on mount
  useEffect(() => {
    const url = new URL(window.location.href);
    const tagsParam = url.searchParams.get("tags");
    if (tagsParam) {
      setActiveTags(tagsParam.split(",").filter((t) => categories.includes(t)));
    }
  }, []);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const clearAll = () => setActiveTags([]);

  const filteredPosts =
    activeTags.length > 0
      ? posts.filter((post) =>
          activeTags.every((tag) => post.tags.includes(tag)),
        )
      : posts;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={styles.container}>
      <nav className={styles.categories} aria-label="Blog categories">
        <ul className={styles.tagList}>
          {categories.map((category) => {
            const isActive = activeTags.includes(category);
            return (
              <li key={category}>
                <button
                  type="button"
                  className={`${styles.tag} ${isActive ? styles.active : ""}`}
                  onClick={() => toggleTag(category)}
                  aria-pressed={isActive}
                >
                  #{category}
                </button>
              </li>
            );
          })}
        </ul>
        {activeTags.length > 0 && (
          <button type="button" className={styles.clearBtn} onClick={clearAll}>
            Clear filters
          </button>
        )}
      </nav>

      {filteredPosts.length > 0 ? (
        <div className={styles.postsList}>
          {filteredPosts.map((post) => (
            <article key={post.slug} className={styles.post}>
              <a href={`/blog/${post.slug}`} className={styles.postTitleLink}>
                <h2 className={styles.postTitle}>{post.title}</h2>
              </a>
              <p className={styles.postDescription}>{post.description}</p>
              <div className={styles.postMeta}>
                <time dateTime={post.pubDate}>{formatDate(post.pubDate)}</time>
                <TagList tags={post.tags} ariaLabel="Post tags" />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className={styles.noPosts}>
          No posts found with selected tags. Try different filters or{" "}
          <button type="button" className={styles.clearLink} onClick={clearAll}>
            clear all filters
          </button>
          .
        </p>
      )}
    </div>
  );
}
