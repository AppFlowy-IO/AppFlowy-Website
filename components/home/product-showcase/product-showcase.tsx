'use client';
import React from 'react';
import Image from 'next/image';
import title from '@/assets/images/product-showcase/title.png';
import darkTitle from '@/assets/images/product-showcase/dark/title.svg';
import Edit from '@/components/icons/edit';
import Focus from '@/components/icons/focus';
import SwitchProduct from '@/components/home/product-showcase/switch-product';
import { productShowCaseConfig } from '@/lib/config/home';
import Lottie from 'lottie-react';
import tasksAnimation from '@/assets/lottie/tasks/data';

function ProductShowcase({ dark }: { dark: boolean }) {
  const titleSrc = dark ? darkTitle.src : title.src;
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
      <div className={'card'}>
        <div className={'bg'} />
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
    <div className={'product-showcase'}>
      {/* Wikis - Docs - Notes */}
      <div className={'title'}>
        <Image src={titleSrc} alt={'Wikis - Docs - Notes'} width={2276} height={412} />
      </div>
      {/* An extensible and customizable knowledge base built on a community-driven open toolbox of plugins, templates, themes, and more. */}
      <section>
        <div className={'desc'}>
          <div className={'text-primary'}>
            <Edit />
          </div>
          <div className={'mt-[20px]'}>{productShowCaseConfig.desc}</div>
        </div>
        <div className={'image desktop'}>
          <div className={'bg'} />
          <Lottie animationData={tasksAnimation} />
        </div>
      </section>
      {/* A centralized place for your tasks, notes, and projects. Organize and visualize your data in tasks, board, table, and more. */}
      <section>
        <div className={'title'}>{productShowCaseConfig.title}</div>
        <div className={'icon text-primary'}>
          <Focus />
        </div>
        <SwitchProduct />
      </section>
      {/* Easy-to-use and beautiful */}
      <section>
        <div className={'title'}>
          <span className={'relative'}>
            {productShowCaseConfig.subTitle}
            <div className={'line'}>
              <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 179 19' fill='none'>
                <path
                  d='M177.263 14.9724C129.071 7.4489 95.3553 -2.62395 16.3532 4.93072C14.0431 5.15164 13.9245 8.38732 16.2144 8.76384L67.2846 17.1611C36.1376 10.0862 19.1314 9.94373 2.19824 13.4691'
                  stroke='#9327FF'
                  strokeWidth='3'
                  strokeLinecap='square'
                />
              </svg>
            </div>
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
