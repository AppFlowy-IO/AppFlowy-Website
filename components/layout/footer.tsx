import React from 'react';
import Logo from '@/components/icons/logo';
import { externalLinks, links } from '@/lib/config/footer';
import Link from 'next/link';
import ContactEmail from '@/components/shared/contact-email';
import SwitchMode from '@/components/shared/switch-mode';

function Footer({ onChangeMode }: { onChangeMode: (dark?: boolean) => void }) {
  const ExternalLinks = () => (
    <>
      {externalLinks.map((item) => (
        <Link href={item.link} key={item.key}>
          {item.icon}
        </Link>
      ))}
    </>
  );

  return (
    <div className={'appflowy-footer'}>
      <div className={'top'}>
        <div className={'logo'}>
          <div className={'image h-[42px]  w-[189px] text-white'}>
            <Logo />
          </div>
          <div className={'links'}>
            <ExternalLinks />
          </div>
        </div>
        <div className={'menu'}>
          {links.map((item) => (
            <div className={'item'} key={item.name}>
              <span className={'group-name'}>{item.name}</span>
              {item.children.map((child) => (
                <div key={child.name} className={'group-item'}>
                  {child.link.startsWith('https') ? (
                    <a href={child.link} target={'_blank'}>
                      {child.name}
                    </a>
                  ) : (
                    <Link href={child.link || ''}>
                      <span className={'relative'}>
                        {child.name}
                        {'badge' in child && child.badge && <span className={'badge'}>{child.badge}</span>}
                      </span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={'links'}>
          <ExternalLinks />
        </div>
      </div>
      <div className={'bottom'}>
        <div className={'col'}>
          <div>Copyright © 2023, AppFlowy Inc.</div>
          <div className={'need-help'}>
            Need Help? <ContactEmail />
          </div>
        </div>
        <SwitchMode onChangeMode={onChangeMode} />
      </div>
    </div>
  );
}

export default Footer;
