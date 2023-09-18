import '@/styles/app.scss';
import '@/styles/btn.scss';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <div className={'appflowy-app'}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
