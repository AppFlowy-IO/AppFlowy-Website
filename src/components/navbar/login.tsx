import useTranslation from 'next-translate/useTranslation';
import Button from '@/components/shared/button';
import * as React from 'react';
import { ButtonProps } from '@mui/material/Button';
import ArrowOutward from '@mui/icons-material/ArrowOutward';

export default function LoginButton(props: ButtonProps) {
  const { t } = useTranslation();

  return (
    <Button {...props} color={'primary'} variant={'outlined'}>
      <div className={'flex items-center justify-center'}>
        <div className={'mx-2'}>{t('button.login')}</div>
        <ArrowOutward />
      </div>
    </Button>
  );
}
