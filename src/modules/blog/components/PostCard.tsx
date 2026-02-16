import styles from './PostCard.module.css';
import TagList from './TagList';

interface Props {
  slug: string;
  title: string;
  description: string;
  pubDate: string | Date;
  tags: string[];
}

export default function PostCard({
  slug,
  title,
  description,
  pubDate,
  tags,
}: Props) {
  const date = pubDate instanceof Date ? pubDate : new Date(pubDate);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className={styles.article}>
      <a href={`/blog/${slug}`} className={styles.link}>
        <h2 className={`${styles.title} u-heading-xl-semibold`}>{title}</h2>
      </a>
      <p className={styles.description}>{description}</p>
      <div className={styles.meta}>
        <time dateTime={date.toISOString()} className={styles.date}>
          {formattedDate}
        </time>
        <TagList tags={tags} ariaLabel="Post tags" />
      </div>
    </article>
  );
}
