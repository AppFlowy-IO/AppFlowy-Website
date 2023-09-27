'use client';

import { useEffect, useRef } from 'react';

function EmbedContent({ src }: { src: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    if (!iframe) return;

    // create an event listener so we can adjust the height of the <iframe> when content loads
    const adjustIframeHeight = () => {
      if (iframe && iframe.contentWindow?.document.body) {
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
      }
    };

    // add event listener to the <iframe> 'load' event
    iframe.addEventListener('load', adjustIframeHeight);

    // call once to ensure the height is correct when the content is loaded
    adjustIframeHeight();

    // remove event listener when component unmounts
    return () => {
      iframe.removeEventListener('load', adjustIframeHeight);
    };
  }, []);

  return (
    <iframe
      className={'embed-content'}
      ref={iframeRef}
      src={src}
      title='Embedded Content'
      style={{ border: 'none', width: '100%' }}
    ></iframe>
  );
}

export default EmbedContent;
