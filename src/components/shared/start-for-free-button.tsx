import React, { MouseEvent } from 'react';
import Button from '@/components/shared/button';
import useTranslation from 'next-translate/useTranslation';

function StartForFreeButton({
  className = '',
  onClick,
}: {
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  const { t } = useTranslation();

  return (
    <Button onClick={onClick} className={`py-3 pl-6 pr-6 ${className}`} type={'contained'}>
      {t('start-for-free')}
    </Button>
  );
}

export default StartForFreeButton;
