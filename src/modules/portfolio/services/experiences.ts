interface YearMonth {
  year: number;
  month: number;
}

export interface Role {
  title: string;
  start: string;
  end: string | null;
}

export interface CompanyExperience {
  company: string;
  location: string;
  roles: Role[];
}

export interface EnrichedRole extends Role {
  period: string;
  duration: string;
  isCurrent: boolean;
}

export interface EnrichedCompanyExperience {
  company: string;
  location: string;
  roles: EnrichedRole[];
  rangeLabel: string;
  companyPeriod: string;
  companyDuration: string;
  sortDate: Date;
}

const experiences: CompanyExperience[] = [
  {
    company: 'Constructor Tech',
    location: 'Belgrade, Serbia (Hybrid)',
    roles: [
      {
        title: 'Lead Frontend Developer',
        start: '2025-01',
        end: null,
      },
      {
        title: 'Senior Frontend Engineer',
        start: '2024-12',
        end: '2025-01',
      },
    ],
  },
  {
    company: 'Citrus Systems',
    location: 'Belgrade, Serbia',
    roles: [
      {
        title: 'Lead Front-End Developer',
        start: '2021-07',
        end: '2024-10',
      },
      {
        title: 'Front-End Developer',
        start: '2020-08',
        end: '2021-06',
      },
    ],
  },
  {
    company: 'Boca Tech',
    location: 'Belgrade, Serbia',
    roles: [
      {
        title: 'Front-End Web Developer',
        start: '2018-05',
        end: '2019-03',
      },
    ],
  },
];

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
});

function parseYearMonth(value: string): YearMonth {
  const [year, month] = value.split('-').map(Number);
  return { year, month };
}

function compareYearMonth(left: YearMonth, right: YearMonth) {
  if (left.year !== right.year) {
    return left.year - right.year;
  }

  return left.month - right.month;
}

function toYearMonth(value: YearMonth) {
  return `${value.year}-${String(value.month).padStart(2, '0')}`;
}

function formatPeriod(start: string, end: string | null) {
  const startParts = parseYearMonth(start);
  const startDate = new Date(startParts.year, startParts.month - 1, 1);

  if (!end) {
    return `${monthFormatter.format(startDate)} - Present`;
  }

  const endParts = parseYearMonth(end);
  const endDate = new Date(endParts.year, endParts.month - 1, 1);
  return `${monthFormatter.format(startDate)} - ${monthFormatter.format(endDate)}`;
}

function getMonthSpan(start: string, end: string | null, now: Date) {
  const startParts = parseYearMonth(start);
  const endParts = end
    ? parseYearMonth(end)
    : {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
      };

  return (
    (endParts.year - startParts.year) * 12 +
    (endParts.month - startParts.month) +
    1
  );
}

function formatDuration(months: number) {
  if (months < 12) {
    return `${months} month${months === 1 ? '' : 's'}`;
  }

  const years = Math.floor(months / 12);
  const remainder = months % 12;

  if (remainder === 0) {
    return `${years} year${years === 1 ? '' : 's'}`;
  }

  return `${years} year${years === 1 ? '' : 's'} ${remainder} month${remainder === 1 ? '' : 's'}`;
}

export function getSortedExperiences(
  sourceExperiences: CompanyExperience[] = experiences,
  now: Date = new Date(),
): EnrichedCompanyExperience[] {
  const enrichedExperiences = sourceExperiences.map((companyGroup) => {
    const sortedRoles = [...companyGroup.roles].sort((a, b) =>
      compareYearMonth(parseYearMonth(b.start), parseYearMonth(a.start)),
    );
    const starts = sortedRoles.map((role) => parseYearMonth(role.start));
    const ends = sortedRoles.map((role) =>
      role.end ? parseYearMonth(role.end) : null,
    );

    const earliestStart = starts.reduce((current, candidate) =>
      compareYearMonth(candidate, current) < 0 ? candidate : current,
    );

    const hasPresent = ends.some((entry) => entry === null);
    const latestEnd = hasPresent
      ? null
      : ends
          .filter((entry): entry is YearMonth => entry !== null)
          .reduce((current, candidate) =>
            compareYearMonth(candidate, current) > 0 ? candidate : current,
          );

    const rangeLabel = hasPresent
      ? `${earliestStart.year} - Present`
      : latestEnd && earliestStart.year !== latestEnd.year
        ? `${earliestStart.year} - ${latestEnd.year}`
        : `${earliestStart.year}`;

    const companyPeriod = formatPeriod(
      toYearMonth(earliestStart),
      latestEnd ? toYearMonth(latestEnd) : null,
    );
    const companyDuration = formatDuration(
      getMonthSpan(
        toYearMonth(earliestStart),
        latestEnd ? toYearMonth(latestEnd) : null,
        now,
      ),
    );

    return {
      ...companyGroup,
      roles: sortedRoles.map((role) => ({
        ...role,
        period: formatPeriod(role.start, role.end),
        duration: formatDuration(getMonthSpan(role.start, role.end, now)),
        isCurrent: role.end === null,
      })),
      rangeLabel,
      companyPeriod,
      companyDuration,
      sortDate: hasPresent
        ? now
        : new Date(
            (latestEnd ?? earliestStart).year,
            (latestEnd ?? earliestStart).month - 1,
            1,
          ),
    };
  });

  return [...enrichedExperiences].sort(
    (a, b) => b.sortDate.valueOf() - a.sortDate.valueOf(),
  );
}
