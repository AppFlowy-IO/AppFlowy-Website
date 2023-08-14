import React, { MouseEvent } from 'react';
import Button from '@/components/shared/button';
import useTranslation from 'next-translate/useTranslation';

function RequestADemoButton({
  className = '',
  onClick,
}: {
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  const { t } = useTranslation();

  return (
    <Button onClick={onClick} className={`w-full py-6 text-[20px] leading-5 ${className}`} type={'outlined'}>
      {t('request-a-demo')}
    </Button>
  );
}

export default RequestADemoButton;
