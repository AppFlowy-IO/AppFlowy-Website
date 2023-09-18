'use client';
import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import NewFeature from '@/components/icons/new-feature';
import BugFixes from '@/components/icons/bug-fixes';
import DataMigration from '@/components/icons/data-migration';
import { IVersion } from '@/lib/config/versions';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import ExpandMore from '@/components/icons/expand-more';
import Link from 'next/link';
import defaultImage from '@/assets/images/versions/default.png';

dayjs.extend(LocalizedFormat);
const iconMap: Record<string, React.ReactNode> = {
  'new-features': <NewFeature />,
  'bug-fixes': <BugFixes />,
  'other-updates': <NewFeature />,
  'data-migration': <DataMigration />,
};

function Version({ version }: { version: IVersion }) {
  const ref = useRef<HTMLDivElement>(null);
  const [showReadMore, setShowReadMore] = useState(false);

  useEffect(() => {
    const container = ref.current;

    if (!container) return;
    const imageEl = container.querySelector('.image');
    const releaseInfoEl = container.querySelector('.release-info');

    if (!imageEl || !releaseInfoEl) return;
    setShowReadMore(imageEl.clientHeight < releaseInfoEl.clientHeight);
  }, []);

  return (
    <div ref={ref} className={'version-panel'}>
      <div className={'image'}>
        <img src={version.image.src || defaultImage.src} alt={version.image.alt} width={470} height={424} />
      </div>
      <div className={'release-wrap'}>
        <div className={'release-info'}>
          <div className={'release-time'}>
            {dayjs(version.time).format('LL')} - v{version.version}
          </div>
          <div className={'release-desc'}>
            <Link href={version.url} target={'_blank'}>
              <span className={'text-primary'}>v{version.version} </span>
            </Link>

            {version.desc}
          </div>
          <div className={'release-update-infos'}>
            {version.content.map((updateItem) => (
              <div key={updateItem.name} className={'update-item'}>
                <div className={'update-type'}>
                  {iconMap[updateItem.type]}
                  {updateItem.name}
                </div>
                <div className={'update-infos'}>
                  {updateItem.items.map((item, index) => (
                    <div key={index} className={'update-info'}>
                      <div>{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {showReadMore && (
            <div
              className={'read-more'}
              onClick={(e) => {
                const container = ref.current;
                const releaseInfoEl = container?.querySelector('.release-wrap') as HTMLDivElement;

                releaseInfoEl.style.height = 'auto';
                (e.currentTarget as HTMLDivElement).remove();
              }}
            >
              Read more <ExpandMore />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Version;
