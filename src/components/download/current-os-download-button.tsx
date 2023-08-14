'use client';
import Link from 'next/link';
import Icon from '@/components/download/icon';
import Button from '@/components/shared/button';
import { useClient } from '@/lib/hooks/use-client';
import { useCurrentDownloadLink } from '@/lib/hooks/use-current-download-link';
import Trans from 'next-translate/Trans';

export default function CurrentOsDownloadButton() {
  const { os } = useClient();
  const name = os?.name?.toLowerCase().replaceAll(' ', '');

  const { currentDownloadLink } = useCurrentDownloadLink();

  return (
    <>
      <Button variant={'contained'}>
        <Link className={'flex items-center'} href={currentDownloadLink || ''}>
          <div className={'mr-1 items-center max-sm:hidden md:flex'}>
            {name ? <Icon name={name.toLowerCase()} size={24} /> : null}
          </div>
          <div>
            <Trans
              i18nKey={'download:download-for'}
              values={{
                os: os?.name,
              }}
            />
          </div>
        </Link>
      </Button>
      <div className={'mt-4 flex max-sm:text-[12px] md:text-sm'}>
        <Trans
          i18nKey={'download:for-version'}
          values={{
            os: os?.name,
            version: os?.version,
          }}
        />
      </div>
    </>
  );
}
