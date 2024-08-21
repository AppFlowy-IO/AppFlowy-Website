'use client';

import React, { useEffect, useRef } from 'react';
import * as docx from 'docx-preview';

const DocxPreview = ({ docxUrl }: { docxUrl: string }) => {
  const previewContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previewContainer = previewContainerRef.current;

    if (!previewContainer) {
      return;
    }

    const fetchAndRenderDocx = async () => {
      if (docxUrl) {
        const response = await fetch(docxUrl);
        const arrayBuffer = await response.arrayBuffer();

        void docx.renderAsync(arrayBuffer, previewContainer);
      }
    };

    void fetchAndRenderDocx();
  }, [docxUrl]);

  return (

    <div ref={previewContainerRef} id="preview-container"></div>

  );
};

export default DocxPreview;
