import styles from './Skills.module.css';

interface Skill {
  title: string;
  content: string[];
}

interface Props {
  title: string;
  skills: Skill[];
  activeSkill: string;
  setActiveSkill: (skill: string) => void;
}

export default function SkillSection({
  title,
  skills,
  activeSkill,
  setActiveSkill,
}: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list} role="tablist" aria-label={title}>
        {skills.map((skill) => (
          <li key={skill.title}>
            <button
              role="tab"
              aria-selected={activeSkill === skill.title}
              aria-controls={`${skill.title.toLowerCase().replace(/\s+/g, '-')}-panel`}
              className={`${styles.tab} ${activeSkill === skill.title ? styles.active : ''}`}
              onClick={() => setActiveSkill(skill.title)}
            >
              {skill.title}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.content}>
        {skills.map((skill) => (
          <div
            key={skill.title}
            id={`${skill.title.toLowerCase().replace(/\s+/g, '-')}-panel`}
            role="tabpanel"
            aria-labelledby={skill.title}
            className={`${styles.item} ${activeSkill === skill.title ? styles.active : ''}`}
          >
            <ul className={styles.listContent}>
              {skill.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export type { Skill };
