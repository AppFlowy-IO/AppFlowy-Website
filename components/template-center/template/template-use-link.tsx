'use client';

import { collectEvent, EventName } from '@/lib/collect';
import Link from 'next/link';
import { ReactNode } from 'react';

export type TemplateCtaPlacement = 'hero' | 'content' | 'footer';

interface TemplateUseLinkProps {
  children: ReactNode;
  className?: string;
  href: string;
  placement: TemplateCtaPlacement;
  templateId: string;
  templateName: string;
}

function TemplateUseLink({ children, className, href, placement, templateId, templateName }: TemplateUseLinkProps) {
  return (
    <Link
      className={className}
      href={href}
      onClick={() => {
        collectEvent(EventName.templateUseInAppFlowyBtn, {
          placement,
          template_id: templateId,
          template_name: templateName,
          type: 'click',
        });
      }}
      rel='noopener noreferrer'
      target='_blank'
    >
      {children}
    </Link>
  );
}

export default TemplateUseLink;
