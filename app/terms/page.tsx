import DocxPreview from '@/components/privacy/docx-preview';
import { Metadata } from 'next';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Terms of Service | AppFlowy',
    description:
      'The terms of service that govern your use of AppFlowy’s apps, cloud services and website, including your rights and responsibilities as a user.',
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
