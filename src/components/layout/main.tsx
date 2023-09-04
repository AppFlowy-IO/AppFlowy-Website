'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { createStore } from '@/lib/store';
import { StateContext } from '@/lib/context/store-context';
import { useRouter } from 'next/navigation';

export default function Main({ children }: { children: React.ReactNode }) {
  const store = createStore();
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/');
    router.prefetch('/download');
    router.prefetch('/what-is-new');
    router.prefetch('/about-us');
    router.prefetch('/contact-us');
    router.prefetch('/career');
    router.prefetch('/blocks');
    router.prefetch('/contributors');
  }, [router]);

  return (
    <StateContext.Provider value={store}>
      <Navbar />
      <main className='flex w-full flex-col items-center justify-center overflow-hidden text-base'>{children}</main>
      <Footer />
    </StateContext.Provider>
  );
}
