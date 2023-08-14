'use client';
import React, { MouseEvent } from 'react';
import Button from '@/components/shared/button';
import useTranslation from 'next-translate/useTranslation';
import { useRouter, usePathname } from 'next/navigation';

function GetStartedButton({
  className = '',
}: {
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Button
      onClick={() => {
        router.push(pathname + '#get-started');
      }}
      className={`w-full py-6 text-[20px] leading-5 ${className}`}
      type={'outlined'}
    >
      {t('get-started')}
    </Button>
  );
}

export default GetStartedButton;
