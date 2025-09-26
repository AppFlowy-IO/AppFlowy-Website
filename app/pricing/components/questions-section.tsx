'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ContactDialog } from './contact-dialog';
import helpImage from '/assets/images/pricing/help.png';
import affiliateImage from '/assets/images/pricing/affiliate.png';
import contactImage from '/assets/images/pricing/contact.png';

const cardData = [
  {
    id: 1,
    image: helpImage,
    title: 'Help articles',
    action: 'Learn more',
    link: 'https://appflowy.com/guide/getting-started-with-appflowy',
    alt: 'Help'
  },
  {
    id: 2,
    image: affiliateImage,
    title: 'Affiliate programs',
    action: 'Coming soon',
    link: null,
    alt: 'Affiliate'
  },
  {
    id: 3,
    image: contactImage,
    title: 'Contact support',
    action: 'Contact Us',
    link: '/contact',
    alt: 'Contact'
  }
];

function ActionIcon() {
  return (
    <div className="flex w-6 h-6 justify-center items-center gap-[10px] rounded-full bg-white">
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
        <path d="M1.44995 0.950195H9.54995M9.54995 0.950195V9.0502M9.54995 0.950195L1.44995 9.0502" stroke="#8427E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

export function QuestionsSection() {
  const searchParams = useSearchParams();
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  // 检测 URL 参数中的 action=contact
  useEffect(() => {
    const action = searchParams.get('action');

    if (action === 'contact') {
      setIsContactDialogOpen(true);
    }
  }, [searchParams]);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsContactDialogOpen(true);
  };

  return (
    <section className="relative w-full bg-[#200E34] py-16 sm:py-20 md:py-24 lg:py-28 xl:py-[156px] overflow-hidden">
      {/* Top Gradient Ellipse Overlay */}
      <div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3/4 opacity-30"
        style={{
          width: '100%',
          height: '50%',
          background: '#8A2CE7',
          borderRadius: '2060px',
          filter: 'blur(250px)',
        }}
      />
      
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
            <h2 className="text-white font-inter text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px] font-medium leading-[105%] tracking-[-1.68px]">
              Have additional <span className="text-[#C89AFA]">questions?</span>
            </h2>
          </div>
          
          {/* Cards with padding */}
          <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-28 xl:mt-[100px] px-6 sm:px-8 lg:px-12 xl:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cardData.map((card) => (
                <div key={card.id} className="flex p-[50px_40px] flex-col items-center flex-1 self-stretch rounded-[15px] border border-[rgba(255,255,255,0.2)]">
                  {/* Image */}
                  <div className="h-[120px] flex items-center justify-center">
                    <Image 
                      src={card.image}
                      alt={card.alt}
                      width={120}
                      height={120}
                      className="object-contain max-h-[120px]"
                    />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-white text-center font-inter text-2xl font-medium leading-[120%] tracking-[-0.24px] mt-[25px]">
                    {card.title}
                  </h3>
                  
                  {/* Action */}
                  <div className="flex items-center gap-2 mt-[15px]">
                    {card.id === 3 ? (
                      <button 
                        onClick={handleContactClick}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity select-none touch-manipulation"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                        <span className="text-[#E0C4FF] font-inter text-base font-medium leading-[150%]">
                          {card.action}
                        </span>
                        <ActionIcon />
                      </button>
                    ) : card.link ? (
                      <Link 
                        href={card.link}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity select-none touch-manipulation"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                        {...(card.link.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        <span className="text-[#E0C4FF] font-inter text-base font-medium leading-[150%]">
                          {card.action}
                        </span>
                        <ActionIcon />
                      </Link>
                    ) : (
                      <div className="flex items-center gap-2 opacity-60 cursor-not-allowed">
                        <span className="text-[#E0C4FF] font-inter text-base font-medium leading-[150%]">
                          {card.action}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Dialog */}
      <ContactDialog 
        open={isContactDialogOpen} 
        onOpenChange={setIsContactDialogOpen}
      />
    </section>
  );
}