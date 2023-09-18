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

  const sectionsRegex = /(### [A-Za-z\s]+)([\s\S]*?)(?=\n###|$)/g;
  const sectionsMatch = changeLog.matchAll(sectionsRegex);

  let currentSection: {
    name: string;
    type: string;
    items: string[];
  } | null = null;

  for (const sectionMatch of sectionsMatch) {
    const sectionText = sectionMatch[0];
    const sectionName = sectionMatch[1].slice(3);
    const sectionType = sectionName.trim().toLowerCase().replace(/\s/g, '-');

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

    const imgRegex = /<img.*?src=["'](https:\/\/[^"']+)["']/;
    const imgMatch = changeLog.match(imgRegex);

    if (imgMatch) {
      changelogJSON.image.src = imgMatch[1];
      changelogJSON.image.alt = changelogJSON.version;
    }

    for (let i = 1; i < lines.length; i++) {
      const item = lines[i].trim();

      if (item) {
        if (item.startsWith('<img')) {
          // Skip
        } else if (item.startsWith('![')) {
          const linkRegex = /\[([^\]]+)\]\((https:\/\/[^)]+)\)/;
          const imgMatch = item.match(linkRegex);

          if (imgMatch) {
            changelogJSON.image.src = imgMatch[2];
            changelogJSON.image.alt = imgMatch[1];
          }
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
