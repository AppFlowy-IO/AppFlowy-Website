import React from 'react';
import Logo from '@/components/icons/logo';
import { externalLinks, links } from '@/lib/config/footer';
import Link from 'next/link';

function Footer() {
  const renderLink = (name: string, link?: string, badge?: number) => {
    const content = (
      <span className={'footer-link-text text-style-body-standard'}>
        {name}
        {badge && badge > 0 && <span className={'badge'}>{badge}</span>}
      </span>
    );

    if (!link) {
      return content;
    }

    if (link.startsWith('https')) {
      return (
        <a
          href={link}
          rel={'noreferrer'}
          target={'_blank'}
        >
          {content}
        </a>
      );
    }

    return <Link href={link}>{content}</Link>;
  };

  return (
    <div className={'appflowy-footer'}>
      <div className={'footer-shell'}>
        <div className={'top'}>
          <div className={'logo'}>
            <div className={'image h-[42px] w-[189px] text-white'}>
              <Logo />
            </div>
            <div
              aria-label={'AppFlowy social links'}
              className={'social-links'}
            >
              {externalLinks.map((item) => (
                <Link
                  aria-label={item.key}
                  href={item.link}
                  key={item.key}
                  rel={'noreferrer'}
                  target={'_blank'}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
          <nav
            aria-label={'Footer'}
            className={'menu'}
          >
            {links.map((item) => (
              <div
                className={'item'}
                key={item.name}
              >
                <span className={'group-name text-style-h5'}>{item.link ? renderLink(item.name, item.link) : item.name}</span>
                <div className={'group-links'}>
                  {item.children.map((child) => (
                    <div
                      key={child.name}
                      className={'group-item text-style-body-standard'}
                    >
                      {renderLink(child.name, child.link, 'badge' in child ? Number(child.badge) : undefined)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
        <div className={'bottom'}>
          <div className={'col'}>
            <div className={'text-style-body-standard'}>Copyright © 2026, AppFlowy</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
