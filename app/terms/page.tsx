import DocxPreview from '@/components/privacy/docx-preview';

function Page() {
  return (
    <div className={'terms flex flex-col gap-10'}>
      <DocxPreview docxUrl={'/terms.docx'} />
    </div>
  );
}

export default Page;
