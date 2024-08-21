'use client';

import React, { useEffect, useRef, useState } from 'react';

function InnerIframe({
  iframeSrc,
}: {
  iframeSrc: string;
}) {
  const [src, setSrc] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setSrc(iframeSrc);
    const handleIframeLoad = () => {
      const iframe = iframeRef.current;

      if (iframe) {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;

        if (!iframeDocument) return;
        const height = iframeDocument.body.scrollHeight || 0;

        iframe.style.height = height + 10 + 'px';

        iframeDocument.addEventListener('click', function(event) {
          const target = event.target as HTMLElement;
          const linkTarget = target.closest('a');

          if (linkTarget) {
            event.preventDefault();
            const url = linkTarget.href;

            window.open(url, '_blank');
          }
        });
      }
    };

    const iframe = iframeRef.current;

    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
    };
  }, [iframeSrc]);

  return (
    <iframe ref={iframeRef} className={'w-full'} src={src} />
  );
}

export default InnerIframe;