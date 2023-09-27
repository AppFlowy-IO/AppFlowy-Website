import { privacyHTML } from '@/lib/config/privacy';

function Page() {
  return (
    <div className={'privacy-policy'}>
      <div
        dangerouslySetInnerHTML={{
          __html: privacyHTML,
        }}
      ></div>
    </div>
  );
}

export default Page;
