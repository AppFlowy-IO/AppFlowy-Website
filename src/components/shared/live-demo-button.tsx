import React, { MouseEvent } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Button from '@/components/shared/button';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

function LiveDemoButton({
  className = '',
  onClick,
}: {
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  const { t } = useTranslation();

  return (
    <Button
      onClick={onClick}
      className={`mx-4 flex items-center py-5 pl-10 pr-10 text-[18px] ${className}`}
      type={'outlined'}
    >
      {t('live-demo')}
      <span className={'ml-2'}>
        <ArrowTopRightIcon />
      </span>
    </Button>
  );
}

export default LiveDemoButton;
