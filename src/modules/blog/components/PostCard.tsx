import type { BlogPostCardViewModel } from '../services/blogPostTypes';
import styles from './PostCard.module.css';
import TagList from './TagList';

interface Props {
  post: BlogPostCardViewModel;
}

export default function PostCard({ post }: Props) {
  return (
    <article
      className={`${styles.article} ${post.showDraftBadge ? styles.draftArticle : ''}`}
    >
      <a href={post.href} className={styles.link}>
        <h2 className={`${styles.title} u-heading-xl-semibold`}>
          {post.title}
        </h2>
      </a>
      <p className={styles.description}>{post.description}</p>
      <div className={styles.meta}>
        {post.showDraftBadge && (
          <span className={styles.draftBadge}>Draft</span>
        )}
        <time dateTime={post.pubDateIso} className={styles.date}>
          {post.formattedPubDate}
        </time>
        <TagList tags={post.tags} ariaLabel="Post tags" />
      </div>
    </article>
  );
}
