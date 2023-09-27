import { termsHTML } from '@/lib/config/terms';

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
