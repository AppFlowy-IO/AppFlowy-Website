import React, { useRef } from 'react';
import Image from 'next/image';
import Edit from '@/components/icons/edit';
import Focus from '@/components/icons/focus';
import SwitchProduct from '@/components/home/product-showcase/switch-product';
import { productShowCaseConfig } from '@/lib/config/home';
import animationData from '@/assets/lottie/tasks/data';
import darkAnimationData from '@/assets/lottie/dark/tasks/data';

import OverTitle from '@/components/shared/over-title';
import Lottie from 'react-lottie';
import { useInView } from 'framer-motion';

function ProductShowcase({ dark }: { dark: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const renderCard = (card: {
    image: {
      src: string;
      darkSrc: string;
      alt: string;
    };
    title: string;
    size: {
      width: number;
      height: number;
    };
  }) => {
    return (
      <div key={card.title} className={'card'}>
        <div className={'ellipse'} />
        <div className={'image'}>
          <Image
            src={dark ? card.image.darkSrc : card.image.src}
            alt={card.image.alt}
            width={card.size.width}
            height={card.size.height}
          />
        </div>
        <div className={'title'}>{card.title}</div>
      </div>
    );
  };

  return (
    <div ref={ref} className={'product-showcase'}>
      {/* Wikis - Docs - Notes */}
      <div className={'title'}>
        <OverTitle title='Wikis-Docs-Notes' />
      </div>
      {/* An extensible and customizable knowledge base built on a community-driven open toolbox of plugins, templates, themes, and more. */}
      <section>
        <div className={'image desktop'}>
          <div className={'desc'}>
            <div className={'text-primary'}>
              <Edit />
            </div>
            <div className={'mt-[20px]'}>{productShowCaseConfig.subtitle}</div>
          </div>
          <div className={'bg'} />
          <div className={'relative aspect-video w-full'}>
            <div className={`absolute left-0 top-0 h-full w-full`}>
              {inView && (
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: dark ? darkAnimationData : animationData,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      {/* A centralized place for your tasks, notes, and projects. Organize and visualize your data in tasks, board, table, and more. */}
      <section>
        <div className={'title'}>{productShowCaseConfig.secondTitle}</div>
        <div className={'icon text-primary'}>
          <Focus />
        </div>
        <SwitchProduct />
      </section>
      {/* Easy-to-use and beautiful */}
      <section>
        <div className={'title'}>
          <span className={'relative'}>
            {productShowCaseConfig.thirdTitle}

            <div className={'icon'}>
              <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 40 56' fill='none'>
                <path
                  d='M30.3419 1C24.0887 24.9999 8.69623 21 1 21C13.9874 25.9999 16.828 37.4999 12.0632 55C14.4683 46.1667 25.1468 30.6001 39 33.0001C25.0507 26.9999 26.9748 16.5 30.3419 1Z'
                  stroke='#9327FF'
                  strokeWidth='3'
                />
              </svg>
            </div>
          </span>
        </div>
        <div className={'cards'}>{productShowCaseConfig.cards.map(renderCard)}</div>
      </section>
    </div>
  );
}

export default ProductShowcase;
