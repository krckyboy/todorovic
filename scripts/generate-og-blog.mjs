import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const blogDir = path.join(projectRoot, 'src', 'content', 'blog');
const outputDir = path.join(projectRoot, 'public', 'og', 'blog');

const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---/;
const TOKENS = {
  background: '#121212',
  backgroundAlt: '#1e1e1e',
  text: '#f5f5f5',
  textMuted: '#9ca3af',
  primary: '#f97316',
  primaryLight: '#fb923c',
  primaryDark: '#ea580c',
  border: '#404040',
  info: '#60a5fa',
};

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function getFrontmatter(content) {
  const match = content.match(FRONTMATTER_RE);
  return match ? match[1] : '';
}

function getField(frontmatter, fieldName) {
  const regex = new RegExp(`^${fieldName}:\\s*(.+)$`, 'm');
  const match = frontmatter.match(regex);

  if (!match) {
    return '';
  }

  return match[1].trim().replace(/^['"]|['"]$/g, '');
}

function wrapText(text, maxCharsPerLine, maxLines) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (candidate.length <= maxCharsPerLine) {
      currentLine = candidate;
      continue;
    }

    lines.push(currentLine);
    currentLine = word;

    if (lines.length === maxLines - 1) {
      break;
    }
  }

  if (lines.length < maxLines && currentLine) {
    lines.push(currentLine);
  }

  const consumedWords = lines.join(' ').split(/\s+/).filter(Boolean).length;
  if (consumedWords < words.length && lines.length > 0) {
    lines[lines.length - 1] = `${lines[lines.length - 1]}...`;
  }

  return lines;
}

function buildSvg({ title }) {
  const titleLines = wrapText(title, 30, 3);

  const titleSvg = titleLines
    .map(
      (line, index) =>
        `<tspan x="120" dy="${index === 0 ? 0 : 80}">${escapeXml(line)}</tspan>`,
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${TOKENS.background}" />
      <stop offset="1" stop-color="${TOKENS.backgroundAlt}" />
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="28" />
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)" />
  <circle cx="140" cy="520" r="300" fill="${TOKENS.primary}" opacity="0.24" filter="url(#soft)" />
  <circle cx="980" cy="60" r="240" fill="${TOKENS.info}" opacity="0.14" filter="url(#soft)" />

  <rect x="56" y="72" width="1088" height="486" rx="28" fill="rgba(18, 18, 18, 0.46)" stroke="${TOKENS.border}" stroke-opacity="0.95" stroke-width="2" />
  <line x1="120" y1="170" x2="580" y2="170" stroke="${TOKENS.border}" stroke-opacity="0.9" stroke-width="4" />

  <text x="120" y="128" fill="${TOKENS.textMuted}" font-size="26" font-family="Avenir Next, Segoe UI, Arial, sans-serif" letter-spacing="1.2">
    PORTFOLIO / BLOG
  </text>

  <text x="120" y="218" fill="${TOKENS.primaryLight}" font-size="40" font-weight="500" font-family="Avenir Next, Segoe UI, Arial, sans-serif">
    Blog Post
  </text>

  <text y="304" fill="${TOKENS.text}" font-size="68" font-weight="700" font-family="Avenir Next, Segoe UI, Arial, sans-serif">
    ${titleSvg}
  </text>

  <line x1="120" y1="510" x2="1080" y2="510" stroke="${TOKENS.border}" stroke-opacity="0.8" />
  <text x="120" y="548" fill="${TOKENS.textMuted}" font-size="28" font-family="Avenir Next, Segoe UI, Arial, sans-serif">
    todorovic.dev
  </text>

  <rect x="920" y="420" width="150" height="150" fill="none" stroke="${TOKENS.primaryLight}" stroke-width="2.5" />
  <circle cx="995" cy="495" r="34" fill="${TOKENS.primary}" />
  <circle cx="995" cy="495" r="34" fill="none" stroke="${TOKENS.info}" stroke-width="2" />
  <rect x="68" y="84" width="1064" height="462" fill="none" stroke="${TOKENS.primaryDark}" stroke-width="1.5" />
</svg>
`;
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });

  const entries = await fs.readdir(blogDir);
  const markdownFiles = entries.filter((entry) => entry.endsWith('.md')).sort();
  const expectedOutputFiles = new Set();

  for (const fileName of markdownFiles) {
    const slug = path.basename(fileName, '.md');
    const markdownPath = path.join(blogDir, fileName);
    const content = await fs.readFile(markdownPath, 'utf8');
    const frontmatter = getFrontmatter(content);

    const title = getField(frontmatter, 'title') || slug.replaceAll('-', ' ');
    const svg = buildSvg({
      title,
    });

    const outputFileName = `${slug}.svg`;
    const outputPath = path.join(outputDir, outputFileName);
    await fs.writeFile(outputPath, svg, 'utf8');
    expectedOutputFiles.add(outputFileName);
  }

  const existingOutputEntries = await fs.readdir(outputDir);
  for (const entry of existingOutputEntries) {
    if (!entry.endsWith('.svg')) {
      continue;
    }
    if (expectedOutputFiles.has(entry)) {
      continue;
    }
    await fs.unlink(path.join(outputDir, entry));
  }

  console.log(
    `Generated ${expectedOutputFiles.size} OG image(s) in public/og/blog.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
