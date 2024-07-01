import LinkIcon from '@/assets/images/invitation/link_off.svg';
import Logo from '@/components/icons/logo';
import ExpireDescription from '@/components/invitation/expired-description';
import InviteOwner from '@/components/invitation/invite-owner';
import InviteWorkspace from '@/components/invitation/invite-workspace';
import '@/styles/invitation.scss';
import Image from 'next/image';
import Link from 'next/link';
import NextTopLoader from 'nextjs-toploader';

function Page() {
  return (
    <div className={`expired-page`}>
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
          <ExpireDescription />
          <InviteWorkspace />
          <div className={'mb-4 h-[1px] w-[400px] max-w-full bg-[#BDBDBD] dark:bg-white '} />
          <button className={'visited-btn mb-6 w-[400px] max-w-full rounded-2xl bg-[#00A1CE] py-4 text-white'}>
            <Link href={'/download#pop'}>Download AppFlowy</Link>
          </button>
          <div className={'w-[400px] max-w-full whitespace-break-spaces break-words text-center text-[18px]'}>
            Need help?{' '}
            <a className={'font-semibold text-[#00A1CE] underline'} href={'https://discord.gg/9Q2xaN37tV'}>
              Contact us on Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
