import { IVersion } from '@/lib/config/versions';

export function parseChangelog({
  version,
  changeLog,
  publishedAt,
  url,
}: {
  version: string;
  changeLog: string;
  publishedAt: string;
  url: string;
}): IVersion {
  const changelogJSON: IVersion = {
    version,
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

  // parse description
  const sectionsRegex = /(### [A-Za-z\s]+)([\s\S]*?)(?=\n###|$)/g;
  const sectionsMatch = changeLog.matchAll(sectionsRegex);

  let currentSection: {
    name: string;
    type: string;
    items: string[];
  } | null = null;

  // parser sections
  for (const sectionMatch of sectionsMatch) {
    const sectionText = sectionMatch[0];
    const sectionName = sectionMatch[1].slice(3);
    const sectionType = sectionName.trim().toLowerCase().replace(/\s/g, '-');

    // split lines
    const lines = sectionText.split('\n');

    if (currentSection) {
      // Finish the current section
      changelogJSON.content.push(currentSection);
    }

    currentSection = {
      name: sectionName.trim(),
      type: sectionType,
      items: [],
    };

    // parse lines
    for (let i = 1; i < lines.length; i++) {
      const item = lines[i].trim();

      if (item) {
        if (item.startsWith('<img') || item.startsWith('![')) {
          // Skip
        } else {
          currentSection.items.push(item.slice(2));
        }
      }
    }
  }

  if (currentSection) {
    // Finish the last section
    changelogJSON.content.push(currentSection);
  }

  return changelogJSON;
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
