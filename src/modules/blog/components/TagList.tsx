import styles from './TagList.module.css';

interface Props {
  tags: string[];
  ariaLabel?: string;
}

export default function TagList({ tags, ariaLabel = 'Tags' }: Props) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className={styles.list} aria-label={ariaLabel}>
      {tags.map((tag) => (
        <li key={tag} className={styles.item}>
          <a
            href={`/blog?tags=${encodeURIComponent(tag)}`}
            className={styles.link}
          >
            {tag}
          </a>
        </li>
      ))}
    </ul>
  );
}
