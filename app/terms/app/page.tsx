import { termsHTML } from '@/lib/config/terms/app/terms-html';

function Page() {
  return (
    <div className={'terms'}>
      <div
        dangerouslySetInnerHTML={{
          __html: termsHTML,
        }}
      ></div>
    </div>
  );
}

export default Page;
