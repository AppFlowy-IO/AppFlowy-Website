import React from 'react';
import { joinPageConfig } from '@/lib/config/pages';
import Logo from '@/assets/images/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/join.scss';

function Page() {
  return (
    <div className={'join-page'}>
      <div className={'title'}>
        {joinPageConfig.title}
        <div className={'line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 169 14' fill='none'>
            <path
              d='M2.39937 10.0437C12.5104 7.77262 35.7535 3.47157 47.8372 4.43585C59.9209 5.40012 47.6143 9.64686 39.9506 11.6497C69.9061 7.3374 137.193 -0.356429 166.697 3.36651'
              stroke='#9327FF'
              strokeWidth='3'
              strokeLinecap='square'
            />
          </svg>
        </div>
      </div>
      <div className={'desc'}>{joinPageConfig.desc}</div>
      <Link href={'/join#opening'}>
        <div className={'download-btn'}>Open Position</div>
      </Link>

      <div className={'good-points'}>
        <Image className={'logo'} src={Logo.src} alt={''} width={350} height={350} />
        <div className={'good-points-list'}>
          {joinPageConfig.goodPoints.map((point, index) => (
            <div key={index} className={'good-point'}>
              <div className={'content'}>
                <div className={'good-point-icon'}>{point.icon}</div>
                <div className={'good-point-content'}>{point.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={'title opening'} id={'opening'}>
        {joinPageConfig.title1}
        <div className={'circle'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 163 90' fill='none'>
            <path
              d='M1.49956 30.119C126.5 -24.9989 156.955 14.4573 160.5 34.0007C164.044 53.5441 147.499 78.5011 85.9994 86.5014C24.4994 94.5017 7.90746 75.1104 7.58697 57.7431C7.21462 37.5656 25.7239 24.4176 76.1601 15.1131'
              stroke='#9327FF'
              strokeWidth='3'
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Page;
