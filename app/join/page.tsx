import { Metadata } from 'next';
import React from 'react';
import { joinPageConfig } from '@/lib/config/pages';
import Logo from '@/assets/images/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/join.scss';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: `${site_url}/join`,
    },
  };
}

function Page() {
  return (
    <div className={'join-page'}>
      <div className={'title'}>
        {joinPageConfig.title}
        <div className={'line'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 169 14"
            fill="none"
          >
            <path
              d="M2.39937 10.0437C12.5104 7.77262 35.7535 3.47157 47.8372 4.43585C59.9209 5.40012 47.6143 9.64686 39.9506 11.6497C69.9061 7.3374 137.193 -0.356429 166.697 3.36651"
              stroke="#9327FF"
              strokeWidth="3"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </div>
      <div className={'desc'}>{joinPageConfig.subtitle}</div>
      <Link href={'/join#opening'}>
        <div className={'download-btn'}>Open roles</div>
      </Link>

      <div className={'good-points'}>
        <Image
          className={'logo'}
          src={Logo.src}
          alt={''}
          width={350}
          height={350}
        />
        <div className={'good-points-list'}>
          {joinPageConfig.goodPoints.map((point, index) => (
            <div
              key={index}
              className={'good-point'}
            >
              <div className={'content'}>
                <div className={'good-point-icon'}>{point.icon}</div>
                <div className={'good-point-content'}>{point.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={'title opening'}
        id={'opening'}
      >
        {joinPageConfig.currentJobTitle}
      </div>
      <div className={'jobs'}>
        {joinPageConfig.jobs.length > 0 ? (
          joinPageConfig.jobs.map((item: { title: string; link: string }) => (
            <Link
              target={'_blank'}
              href={item.link}
              key={item.title}
              className={'job'}
            >
              <div className={'job-title'}>{item.title}</div>
              <div className={'job-link-icon'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 32 33"
                  fill="none"
                >
                  <path
                    d="M3.83984 4.33984H28.1598M28.1598 4.33984V28.6598M28.1598 4.33984L3.83984 28.6598"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </Link>
          ))
        ) : (
          <div className={'no-job flex flex-col items-center justify-center'}>
            <div
              className={'mb-4 text-xl font-bold'}
            >{`We're not hiring at the moment, but please check back later.`}</div>
            <div
              className={'text'}
            >{`In the meantime, you're welcome to contribute to our open source repository and collaborate with us there!`}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
