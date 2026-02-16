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

const LAYOUT = {
  width: 1200,
  height: 630,
  cardX: 56,
  cardY: 72,
  cardWidth: 1088,
  cardHeight: 486,
  contentX: 120,
  footerLineStartX: 120,
  footerLineEndX: 580,
  footerLineY: 520,
  footerTextY: 488,
  squareX: 920,
  squareY: 334,
  squareSize: 160,
  circleX: 995,
  circleY: 414,
  circleRadius: 35,
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

function estimateTextWidth(text, fontSize) {
  let units = 0;

  for (const char of text) {
    if (char === ' ') {
      units += 0.33;
      continue;
    }

    if (/[MW@#%&]/.test(char)) {
      units += 0.95;
      continue;
    }

    if (/[A-Z]/.test(char)) {
      units += 0.74;
      continue;
    }

    if (/[mw]/.test(char)) {
      units += 0.78;
      continue;
    }

    if (/[ijlftI1.,':;|]/.test(char)) {
      units += 0.3;
      continue;
    }

    units += 0.58;
  }

  return units * fontSize;
}

function trimToWidth(text, maxWidth, fontSize, suffix = '') {
  const suffixWidth = suffix ? estimateTextWidth(suffix, fontSize) : 0;
  const targetWidth = Math.max(0, maxWidth - suffixWidth);
  let output = '';

  for (const char of text) {
    const candidate = `${output}${char}`;
    if (estimateTextWidth(candidate, fontSize) <= targetWidth) {
      output = candidate;
      continue;
    }
    break;
  }

  const trimmed = output.trimEnd();
  if (!trimmed) {
    return suffix;
  }

  return `${trimmed}${suffix}`;
}

function wrapTextByWidth(text, maxWidth, fontSize, maxLines) {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return { lines: ['Untitled'], truncated: false };
  }

  const lines = [];
  let currentLine = '';

  for (let index = 0; index < words.length; index += 1) {
    const word = words[index];
    const candidate = currentLine ? `${currentLine} ${word}` : word;

    if (estimateTextWidth(candidate, fontSize) <= maxWidth) {
      currentLine = candidate;
      continue;
    }

    if (!currentLine) {
      if (lines.length === maxLines - 1) {
        lines.push(trimToWidth(word, maxWidth, fontSize, '...'));
        return { lines, truncated: true };
      }

      lines.push(trimToWidth(word, maxWidth, fontSize));
      currentLine = '';
      continue;
    }

    if (lines.length === maxLines - 1) {
      const remainder = [currentLine, ...words.slice(index)].join(' ');
      lines.push(trimToWidth(remainder, maxWidth, fontSize, '...'));
      return { lines, truncated: true };
    }

    lines.push(currentLine);
    currentLine = word;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return { lines, truncated: false };
}

function fitTitleWithoutTruncation({
  text,
  maxLines,
  maxWidth,
  maxFontSize,
  minFontSize,
  fontStep,
}) {
  for (
    let fontSize = maxFontSize;
    fontSize >= minFontSize;
    fontSize -= fontStep
  ) {
    const wrapped = wrapTextByWidth(text, maxWidth, fontSize, maxLines);
    if (!wrapped.truncated) {
      return { ...wrapped, fontSize };
    }
  }

  return null;
}

function fitTitle(text) {
  const twoLineFit = fitTitleWithoutTruncation({
    text,
    maxLines: 2,
    maxWidth: 760,
    maxFontSize: 74,
    minFontSize: 56,
    fontStep: 2,
  });
  if (twoLineFit) {
    return twoLineFit;
  }

  const threeLineFit = fitTitleWithoutTruncation({
    text,
    maxLines: 3,
    maxWidth: 760,
    maxFontSize: 68,
    minFontSize: 50,
    fontStep: 2,
  });
  if (threeLineFit) {
    return threeLineFit;
  }

  return {
    ...wrapTextByWidth(text, 760, 50, 3),
    fontSize: 50,
  };
}

function buildSvg({ title }) {
  const fit = fitTitle(title);
  const titleLines = fit.lines;
  const titleFontSize = fit.fontSize;
  const titleLineHeight =
    titleLines.length > 1
      ? Math.round(titleFontSize * 1.18)
      : Math.round(titleFontSize * 1.12);
  let firstTitleY = 248;
  if (titleLines.length === 1) {
    firstTitleY = 300;
  } else if (titleLines.length === 2) {
    firstTitleY = 272;
  }

  const titleSvg = titleLines
    .map(
      (line, index) =>
        `<text x="${LAYOUT.contentX}" y="${firstTitleY + index * titleLineHeight}" fill="${TOKENS.text}" font-size="${titleFontSize}" font-weight="700" font-family="Avenir Next, Segoe UI, Arial, sans-serif">${escapeXml(line)}</text>`,
    )
    .join('\n  ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${LAYOUT.width}" height="${LAYOUT.height}" viewBox="0 0 ${LAYOUT.width} ${LAYOUT.height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${LAYOUT.width}" y2="${LAYOUT.height}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${TOKENS.background}" />
      <stop offset="1" stop-color="${TOKENS.backgroundAlt}" />
    </linearGradient>
  </defs>

  <rect width="${LAYOUT.width}" height="${LAYOUT.height}" fill="url(#bg)" />
  <circle cx="190" cy="20" r="350" fill="${TOKENS.primary}" opacity="0.24" />
  <circle cx="1090" cy="580" r="310" fill="${TOKENS.info}" opacity="0.14" />

  <rect x="${LAYOUT.cardX}" y="${LAYOUT.cardY}" width="${LAYOUT.cardWidth}" height="${LAYOUT.cardHeight}" rx="28" fill="rgba(18, 18, 18, 0.46)" stroke="${TOKENS.border}" stroke-opacity="0.95" stroke-width="2" />

  <text x="${LAYOUT.contentX}" y="128" fill="${TOKENS.textMuted}" font-size="26" font-family="Avenir Next, Segoe UI, Arial, sans-serif" letter-spacing="1.2">
    PORTFOLIO / BLOG
  </text>

  ${titleSvg}

  <text x="${LAYOUT.contentX}" y="430" fill="${TOKENS.primaryLight}" font-size="42" font-weight="500" font-family="Avenir Next, Segoe UI, Arial, sans-serif">
    Blog Post
  </text>

  <line x1="${LAYOUT.footerLineStartX}" y1="${LAYOUT.footerLineY}" x2="${LAYOUT.footerLineEndX}" y2="${LAYOUT.footerLineY}" stroke="${TOKENS.border}" stroke-opacity="0.9" stroke-width="4" />
  <text x="${LAYOUT.contentX}" y="${LAYOUT.footerTextY}" fill="${TOKENS.textMuted}" font-size="28" font-family="Avenir Next, Segoe UI, Arial, sans-serif">
    todorovic.dev
  </text>

  <rect x="${LAYOUT.squareX}" y="${LAYOUT.squareY}" width="${LAYOUT.squareSize}" height="${LAYOUT.squareSize}" fill="none" stroke="${TOKENS.primaryLight}" stroke-width="2.5" />
  <circle cx="${LAYOUT.circleX}" cy="${LAYOUT.circleY}" r="${LAYOUT.circleRadius}" fill="${TOKENS.primary}" />
  <circle cx="${LAYOUT.circleX}" cy="${LAYOUT.circleY}" r="${LAYOUT.circleRadius}" fill="none" stroke="${TOKENS.info}" stroke-width="2" />
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
