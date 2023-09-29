import React from 'react';
import Logo from '@/components/icons/logo';
import { externalLinks, links } from '@/lib/config/footer';
import Link from 'next/link';
import ContactEmail from '@/components/shared/contact-email';

// import SwitchMode from '@/components/shared/switch-mode';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Footer(_props: { isDark: boolean; onChangeMode: (dark?: boolean) => void }) {
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
          <div className={'image text-white'}>
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
                    <Link href={child.link || ''}>{child.name}</Link>
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
          <div>Copyright © 2023, Appflowy Inc.</div>
          <div className={'need-help'}>
            Need Help? <ContactEmail />
          </div>
        </div>
        {/*<SwitchMode onChangeMode={onChangeMode} isDark={isDark} />*/}
      </div>
    </div>
  );
}

export default Footer;
