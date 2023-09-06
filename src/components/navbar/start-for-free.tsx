import Button from '@/components/shared/button';
import * as React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ButtonProps } from '@mui/material/Button';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function StartForFreeButton(props: ButtonProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const onDownloadClick = useCallback(() => {
    router.push('/download');
  }, [router]);

  return (
    <Button {...props} onClick={onDownloadClick} color={'primary'} variant={'contained'}>
      <div className={'flex items-center justify-center'}>
        <div className={'mx-2 whitespace-nowrap'}>{t('button.download-for-free')}</div>
      </div>
    </Button>
  );
}
