import DocxPreview from '@/components/privacy/docx-preview';
import { Metadata } from 'next';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  return {
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
