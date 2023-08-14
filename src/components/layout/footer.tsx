import React from 'react';
import LocaleSwitch from '@/components/footer/locale-switch';
import ThemeSwitch from '@/components/footer/theme-switch';
import Logo from '@/components/shared/icons/logo';
import useTranslation from 'next-translate/useTranslation';
import data from '@/data/footer.json';
import Link from 'next/link';
import SubscribeNewsletter from '@/components/footer/subscribe-newsletter';

function Footer() {
  const { t } = useTranslation();

  return (
    <div className={'bg-footer text-footer-text z-30  flex w-full flex-col px-[100px] pt-16'}>
      <SubscribeNewsletter />
      <div className={'relative flex w-full flex-col'}>
        <div className={'flex w-full px-5'}>
          <div className={'flex w-[200px] py-16'}>
            <div className={'translate-x-[25%] translate-y-[25%] scale-150'}>
              <Logo dark />
            </div>
          </div>
          <div className={'flex flex-1 justify-between p-16'}>
            {data.map((type) => (
              <div key={type.name}>
                <div className={'mb-5 font-bold'}>{t(type.name)}</div>
                <div className={'mb-3'}>
                  {type.children.map((child) => (
                    <div
                      key={child.name}
                      className={'mb-2 cursor-pointer text-gray-400 hover:text-gray-500 hover:underline'}
                    >
                      <Link href={child.url}>{t(child.name)}</Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`border-dividers z-30 mt-8 flex h-[100px] w-full justify-center border-t`}>
          <div className='mx-5 flex w-full items-center justify-between'>
            <div className={'flex flex-1 flex-col justify-center px-2'}>
              <div>Copyright @ 2023, Appflowy Inc.</div>
              <div className={'text-sm text-gray-400'}>
                Need Help? <span className={'cursor-pointer underline'}>support@appflowy.io</span>
              </div>
            </div>
            <div className={'flex flex-1 items-center justify-end'}>
              <LocaleSwitch />
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
