import Navbar from '@/components/layout/nav/navbar';
import Banner from '@/components/banner/banner';

export default function Header() {
  return (
    <header className={'appflowy-header'}>
      <Banner />
      <Navbar />
    </header>
  );
}
