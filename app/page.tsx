import '@/styles/home.scss';
import HeroSection from '@/components/home/hero-section/hero-section';
import ProductShowcase from '@/components/home/product-showcase/product-showcase';
import SupportAI from '@/components/home/support-ai/support-ai';
import Data from '@/components/home/data/data';
import Mobile from '@/components/home/mobile/mobile';
import Community from '@/components/home/community/community';

export default function Home() {
  return (
    <div className='home-page'>
      <HeroSection />
      <ProductShowcase />
      <SupportAI />
      <Data />
      <Mobile />
      <Community />
      <div className={'blur-bottom'} />
    </div>
  );
}
