export interface BlogTagDefinition {
  slug: string;
  label: string;
  description: string;
}

const canonicalBlogTags: BlogTagDefinition[] = [
  {
    slug: 'astro',
    label: 'Astro',
    description: 'Astro framework usage, architecture decisions, and DX notes.',
  },
  {
    slug: 'openspec',
    label: 'OpenSpec',
    description: 'Spec-first planning and OpenSpec implementation workflows.',
  },
  {
    slug: 'engineering-workflow',
    label: 'Engineering Workflow',
    description: 'Delivery process, planning loops, and execution practices.',
  },
  {
    slug: 'ai-assisted-engineering',
    label: 'AI-Assisted Engineering',
    description: 'Practical use of AI tooling in software delivery.',
  },
  {
    slug: 'delivery',
    label: 'Delivery',
    description: 'Shipping practices, release quality, and execution outcomes.',
  },
  {
    slug: 'career',
    label: 'Career',
    description: 'Career growth, leadership paths, and professional decisions.',
  },
  {
    slug: 'conferences',
    label: 'Conferences',
    description: 'Conference experiences, lessons, and takeaways.',
  },
  {
    slug: 'networking',
    label: 'Networking',
    description:
      'Building professional relationships and community visibility.',
  },
  {
    slug: 'mental-health',
    label: 'Mental Health',
    description: 'Sustainable work habits and burnout prevention.',
  },
  {
    slug: 'productivity',
    label: 'Productivity',
    description: 'Working effectively while preserving quality and focus.',
  },
  {
    slug: 'launch',
    label: 'Launch',
    description: 'Release milestones and launch-specific project updates.',
  },
];

const canonicalTagMap = new Map(
  canonicalBlogTags.map((tag) => [tag.slug, tag] as const),
);

function normalizeTagSlug(slug: string) {
  return slug.trim().toLowerCase();
}

function toTitleCaseFromSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function getCanonicalBlogTagCatalog() {
  return canonicalBlogTags;
}

export function getCanonicalBlogTag(slug: string) {
  return canonicalTagMap.get(normalizeTagSlug(slug));
}

export function isCanonicalBlogTag(slug: string) {
  return canonicalTagMap.has(normalizeTagSlug(slug));
}

export function getUnknownBlogTagSlugs(slugs: string[]) {
  const unknownSlugs = new Set<string>();

  for (const slug of slugs) {
    const normalizedSlug = normalizeTagSlug(slug);
    if (!normalizedSlug || isCanonicalBlogTag(normalizedSlug)) {
      continue;
    }
    unknownSlugs.add(normalizedSlug);
  }

  return [...unknownSlugs].sort((left, right) => left.localeCompare(right));
}

export function resolveBlogTagLabel(slug: string) {
  return getCanonicalBlogTag(slug)?.label ?? toTitleCaseFromSlug(slug);
}
