type HastProperties = Record<string, unknown>;

interface HastNode {
  type?: string;
  tagName?: string;
  properties?: HastProperties;
  children?: unknown[];
}

interface RehypeExternalLinksOptions {
  siteOrigin?: string;
}

function isExternalHttpUrl(href: unknown, siteOrigin: string): boolean {
  if (typeof href !== 'string' || href.length === 0) {
    return false;
  }

  if (
    href.startsWith('#') ||
    href.startsWith('/') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return false;
  }

  let resolved: URL;
  try {
    resolved = new URL(href, siteOrigin);
  } catch {
    return false;
  }

  return (
    (resolved.protocol === 'http:' || resolved.protocol === 'https:') &&
    resolved.origin !== siteOrigin
  );
}

function ensureRelValues(properties: HastProperties): void {
  const existing = properties.rel;
  const current =
    typeof existing === 'string'
      ? existing.split(/\s+/).filter(Boolean)
      : Array.isArray(existing)
        ? existing.filter((value): value is string => typeof value === 'string')
        : [];

  const merged = new Set([...current, 'noopener', 'noreferrer']);
  properties.rel = Array.from(merged).join(' ');
}

function walk(node: unknown, siteOrigin: string): void {
  if (!node || typeof node !== 'object') {
    return;
  }

  const currentNode = node as HastNode;

  if (currentNode.type === 'element' && currentNode.tagName === 'a') {
    const properties = currentNode.properties ?? {};
    const { href } = properties;

    if (isExternalHttpUrl(href, siteOrigin)) {
      properties.target = '_blank';
      ensureRelValues(properties);
      currentNode.properties = properties;
    }
  }

  const children = Array.isArray(currentNode.children)
    ? currentNode.children
    : [];
  for (const child of children) {
    walk(child, siteOrigin);
  }
}

export default function rehypeExternalLinks(
  options: RehypeExternalLinksOptions = {},
) {
  const siteOrigin = options.siteOrigin ?? 'https://todorovic.dev';

  return function transform(tree: unknown): void {
    walk(tree, siteOrigin);
  };
}
