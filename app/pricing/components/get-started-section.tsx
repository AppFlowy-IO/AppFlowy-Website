import React from 'react';
import Link from 'next/link';

export function GetStartedSection() {
  return (
    <section className='relative w-full overflow-hidden bg-[#2B1A3F] py-16 sm:py-20 md:py-24 lg:py-28 xl:py-[156px]'>
      {/* Bottom Gradient Ellipse Overlay */}
      <div
        className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[80%] transform opacity-40'
        style={{
          width: '100%',
          height: '50%',
          background: '#8A2CE7',
          borderRadius: '2060px',
          filter: 'blur(200px)',
        }}
      />

      {/* Content */}
      <div className='relative z-10 mx-auto w-full max-w-screen-xl'>
        <div className='mx-auto w-full max-w-[1100px] text-center'>
          {/* Title with padding */}
          <div className='px-6 sm:px-8 lg:px-12 xl:px-8'>
            <h2 className='font-inter text-3xl font-medium leading-[105%] tracking-[-1.68px] text-white sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px]'>
              Get started for <span className='text-[#C89AFA]'>free</span>
            </h2>

            {/* Subtitle */}
            <p className='mt-5 text-center font-inter text-base font-normal leading-[150%] text-white opacity-70'>
              Choose to own your data and a smarter way to work
            </p>

            {/* Buttons */}
            <div className='mt-[30px] flex flex-col items-center justify-center gap-3 px-6 sm:flex-row sm:gap-4 sm:px-0'>
              {/* Download Button */}
              <Link
                style={{
                  WebkitTapHighlightColor: 'transparent',
                }}
                href='/download'
                className='w-full sm:w-auto'
              >
                <button
                  className='flex h-[60px] w-full touch-manipulation select-none items-center justify-center gap-[8.28px] rounded-[15px] bg-white transition-transform duration-200 ease-out hover:scale-105 sm:w-[174px]'
                  style={{
                    padding: '15.732px 33.12px 17.388px 33.12px',
                    border: '0.828px solid rgba(0, 0, 0, 0.20)',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  <span className='font-inter text-base font-medium text-[#101012]'>Download</span>
                </button>
              </Link>

              {/* Try it free Button */}
              <Link
                style={{
                  WebkitTapHighlightColor: 'transparent',
                }}
                href='/app'
                className='w-full sm:w-auto'
              >
                <button
                  className='flex h-[60px] w-full touch-manipulation select-none items-center justify-center rounded-[15px] font-inter text-base font-medium text-white transition-transform duration-200 ease-out hover:scale-105 sm:w-[174px]'
                  style={{
                    padding: '10px',
                    gap: '5px',
                    border: '1px solid #E0C4FF',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  Try it free
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}