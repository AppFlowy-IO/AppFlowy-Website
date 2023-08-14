'use client';

import Link from 'next/link';
import Logo from '@/components/shared/icons/logo';
import useTranslation from 'next-translate/useTranslation';
import data from '@/data/navbar.json';
import StartForFreeButton from '@/components/shared/start-for-free-button';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === '/') {
      return pathname === '/';
    }

    return pathname.includes(url);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: 'rgb(var(--color-body)/0.5)',
        }}
        className={`navbar fixed left-0 top-0 z-30 flex w-screen justify-center backdrop-blur-xl transition-all`}
      >
        <div className='flex h-[84px] w-full items-center justify-between px-5'>
          <Link href='/' className='mx-5 flex scale-125 items-center'>
            <Logo />
          </Link>
          <div className={'flex items-center justify-center'}>
            {data.map((item) => (
              <div key={item.name} className={`mx-4 hover:underline ${isActive(item.url) ? 'text-primary' : ''}`}>
                <Link href={item.url}>{t(item.name)}</Link>
              </div>
            ))}
          </div>
          <div>
            <StartForFreeButton
              onClick={() => {
                //
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
