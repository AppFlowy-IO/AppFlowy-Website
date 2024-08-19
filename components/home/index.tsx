'use client';

import React, { lazy } from 'react';
import HeroSection from '@/components/home/hero-section/hero-section';
import ProductShowcase from '@/components/home/product-showcase/product-showcase';
import { useDarkContext } from '@/lib/hooks/use-dark-context';

const SupportAI = lazy(() => import('@/components/home/support-ai/support-ai'));

const Data = lazy(() => import('@/components/home/data/data'));

const Mobile = lazy(() => import('@/components/home/mobile/mobile'));

const Community = lazy(() => import('@/components/home/community/community'));

function Index() {
  const dark = useDarkContext();

  return (
    <>
      <HeroSection />
      <ProductShowcase dark={dark} />
      <SupportAI dark={dark} />
      <Data />
      <Mobile dark={dark} />
      <Community dark={dark} />
    </>
  );
}

export default Index;
