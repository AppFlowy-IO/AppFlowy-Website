'use client';

import React, { useContext } from 'react';
import HeroSection from '@/components/home/hero-section/hero-section';
import ProductShowcase from '@/components/home/product-showcase/product-showcase';
import SupportAI from '@/components/home/support-ai/support-ai';
import Data from '@/components/home/data/data';
import Mobile from '@/components/home/mobile/mobile';
import Community from '@/components/home/community/community';
import { DarkContext } from '@/lib/hooks/use-dark-context';

function Index() {
  const dark = useContext(DarkContext) || false;

  return (
    <>
      <HeroSection dark={dark} />
      <ProductShowcase dark={dark} />
      <SupportAI dark={dark} />
      <Data />
      <Mobile dark={dark} />
      <Community dark={dark} />
    </>
  );
}

export default Index;
