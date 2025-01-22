import { Metadata } from 'next';
import React from 'react';
import { contactPageConfig } from '@/lib/config/pages';
import '@/styles/contact.scss';
import Form from '@/components/contact/form';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: `${site_url}/contact`,
    },
  };
}

function Page() {
  return (
    <div className={'contact-page'}>
      <div className={'ellipse'} />
      <div className={'title'}>{contactPageConfig.title}</div>
      <div className={'desc'}>{contactPageConfig.desc}</div>
      <Form />
      <div className={'icon icon-1'}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 112 158"
          fill="none"
        >
          <path
            d="M85.9371 1C67.8357 70.3332 23.2786 58.7776 1 58.7776C38.5951 73.222 46.8178 106.444 33.025 157C39.987 131.482 70.8986 86.5113 111 93.4446C70.6205 76.1109 76.1902 45.7777 85.9371 1Z"
            stroke="#9327FF"
            strokeWidth="3"
          />
        </svg>
      </div>
      <div className={'icon icon-2'}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 21 30"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.74168 12.1184C5.63516 13.5265 6.91563 15.3792 7.6001 17.6653C8.1518 19.508 8.30671 21.6009 8.11578 23.925C8.82835 22.8576 9.65541 21.8145 10.5814 20.8706C12.4822 18.9331 14.8656 17.3525 17.5853 16.904C16.941 16.4211 16.3901 15.8972 15.9258 15.3297C14.8917 14.0656 14.324 12.6296 14.0789 11.0505C13.8885 9.82399 13.8925 8.49806 14.0224 7.08263C12.4835 9.37868 10.6481 10.685 8.72388 11.3874C7.10222 11.9794 5.47497 12.1201 4.02009 12.1201C3.92671 12.1201 3.83389 12.1195 3.74168 12.1184ZM7.00297 30L5.44957 29.5683C6.7115 24.8379 6.92845 21.0447 6.06043 18.1455C5.20909 15.302 3.28416 13.2187 0 11.9283L0.289213 10.34C0.788405 10.34 1.34135 10.3703 1.90756 10.4014C1.95726 10.4042 2.00706 10.4069 2.05694 10.4096C2.68429 10.4438 3.33986 10.4769 4.02009 10.4769C5.38052 10.4769 6.80251 10.3437 8.18169 9.84026C10.8695 8.85908 13.6272 6.38273 15.2566 0L16.8222 0.381555C15.9089 4.6723 15.2457 8.06715 15.669 10.7934C15.8756 12.1241 16.3404 13.2727 17.1616 14.2765C17.988 15.2866 19.2115 16.1944 21 16.9796L20.5445 18.5438C17.1854 17.9499 14.1434 19.5621 11.7191 22.0333C9.29303 24.5062 7.61067 27.722 7.00297 30Z"
            fill="#9327FF"
          />
        </svg>
      </div>
    </div>
  );
}

export default Page;
