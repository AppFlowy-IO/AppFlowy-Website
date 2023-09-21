'use client';
import '@/styles/app.scss';
import '@/styles/btn.scss';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useState } from 'react';
import { DarkContext } from '@/lib/hooks/use-dark-context';

export default function App({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  const [dark, setDark] = useState<boolean | undefined>(isDark);

  return (
    <DarkContext.Provider value={dark}>
      <div className={'appflowy-app'}>
        <Header />
        <main>{children}</main>
        <Footer onChangeMode={setDark} isDark={!!dark} />
      </div>
    </DarkContext.Provider>
  );
}
