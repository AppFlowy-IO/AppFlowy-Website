import React from 'react';
import Plus from '@/components/icons/plus';
import AnimateNumber from '@/components/shared/animate-number';
import Image from 'next/image';
import Link from 'next/link';
import Icons from '@/components/home/community/icons';
import StartForFree from '@/components/home/community/start-for-free';
import { communityConfig } from '@/lib/config/home';

function Community({ dark }: { dark: boolean }) {
  return (
    <div className={'community'}>
      <div className={'title'}>
        {communityConfig.title}
        <div className={'line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 381 15' fill='none'>
            <path
              d='M1.99979 9.37731C25.1033 6.25015 78.2435 0.462636 105.976 2.32985C133.708 4.19706 105.637 10.2621 88.1342 13.0612C156.662 7.47763 310.656 -2.02839 378.412 4.61575'
              stroke='#9327FF'
              strokeWidth='3'
              strokeLinecap='square'
            />
          </svg>
        </div>
      </div>
      <div className={'numbers'}>
        {communityConfig.numbers.map((item) => (
          <div key={item.text} className={'number'}>
            <div className={'value'}>
              <span className={'relative'}>
                <AnimateNumber value={item.value} />
                <div className={'plus-icon'}>
                  <Plus />
                </div>
              </span>
            </div>
            <div className={'text'}>{item.text}</div>
          </div>
        ))}
      </div>
      <div className={'intros'}>
        {communityConfig.intros.map((item) => (
          <div key={item.title} className={'intro'}>
            <div className={'image'}>
              <Image src={dark ? item.image.darkSrc : item.image.src} alt={item.image.alt} width={700} height={500} />
            </div>
            <div className={'right'}>
              <div className={'title'}>{item.title}</div>
              <div className={'content'}>{item.content}</div>
              <div className={'link'}>
                {item.btnLink.startsWith('https') ? (
                  <a href={item.btnLink} target={'_blank'}>
                    {item.btnText}
                  </a>
                ) : (
                  <Link href={item.btnLink}>{item.btnText}</Link>
                )}
                <span className={'ml-2'}>
                  <svg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 11 11' fill='none'>
                    <path d='M1 1H10M10 1V10M10 1L1 10' stroke='#9327FF' strokeWidth='1.8' />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Icons dark={dark} />
      <StartForFree dark={dark} />
    </div>
  );
}

export default Community;
