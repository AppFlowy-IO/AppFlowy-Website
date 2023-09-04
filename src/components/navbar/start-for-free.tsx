import Button from '@/components/shared/button';
import * as React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ButtonProps } from '@mui/material/Button';

export function StartForFreeButton(props: ButtonProps) {
  const { t } = useTranslation();

  return (
    <Button {...props} color={'primary'} variant={'contained'}>
      <div className={'flex items-center justify-center'}>
        <div className={'mx-2 whitespace-nowrap'}>{t('button.download-for-free')}</div>
      </div>
    </Button>
  );
}
