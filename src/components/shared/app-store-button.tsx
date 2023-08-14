import React, { MouseEvent } from 'react';
import Button from '@/components/shared/button';
import useTranslation from 'next-translate/useTranslation';

function AppStoreButton({
  className = '',
  onClick,
}: {
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  const { t } = useTranslation();

  return (
    <Button onClick={onClick} type={'contained'} className={`mx-2 py-5 pl-10 pr-10 text-[18px] ${className}`}>
      <span>
        <span className={'mr-2 h-6 w-6'}>{/*<AppStore />*/}</span>
        <span>{t('app-store')}</span>
      </span>
    </Button>
  );
}

export default AppStoreButton;
