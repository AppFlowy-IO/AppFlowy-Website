import React from 'react';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import Link from 'next/link';
import { IVersion } from '@/lib/config/versions';

dayjs.extend(LocalizedFormat);

const sectionIcons: Record<string, string> = {
  'new-features': '🚀',
  improvements: '💎',
  'bug-fixes': '🛠️',
  'data-migration': '🗃️',
  'other-updates': '✨',
};

const DEFAULT_SECTION_ICON = '📌';

const tagLabels: Record<string, string> = {
  'new-features': 'New Feature',
  improvements: 'Improvement',
  'bug-fixes': 'Bug Fixes',
  'data-migration': 'Data Migration',
  'other-updates': 'Update',
};

function Version({ version }: { version: IVersion }) {
  return (
    <div className={'version-panel'}>
      <div className={'version-meta'}>
        <Link href={version.url} target={'_blank'} className={'version-title'}>
          {version.headline || `AppFlowy v${version.version}`}
        </Link>
        <div className={'version-date'}>{dayjs(version.time).format('LL')}</div>
        <div className={'version-tags'}>
          <span className={'tag tag-version'}>v{version.version}</span>
          {version.content.map((section) => (
            <span key={section.type} className={'tag tag-type'}>
              {tagLabels[section.type] || section.name}
            </span>
          ))}
        </div>
      </div>
      <div className={'version-body'}>
        {version.image.src && (
          <div className={'version-image'}>
            <img src={version.image.src} alt={version.image.alt} width={940} height={480} />
          </div>
        )}
        {version.desc && <div className={'version-desc'}>{version.desc}</div>}
        <div className={'version-sections'}>
          {version.content.map((section) => (
            <div key={section.type} className={'version-section'}>
              <div className={'section-heading'}>
                <span className={'section-icon'}>{sectionIcons[section.type] || DEFAULT_SECTION_ICON}</span>
                {section.name}
              </div>
              <div className={'section-items'}>
                {section.items.map((item, index) => (
                  <div key={index} className={'section-item'}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Version;
