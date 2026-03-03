interface MdNode {
  type?: string;
  meta?: string;
  data?: {
    hName?: string;
    hProperties?: Record<string, unknown>;
  };
  children?: unknown[];
}

interface ParsedCodeFenceTitle {
  title: string;
  token: string;
}

const titlePattern = /(?:^|\s)title=(?:"([^"]+)"|'([^']+)'|(\S+))/;

function parseCodeFenceTitle(meta: unknown): ParsedCodeFenceTitle | null {
  if (typeof meta !== 'string' || meta.length === 0) {
    return null;
  }

  const match = titlePattern.exec(meta);
  if (!match) {
    return null;
  }

  const title = match[1] ?? match[2] ?? match[3];
  if (!title) {
    return null;
  }

  return {
    title,
    token: match[0],
  };
}

function walk(node: unknown): void {
  if (!node || typeof node !== 'object') {
    return;
  }

  const currentNode = node as MdNode;
  const children = Array.isArray(currentNode.children)
    ? currentNode.children
    : [];

  for (let index = 0; index < children.length; index += 1) {
    const child = children[index];

    if (child && typeof child === 'object') {
      const childNode = child as MdNode;

      if (childNode.type === 'code' && typeof childNode.meta === 'string') {
        const parsed = parseCodeFenceTitle(childNode.meta);

        if (parsed) {
          const cleanedMeta = childNode.meta.replace(parsed.token, '').trim();
          childNode.meta = cleanedMeta.length > 0 ? cleanedMeta : undefined;

          const titleNode: MdNode = {
            type: 'paragraph',
            data: {
              hName: 'p',
              hProperties: {
                className: ['code-snippet-title'],
              },
            },
            children: [
              {
                type: 'inlineCode',
                value: parsed.title,
              },
            ],
          };

          children.splice(index, 0, titleNode);
          index += 1;
        }
      }
    }

    walk(child);
  }
}

export default function remarkCodeFenceTitles() {
  return function transform(tree: unknown): void {
    walk(tree);
  };
}
