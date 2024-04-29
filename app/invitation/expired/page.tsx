import React from 'react';
import Link from 'next/link';
import Logo from '@/components/icons/logo';
import '@/styles/invitation.scss';
import LinkIcon from '@/assets/images/invitation/link_off.svg';
import Image from 'next/image';
import InviteOwner from '@/components/invitation/invite-owner';
import { Poppins } from 'next/font/google';
import InviteWorkspace from '@/components/invitation/invite-workspace';
import NextTopLoader from 'nextjs-toploader';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] });

function Page() {
  return (
    <div className={`expired-page ${poppins.className}`}>
      <NextTopLoader showSpinner={false} color={'#9327FF'} />
      <div className={'header'}>
        <div className={'logo-wrapper'}>
          <Link href={'/'} className={'logo text-black dark:text-white'}>
            <Logo />
          </Link>
        </div>
      </div>
      <div className={'content'}>
        <div className={'content-wrapper'}>
          <div className={'flex items-center justify-center gap-2 text-center text-[40px]'}>
            <Image className={'logo'} src={LinkIcon.src} alt={''} width={44} height={44} />
            Link expired.
          </div>
          <InviteOwner />
          <div
            className={
              'w-[400px] max-w-full whitespace-break-spaces break-words text-center text-[20px] font-medium leading-[30px]'
            }
          >
            Your invitation link has expired.
            <br />
            Contact your administrator to request a new link.
          </div>
          <InviteWorkspace />
          <div className={'mb-4 h-[1px] w-[400px] max-w-full bg-[#BDBDBD] dark:bg-white '} />
          <button className={'visited-btn mb-6 w-[400px] max-w-full rounded-2xl bg-[#00A1CE] py-4 text-white'}>
            <Link href={'/'}>Visit AppFlowy homepage</Link>
          </button>
          <div className={'w-[400px] max-w-full whitespace-break-spaces break-words text-center text-[18px]'}>
            If you are having issues with your account you can{' '}
            <a className={'font-semibold text-[#00A1CE] underline'} href={'https://discord.gg/9Q2xaN37tV'}>
              Contact support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
