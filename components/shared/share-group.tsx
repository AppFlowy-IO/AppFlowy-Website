'use client';
import Check from '@/components/icons/check';
import LinkIcon from '@/components/icons/link-icon';
import LinkedInIcon from '@/components/icons/linked-in-icon';
import Twitter from '@/components/icons/twitter';
import { copyToClipboard, shareToLinkedIn, shareToTwitter } from '@/lib/utils';
import { Tooltip } from '@mui/material';
import React, { useMemo } from 'react';

function Share() {
  const link = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return window.location.href;
  }, []);
  const content = 'Check out this template!';
  const [copiedLink, setCopiedLink] = React.useState(false);

  return (
    <div className={'share'}>
      <button onClick={() => shareToTwitter(link, content)}>
        <Twitter />
      </button>
      <button onClick={() => shareToLinkedIn(link, content)}>
        <LinkedInIcon />
      </button>

      <Tooltip title={copiedLink ? 'Copied!' : 'Copy link'} placement={'top'}>
        <button
          onMouseLeave={() => {
            setCopiedLink(false);
          }}
          onClick={() => {
            copyToClipboard(window.location.href);
            setCopiedLink(true);
          }}
        >
          {copiedLink ? <Check /> : <LinkIcon />}
        </button>
      </Tooltip>
    </div>
  );
}

export default Share;
