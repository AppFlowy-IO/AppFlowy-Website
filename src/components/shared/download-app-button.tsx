import React from 'react';
import Button from '@/components/shared/button';
import useTranslation from 'next-translate/useTranslation';

function DownloadAppButton({
  className = '',
  onClick,
}: {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col items-center justify-center'>
      <Button onClick={onClick} className={`py-5 pl-10 pr-10 text-[18px] ${className}`} type={'contained'}>
        {t('download-app')}
      </Button>
      <div className={'mt-6 text-sm font-normal'}>
        {t('download-app-desc', {
          device: 'MacOS',
          version: '1.0.0',
        })}
      </div>
    </div>
  );
}

export default DownloadAppButton;
