import DocxPreview from '@/components/privacy/docx-preview';
import { Metadata } from 'next';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: `${site_url}/terms`,
    },
  };
}

function Page() {
  return (
    <div className={'terms flex flex-col gap-10'}>
      <DocxPreview docxUrl={'/terms.docx'} />
    </div>
  );
}

export default Page;
