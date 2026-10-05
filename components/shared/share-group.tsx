'use client';
import Check from '@/components/icons/check';
import LinkIcon from '@/components/icons/link-icon';
import LinkedInIcon from '@/components/icons/linked-in-icon';
import Twitter from '@/components/icons/twitter';
import { cn, copyToClipboard, shareToLinkedIn, shareToTwitter } from '@/lib/utils';
import { Tooltip } from '@mui/material';
import React, { useMemo } from 'react';

function Share({ compact = false, content }: { compact?: boolean; content: string }) {
  const link = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return window.location.href;
  }, []);
  const [copiedLink, setCopiedLink] = React.useState(false);

  return (
    <div className={cn('share', compact && 'share-compact')}>
      <button aria-label='Share on X' onClick={() => shareToTwitter(link, content)} type='button'>
        <Twitter />
      </button>
      <button aria-label='Share on LinkedIn' onClick={() => shareToLinkedIn(link, content)} type='button'>
        <LinkedInIcon />
      </button>

      <Tooltip title={copiedLink ? 'Copied!' : 'Copy link'} placement={'top'}>
        <button
          aria-label={copiedLink ? 'Link copied' : 'Copy article link'}
          onMouseLeave={() => {
            setCopiedLink(false);
          }}
          onClick={() => {
            copyToClipboard(window.location.href);
            setCopiedLink(true);
          }}
          type='button'
        >
          {copiedLink ? <Check /> : <LinkIcon />}
        </button>
      </Tooltip>
    </div>
  );
}

export default Share;
