'use client';

import React, { useEffect, useRef, useState } from 'react';
import AddCircleOutlined from '@mui/icons-material/AddCircleOutlineOutlined';
import FileOpenOutlined from '@mui/icons-material/FileOpenOutlined';
import useTranslation from 'next-translate/useTranslation';
import pageKeys from '@/data/what-is-new.json';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface VersionProps {
  image: {
    src: string;
    alt: string;
  };
  version: string;
  time: string;
  desc: string;
  update: {
    key: string;
    items: string[];
  }[];
}

const iconMap: Record<string, React.ReactNode> = {
  'new-features': (
    <AddCircleOutlined
      sx={{
        width: '18px',
        height: '18px',
      }}
    />
  ),
  'bug-fixes': (
    <AddCircleOutlined
      sx={{
        width: '18px',
        height: '18px',
      }}
      className={'rotate-[45deg]'}
    />
  ),
  'other-updates': (
    <AddCircleOutlined
      sx={{
        width: '18px',
        height: '18px',
      }}
    />
  ),
  'data-migration': (
    <FileOpenOutlined
      sx={{
        width: '18px',
        height: '18px',
      }}
    />
  ),
};

function Version({ image, version, time, desc, update }: VersionProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [showReadMore, setShowReadMore] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !listRef.current) {
      return;
    }

    const containerHeight = containerRef.current.clientHeight;
    const listHeight = listRef.current.clientHeight;

    setShowReadMore(listHeight > containerHeight);
  }, []);
  return (
    <div
      className={
        'bg-bg my-2 flex rounded-3xl border border-[var(--color-primary-divider)] p-6 max-sm:ml-6 max-sm:flex-col md:ml-24 md:flex-row'
      }
    >
      <div
        className={
          'flex aspect-auto items-center justify-between overflow-hidden rounded-3xl border border-[var(--color-primary-divider)] bg-[var(--color-bg-300)] max-sm:h-[240px] max-sm:w-[250px] md:h-[470px] md:w-[510px]'
        }
      >
        <img className={'object-contain'} src={image.src} alt={image.alt} />
      </div>
      <div
        className={`flex flex-1 flex-col max-sm:ml-0 max-sm:mt-6 max-sm:px-0 md:ml-8 md:mt-0 md:px-8 ${
          showMore ? 'md:min-h-[470px]' : 'md:h-[470px]'
        }`}
      >
        <div className={'pt-3 text-[24px] font-medium leading-[26px]'}>
          {time} - v{version}
        </div>
        <p className={'mt-4'}>
          <span className={'text-primary'}>v{version}</span> {desc}
        </p>
        <div ref={containerRef} className={`relative mt-4 flex-1 ${showMore ? '' : 'md:overflow-hidden'} pt-3`}>
          <div ref={listRef}>
            {update.map((item) => (
              <div key={item.key} className={'py-3'}>
                <div className={'flex items-center font-bold'}>
                  <span className={'text-primary mr-2 '}>{iconMap[item.key]}</span>
                  {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    t(pageKeys[item.key])
                  }
                </div>
                <div className={'mt-3 pl-1'}>
                  {item.items.map((item, index) => (
                    <div key={index} className={'flex py-1'}>
                      <li />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {showReadMore && (
            <div className={'absolute bottom-0 left-0 h-[105px] w-full'}>
              <div
                style={{
                  background: 'var(--linear-gradient-blur-100)',
                }}
                className={'text-primary flex h-full w-full items-end py-4'}
              >
                <button
                  onClick={() => {
                    setShowMore(true);
                    setShowReadMore(false);
                  }}
                  className={'p-0'}
                >
                  {t(pageKeys['read-more'])}
                  <ExpandMoreIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Version;
