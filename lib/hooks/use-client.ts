'use client';

import { useContext, useEffect, useState } from 'react';
import { UAContext } from '@/lib/hooks/use-ua';

export function useClient() {
  const [isClient, setClient] = useState(false);
  const userAgentInfo = useContext(UAContext);

  useEffect(() => {
    setClient(true);
  }, []);
  const name = userAgentInfo?.os?.name?.toLowerCase().replaceAll(' ', '');

  return {
    isClient,
    ...userAgentInfo,
    isMobile: userAgentInfo?.device?.type === 'mobile',
    isIOS: name?.includes('ios'),
    isAndroid: name?.includes('android'),
    isLinux: name?.includes('linux'),
  };
}
