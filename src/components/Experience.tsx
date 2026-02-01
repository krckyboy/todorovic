import { useState } from 'react';
import styles from './Experience.module.css';

// Types
interface Position {
  title: string;
  startDate: Date;
  endDate?: Date;
  location: string;
  achievements: string[];
}

interface Experience {
  companyName: string;
  position: Position[];
}

// Data
const experienceData: Experience[] = [
  {
    companyName: 'Citrus Systems',
    position: [
      {
        title: 'Lead Front-End Developer',
        location: 'Belgrade, Serbia',
        startDate: new Date(2021, 6),
        endDate: new Date(2024, 9),
        achievements: [
          'Successfully led the team in migrating to Next.JS (React) and Vue, resulting in improved performance and maintainability.',
          'Developed and maintained internal front-end framework used across multiple projects.',
          'Created multiple internal NPM packages, one being a library of components and logic consumed by Next.JS apps.',
        ],
      },
      {
        title: 'Front-End Developer',
        location: 'Belgrade, Serbia',
        startDate: new Date(2020, 7),
        endDate: new Date(2021, 5),
        achievements: [
          'Revamped the outdated codebase into a more streamlined, modular structure while preserving our proprietary internal front-end framework utilized across various iGaming projects.',
          'This involved extensive use of technologies such as HTML5, ES6+, SASS, and TWIG.',
        ],
      },
    ],
  },
  {
    companyName: 'Boca Tech',
    position: [
      {
        title: 'Front-End Web Developer',
        location: 'Belgrade, Serbia',
        startDate: new Date(2018, 4),
        endDate: new Date(2019, 2),
        achievements: [
          'As the sole front-end developer in my first role, I successfully executed numerous projects, including a complex appointment scheduling platform for beauty services.',
          'My contributions extended beyond coding, integrating UI/UX designs with functional requirements and managing data entries.',
        ],
      },
    ],
  },
];

// Utility functions
function formatDuration(startDate: Date, endDate?: Date): string {
  const end = endDate || new Date();
  const months =
    (end.getFullYear() - startDate.getFullYear()) * 12 +
    (end.getMonth() - startDate.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
  if (remainingMonths > 0)
    parts.push(`${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`);
  return parts.join(', ');
}

function formatDateRange(startDate: Date, endDate?: Date): string {
  const format = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  return `${format(startDate)} - ${endDate ? format(endDate) : 'present'}`;
}

export default function Experience() {
  const [activeCompany, setActiveCompany] = useState(
    experienceData[0].companyName
  );

  const activeExperience = experienceData.find(
    (exp) => exp.companyName === activeCompany
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Work Experience</h2>
      <div className={styles.container}>
        <ul className={styles.list} role="tablist" aria-label="Companies">
          {experienceData.map((exp) => (
            <li key={exp.companyName} role="presentation">
              <button
                role="tab"
                aria-selected={activeCompany === exp.companyName}
                aria-controls={`panel-${exp.companyName.replace(/\s+/g, '-')}`}
                className={`${styles.tab} ${activeCompany === exp.companyName ? styles.active : ''}`}
                onClick={() => setActiveCompany(exp.companyName)}
              >
                {exp.companyName}
              </button>
            </li>
          ))}
        </ul>
        <div
          className={styles.content}
          role="tabpanel"
          id={`panel-${activeCompany.replace(/\s+/g, '-')}`}
          aria-label={activeCompany}
        >
          {activeExperience?.position.map((pos, index) => (
            <div key={index} className={styles.position}>
              <h3 className={styles.title}>{pos.title}</h3>
              <p className={styles.duration}>
                {formatDateRange(pos.startDate, pos.endDate)} (
                {formatDuration(pos.startDate, pos.endDate)})
              </p>
              <p className={styles.location}>{pos.location}</p>
              <ul className={styles.achievements}>
                {pos.achievements.map((achievement, achievementIndex) => (
                  <li key={achievementIndex}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
