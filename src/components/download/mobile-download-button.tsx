'use client';

import Button from '@/components/shared/button';
import Link from 'next/link';
import { useClient } from '@/lib/hooks/use-client';
import Trans from 'next-translate/Trans';
import data from '@/data/download.json';
import Apple from '@mui/icons-material/Apple';
import Google from '@mui/icons-material/Shop';

const { links } = data;

export default function MobileDownloadButton() {
  const { device, isMobile } = useClient();

  const isIPhone = isMobile && device?.model === 'iPhone';

  return (
    <div className={'flex flex-row max-sm:mb-16 md:mb-24'}>
      {isIPhone || !isMobile ? (
        <Button className={'mr-4'} color={'primary'} variant={'outlined'} disabled>
          <Link className={'flex items-center'} href={links['app-store']}>
            <Apple className={'mr-2'} />
            <Trans i18nKey={'button.app-store'} />
          </Link>
        </Button>
      ) : null}
      {!isIPhone || !isMobile ? (
        <Button color={'primary'} variant={'outlined'} disabled>
          <Link className={'flex items-center'} href={links['google-play']}>
            <Google className={'mr-2'} />
            <Trans i18nKey={'button.google-play'} />
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
