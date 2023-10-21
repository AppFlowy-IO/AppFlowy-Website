import React from 'react';
import '@/styles/contact.scss';
import Form from '@/components/subscribe-newsletter/form';

function Page() {
  return (
    <div className={'subscribe-newsletter-page'}>
      <div className={'ellipse'} />
      <div className={'title'}>
        <span>
          {`AppFlowy `}
          <span className={'primary-word'}>
            Newsletter
            <span className={'primary-line'}>
              <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 174 6' fill='none'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M106.807 3.9591C81.7425 4.09808 56.6418 4.63763 41.1919 5.09271L40.4968 3.89976C44.4561 3.60192 49.4056 3.12313 51.7877 2.65633C51.805 2.65294 51.822 2.64957 51.8388 2.64623C51.1372 2.56719 50.1551 2.48702 48.8298 2.41146C42.7384 2.0642 33.7504 2.15212 24.8882 2.41425C16.0624 2.67531 7.49844 3.10457 2.31994 3.4198L0.810975 3.51165L0.0492773 2.32051L1.55824 2.22865C6.80467 1.90928 15.448 1.47614 24.363 1.21244C33.2416 0.949818 42.528 0.850615 48.9957 1.21933C50.6068 1.31117 51.8868 1.4172 52.8566 1.54069C53.7273 1.65156 54.7074 1.81858 55.2917 2.12296C55.6402 2.30451 55.8266 2.52468 55.7642 2.75258C55.7073 2.96001 55.4598 3.11864 55.2263 3.22852C54.986 3.34159 54.6767 3.44185 54.3367 3.53115C69.0739 3.18325 87.7795 2.85763 106.47 2.754C131.562 2.61487 156.782 2.87427 172.315 4.03618L173.864 4.15203L173.555 5.33478L172.007 5.21893C156.837 4.08419 131.917 3.81987 106.807 3.9591ZM52.7558 2.40838C52.7559 2.4084 52.7548 2.40903 52.7522 2.41029C52.7545 2.409 52.7557 2.40837 52.7558 2.40838Z'
                  fill='currentColor'
                />
              </svg>
            </span>
          </span>
        </span>
      </div>
      <div className={'desc'}>{`Sign up with your email address to receive news and updates.`}</div>
      <Form />
      <div className={'desc mt-[10px]'}>{`We respect your privacy.`}</div>
      <div className={'icon icon-1'}>
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 112 158' fill='none'>
          <path
            d='M85.9371 1C67.8357 70.3332 23.2786 58.7776 1 58.7776C38.5951 73.222 46.8178 106.444 33.025 157C39.987 131.482 70.8986 86.5113 111 93.4446C70.6205 76.1109 76.1902 45.7777 85.9371 1Z'
            stroke='#9327FF'
            strokeWidth='3'
          />
        </svg>
      </div>
      <div className={'icon icon-2'}>
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 21 30' fill='none'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M3.74168 12.1184C5.63516 13.5265 6.91563 15.3792 7.6001 17.6653C8.1518 19.508 8.30671 21.6009 8.11578 23.925C8.82835 22.8576 9.65541 21.8145 10.5814 20.8706C12.4822 18.9331 14.8656 17.3525 17.5853 16.904C16.941 16.4211 16.3901 15.8972 15.9258 15.3297C14.8917 14.0656 14.324 12.6296 14.0789 11.0505C13.8885 9.82399 13.8925 8.49806 14.0224 7.08263C12.4835 9.37868 10.6481 10.685 8.72388 11.3874C7.10222 11.9794 5.47497 12.1201 4.02009 12.1201C3.92671 12.1201 3.83389 12.1195 3.74168 12.1184ZM7.00297 30L5.44957 29.5683C6.7115 24.8379 6.92845 21.0447 6.06043 18.1455C5.20909 15.302 3.28416 13.2187 0 11.9283L0.289213 10.34C0.788405 10.34 1.34135 10.3703 1.90756 10.4014C1.95726 10.4042 2.00706 10.4069 2.05694 10.4096C2.68429 10.4438 3.33986 10.4769 4.02009 10.4769C5.38052 10.4769 6.80251 10.3437 8.18169 9.84026C10.8695 8.85908 13.6272 6.38273 15.2566 0L16.8222 0.381555C15.9089 4.6723 15.2457 8.06715 15.669 10.7934C15.8756 12.1241 16.3404 13.2727 17.1616 14.2765C17.988 15.2866 19.2115 16.1944 21 16.9796L20.5445 18.5438C17.1854 17.9499 14.1434 19.5621 11.7191 22.0333C9.29303 24.5062 7.61067 27.722 7.00297 30Z'
            fill='#9327FF'
          />
        </svg>
      </div>
    </div>
  );
}

export default Page;