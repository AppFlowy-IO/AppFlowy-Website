import React from 'react';
import Link from 'next/link';

export function GetStartedSection() {
  return (
    <section className="relative w-full bg-[#2B1A3F] py-16 sm:py-20 md:py-24 lg:py-28 xl:py-[156px] overflow-hidden">
      {/* Bottom Gradient Ellipse Overlay */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[80%] opacity-40"
        style={{
          width: '100%',
          height: '50%',
          background: '#8A2CE7',
          borderRadius: '2060px',
          filter: 'blur(200px)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto">
        <div className="w-full max-w-[1100px] mx-auto text-center">
          {/* Title with padding */}
          <div className="px-6 sm:px-8 lg:px-12 xl:px-8">
            <h2 className="text-white font-inter font-medium leading-[105%] tracking-[-1.68px] text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px]">
              Get started for <span className="text-[#C89AFA]">free</span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-white font-inter font-normal text-base leading-[150%] text-center opacity-70 mt-5">
              Choose to own your data and a smarter way to work
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-[30px] px-6 sm:px-0">
              {/* Download Button */}
              <Link href="/download" className="w-full sm:w-auto">
                <button 
                  className="flex w-full sm:w-[174px] h-[60px] justify-center items-center gap-[8.28px] rounded-[15px] bg-white hover:scale-105 transition-transform duration-200 ease-out"
                  style={{
                    padding: '15.732px 33.12px 17.388px 33.12px',
                    border: '0.828px solid rgba(0, 0, 0, 0.20)'
                  }}
                >
                  <span className="text-[#101012] font-inter font-medium text-base">
                    Download
                  </span>
                </button>
              </Link>
              
              {/* Try it free Button */}
              <Link href="/app" className="w-full sm:w-auto">
                <button 
                  className="flex w-full sm:w-[174px] h-[60px] justify-center items-center rounded-[15px] text-white font-inter font-medium text-base hover:scale-105 transition-transform duration-200 ease-out"
                  style={{
                    padding: '10px',
                    gap: '5px',
                    border: '1px solid #E0C4FF'
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