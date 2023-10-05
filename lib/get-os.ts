import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';

export function getUAFromServer() {
  const ua = headers().get('user-agent');

  if (!ua) return;
  const parser = new UAParser(ua);
  const userAgentInfo = parser.getResult();

  return userAgentInfo;
}
