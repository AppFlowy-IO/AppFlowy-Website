import { IVersion } from '@/lib/config/versions';

export function parseChangelog({
  version,
  headline,
  changeLog,
  publishedAt,
  url,
}: {
  version: string;
  headline: string;
  changeLog: string;
  publishedAt: string;
  url: string;
}): IVersion {
  const bodyHeadline = extractBodyHeadline(changeLog);
  const resolvedHeadline = !isGenericHeadline(bodyHeadline, version)
    ? bodyHeadline
    : !isGenericHeadline(headline, version)
      ? headline.trim()
      : '';

  const changelogJSON: IVersion = {
    version,
    headline: resolvedHeadline,
    time: publishedAt,
    image: {
      src: '',
      alt: '',
    },
    desc: '',
    content: [],
    url,
  };

  // parse image
  const image = parseImage(changeLog);

  if (image) {
    changelogJSON.image.src = image.src;
    changelogJSON.image.alt = image.alt || version;
  }

  changelogJSON.content = parseSections(changeLog);
  changelogJSON.desc = buildSummary(version, changelogJSON.content);

  return changelogJSON;
}

// A single "# ..." line at the very top of the changelog body (before the
// "## Version ..." heading) is the authored headline, e.g.:
//   # Fix for Potential Data Loss & Windows Certificate Update
//   ## Version 0.14.1 – 09/01/2026
// Existing changelogs that open with a boilerplate "# Release Notes" line are
// filtered out by isGenericHeadline below.
function extractBodyHeadline(changeLog: string): string {
  const firstLine = changeLog
    .replace(/\r\n/g, '\n')
    .split('\n')
    .find((line) => line.trim().length > 0);

  const match = firstLine?.match(/^#\s+(.*)$/);

  return match ? match[1].trim().replace(/[:.\s]+$/, '') : '';
}

// GitHub release titles default to "v0.14.1" / "0.14.1" when nobody bothers to
// write a real one, and changelog bodies often open with a boilerplate
// "Release Notes" heading. Treat both as "no headline" so we fall back to
// "AppFlowy vX.Y.Z".
function isGenericHeadline(headline: string, version: string): boolean {
  const normalized = headline.trim().toLowerCase().replace(/^v/, '');
  const genericLabels = ['release notes', 'changelog', 'release note', "what's new"];

  return (
    !normalized ||
    normalized === version.toLowerCase().replace(/^v/, '') ||
    genericLabels.includes(normalized)
  );
}

function parseImage(text: string) {
  // <img src="https://xxx.png" alt="1.0.0">
  const imgRegex = /<img.*?src=["'](https:\/\/[^"']+)["']/;
  // ![](https://xxx)
  const linkRegex = /!\[([^\]]+)\]\((https:\/\/[^)]+)\)/;
  const imgMatch = text.match(imgRegex);
  const linkMatch = text.match(linkRegex);

  // match img tag first
  if (imgMatch) {
    return {
      src: imgMatch[1],
    };
  }

  // match markdown image tag
  if (linkMatch) {
    return {
      src: linkMatch[2],
      alt: linkMatch[1],
    };
  }

  return null;
}

interface RawHeading {
  level: number;
  name: string;
  lines: string[];
}

// Splits the changelog into a flat, ordered list of Markdown headings (##/###/####)
// together with the raw lines that follow each one, up to the next heading.
function splitHeadings(text: string): RawHeading[] {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const headings: RawHeading[] = [];
  let current: RawHeading | null = null;

  for (const line of lines) {
    const match = line.match(/^(#{2,4})\s+(.*)$/);

    if (match) {
      if (current) headings.push(current);
      current = { level: match[1].length, name: match[2].trim().replace(/[:.\s]+$/, ''), lines: [] };
      continue;
    }

    current?.lines.push(line);
  }

  if (current) headings.push(current);

  return headings;
}

// Extracts change items from a heading's raw lines: bullet points if present,
// otherwise the heading's prose (e.g. a "Security Notice" paragraph) as one item.
function extractItems(lines: string[]): string[] {
  const bullets: string[] = [];
  const prose: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line || line.startsWith('<img') || line.startsWith('![')) continue;

    if (line.startsWith('- ') || line.startsWith('* ')) {
      bullets.push(stripMarkdownEmphasis(line.slice(2).trim()));
    } else {
      prose.push(line);
    }
  }

  if (bullets.length > 0) return bullets;
  if (prose.length > 0) return [stripMarkdownEmphasis(prose.join(' '))];

  return [];
}

function stripMarkdownEmphasis(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '$1');
}

// AppFlowy release notes come in two shapes:
//  - flat: "### New Features" / "### Bug Fixes" sections directly under the version heading
//  - grouped: "### Desktop" / "### Mobile" containers, each with "#### New Features" /
//    "#### Bug Fixes" children
// Both are normalized into a single, deduped list of sections keyed by section name.
function parseSections(changeLog: string): IVersion['content'] {
  const headings = splitHeadings(changeLog);
  const merged = new Map<string, { name: string; type: string; items: string[] }>();

  headings.forEach((heading, index) => {
    // Skip the release heading itself, e.g. "## Version 0.13.0 - 06/20/2026".
    if (heading.level === 2) return;

    // A level-3 heading immediately followed by a level-4 heading is a platform
    // group (Desktop/Mobile): its real content lives in the level-4 children.
    const isGroup = heading.level === 3 && headings[index + 1]?.level === 4;

    if (isGroup) return;

    const items = extractItems(heading.lines);

    if (items.length === 0) return;

    const type = heading.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const existing = merged.get(type);

    if (existing) {
      for (const item of items) {
        if (!existing.items.includes(item)) existing.items.push(item);
      }
    } else {
      merged.set(type, { name: heading.name, type, items: [...items] });
    }
  });

  return Array.from(merged.values());
}

function buildSummary(version: string, content: IVersion['content']): string {
  if (content.length === 0) return `Release notes for v${version}.`;

  const names = content.map((section) => section.name);
  const label =
    names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}` : names[0];

  return `This release includes updates to ${label}.`;
}
