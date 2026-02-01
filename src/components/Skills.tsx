import { useState } from 'react';
import SkillSection from './SkillSection';
import type { Skill } from './SkillSection';

const techSkillsData: Skill[] = [
  {
    title: 'React',
    content: [
      'Utilizing React daily for both server and client components.',
      'Optimizing with useMemo and useCallback hooks when applicable.',
      'Leveraging context API for state management between components.',
    ],
  },
  {
    title: 'Next.js',
    content: [
      'Developing applications with server-side rendering (SSR) and static site generation (SSG) for performance and SEO benefits.',
      'Additionally, I have experience with building static websites using the next export option.',
    ],
  },
  {
    title: 'Redux',
    content: [
      'Managing global state with Redux for predictable updates and efficient communication between components.',
    ],
  },
  {
    title: 'SASS',
    content: [
      'Writing modular SASS stylesheets using mixins and functions for maintainability and scalability.',
    ],
  },
  {
    title: 'CSS Modules',
    content: [
      'Implementing CSS Modules for local scope and component-specific styles.',
    ],
  },
];

const softSkillsData: Skill[] = [
  {
    title: 'Communication',
    content: [
      'Effectively communicating with cross-functional teams to coordinate on project milestones and deliverables.',
      'Clear communication helps resolve conflicts and ensures alignment on goals.',
    ],
  },
  {
    title: 'Delegation',
    content: [
      'Efficiently delegating tasks based on team member availability and expertise, resulting in timely completion of projects and increased team morale.',
    ],
  },
  {
    title: 'Initiative',
    content: [
      'Encouraging initiative within the team by providing opportunities for innovation, which leads to the development of new features and processes that enhance our workflow.',
    ],
  },
  {
    title: 'Leadership',
    content: [
      'Leading a team through the recruitment process, selecting candidates who share our vision and values, resulting in a cohesive and dedicated team that contributes to the success of our projects.',
    ],
  },
  {
    title: 'Problem Solving',
    content: [
      'Solving complex issues by applying analytical thinking and creativity, leading to the successful implementation of critical features and the resolution of major challenges faced by the team.',
    ],
  },
];

export default function Skills() {
  const [activeTech, setActiveTech] = useState(techSkillsData[0].title);
  const [activeSoft, setActiveSoft] = useState(softSkillsData[0].title);

  return (
    <>
      <SkillSection
        title="Technical Skills"
        skills={techSkillsData}
        activeSkill={activeTech}
        setActiveSkill={setActiveTech}
      />
      <SkillSection
        title="Soft Skills"
        skills={softSkillsData}
        activeSkill={activeSoft}
        setActiveSkill={setActiveSoft}
      />
    </>
  );
}
