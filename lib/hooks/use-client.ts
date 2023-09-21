'use client';

import { useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';

export function useClient() {
  const [isClient, setClient] = useState(false);

  const [userAgentInfo, setUserAgentInfo] = useState<UAParser.IResult | undefined>(undefined);

  useEffect(() => {
    setClient(true);
    const parser = new UAParser(window.navigator.userAgent);
    const userAgentInfo = parser.getResult();

    setUserAgentInfo(userAgentInfo);
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