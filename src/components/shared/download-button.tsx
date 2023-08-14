import React, { MouseEvent } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Button from '@/components/shared/button';

function DownloadButton({
  className = '',
  onClick,
}: {
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  const { t } = useTranslation();

  return (
    <Button onClick={onClick} className={`py-5 pl-10 pr-10 text-[18px] ${className}`} type={'contained'}>
      {t('download')}
    </Button>
  );
}

export default DownloadButton;
