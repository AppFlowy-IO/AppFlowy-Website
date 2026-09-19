import DocxPreview from '@/components/privacy/docx-preview';
import { Metadata } from 'next';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Privacy Policy | AppFlowy',
    description:
      'Read the AppFlowy privacy policy: what data we collect, how it is used and stored, and the control you keep over your own information.',
    alternates: {
      canonical: `${site_url}/privacy`,
    },
  };
}

function Page() {
  return (
    <div className={'privacy-policy'}>
      <DocxPreview docxUrl={'/privacy.docx'} />
    </div>
  );
}

export default Page;
