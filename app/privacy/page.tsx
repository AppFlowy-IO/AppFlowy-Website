import DocxPreview from '@/components/privacy/docx-preview';

function Page() {
  return (
    <div className={'privacy-policy'}>
      <DocxPreview docxUrl={'/privacy.docx'} />
    </div>
  );
}

export default Page;
