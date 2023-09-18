'use client';

import React, { useEffect, useMemo } from 'react';
import debounce from 'lodash-es/debounce';
import { download } from '@/lib/download';
import Apple from '@/components/icons/apple';
import GooglePlay from '@/components/icons/google-play';
import { useSearchParams } from 'next/navigation';
import img1 from '@/assets/images/download/downloading-img-1.svg';
import img2 from '@/assets/images/download/downloading-img-2.svg';
import Image from 'next/image';
import { downloadLinux86Deb, downloadMacUniversal, downloadWindows } from '@/lib/hooks/use-download';

function Downloading() {
  const search = useSearchParams();
  const downloadUrl = search.get('downloadUrl');

  const debounceDownload = useMemo(() => {
    return debounce(() => {
      if (!downloadUrl) return;
      download(downloadUrl, false);
    }, 1000);
  }, [downloadUrl]);

  useEffect(() => {
    debounceDownload();
  }, [debounceDownload]);
  return (
    <>
      <div className={'panel panel-1'}>
        <div className={'thanks-download'}>
          <div className={'thanks-download_title'}>
            Thanks for downloading
            <div className={'icon'}>
              <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 29 41' fill='none'>
                <path
                  d='M22.2817 2.22606C22.4065 1.68505 22.0692 1.14527 21.5282 1.02043C20.9872 0.895579 20.4474 1.23294 20.3226 1.77394L22.2817 2.22606ZM2 16.0745L2.16527 15.0828C1.65473 14.9977 1.16302 15.3142 1.02898 15.8141C0.894937 16.314 1.16238 16.834 1.64701 17.0158L2 16.0745ZM8.83617 39.8L7.84707 39.6202C7.75164 40.145 8.08275 40.653 8.60145 40.7775C9.12014 40.9021 9.64581 40.5998 9.79909 40.0889L8.83617 39.8ZM27.7362 24.5191V25.5245C28.2154 25.5245 28.628 25.1862 28.722 24.7163C28.8159 24.2464 28.5652 23.7755 28.1228 23.5912L27.7362 24.5191ZM20.3226 1.77394C19.688 4.52386 17.9796 9.12847 15.3636 11.7445L16.7853 13.1662C19.7991 10.1524 21.6171 5.10592 22.2817 2.22606L20.3226 1.77394ZM15.3636 11.7445C14.0105 13.0976 11.8882 14.1375 9.46201 14.7348C7.04698 15.3293 4.42982 15.4603 2.16527 15.0828L1.83473 17.0661C4.39571 17.4929 7.28982 17.3402 9.94266 16.6871C12.5843 16.0368 15.0865 14.865 16.7853 13.1662L15.3636 11.7445ZM1.64701 17.0158C4.49748 18.0847 7.05028 20.9226 8.27166 25.1975L10.2049 24.6451C8.8527 19.9123 5.93656 16.477 2.35299 15.1332L1.64701 17.0158ZM8.27166 25.1975C9.48421 29.4414 8.65748 35.1629 7.84707 39.6202L9.82527 39.9798C10.6234 35.5903 11.566 29.4088 10.2049 24.6451L8.27166 25.1975ZM9.79909 40.0889C10.1567 38.8969 11.5149 36.2639 13.2704 33.6441C14.1376 32.3499 15.0795 31.0924 16.0103 30.0491C16.9541 28.9912 17.833 28.2146 18.5665 27.8145L17.6037 26.0493C16.5679 26.6144 15.5065 27.5937 14.51 28.7106C13.5005 29.8421 12.5022 31.1784 11.6 32.5249C9.81675 35.1863 8.31991 38.0223 7.87325 39.5111L9.79909 40.0889ZM18.5665 27.8145C21.9236 25.9833 25.046 25.5245 27.7362 25.5245V23.5138C24.7965 23.5138 21.3241 24.0201 17.6037 26.0493L18.5665 27.8145ZM28.1228 23.5912C27.4657 23.3174 26.2751 22.5346 25.0645 21.4639C23.8585 20.3973 22.7612 19.1574 22.2013 18.0376L20.4029 18.9368C21.1298 20.3906 22.4453 21.8316 23.7325 22.97C25.0151 24.1044 26.3981 25.0507 27.3495 25.4471L28.1228 23.5912ZM22.2013 18.0376C21.96 17.5549 21.7391 16.6722 21.5874 15.4379C21.4393 14.2326 21.3676 12.786 21.3725 11.2421C21.3824 8.14656 21.7 4.7467 22.2817 2.22606L20.3226 1.77394C19.6979 4.48096 19.3721 8.03791 19.3619 11.2357C19.3567 12.8385 19.4308 14.3726 19.5918 15.6831C19.7493 16.9646 20.0009 18.1327 20.4029 18.9368L22.2013 18.0376Z'
                  fill='#9327FF'
                />
              </svg>
            </div>
          </div>
          <div className={'thanks-download_step'}>
            <div className={'line'} />
            <div className={'step step-1'}>
              Your download will begin automatically,
              <br />
              If it didn‘t start,
              <span onClick={() => downloadUrl && download(downloadUrl, false)} className={'highlight ml-1 underline'}>
                download Appflowy manually.
              </span>
            </div>
            <div className={'step step-2'}>
              Once downloaded,open the file by doubled-clicking it in your downloads folder
            </div>
            <div className={'step step-3'}>Follow the instructions to install Appflowy to your computer</div>
          </div>
        </div>
        <div className={'image'}>
          <Image src={img1.src} alt={''} width={901} height={481} />
        </div>
      </div>
      <div className={'panel panel-2'}>
        <div className={'image'}>
          <Image src={img2.src} alt={''} width={670} height={612} />
        </div>
        <div className={'download-mobile'}>
          <div className={'download-mobile_title'}>
            <span>Appflowy for </span>
            <span>iOS and Android</span>
          </div>
          <div className={'download-mobile_desc'}>
            <div>Intuitive and seamlessly transition from laptop to phone.</div>
            <div>Coming in December</div>
          </div>
          <div className={'btn-group'}>
            <button disabled className={'download-btn'}>
              <Apple />
              App Store
            </button>
            <button disabled className={'download-btn'}>
              <GooglePlay />
              Google Play
            </button>
          </div>
        </div>
      </div>
      <div className={'panel panel-3'}>
        <div className={'title'}>
          <div className={'circle'}>
            <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 120 50' fill='none'>
              <path
                d='M1 14.908C89.5233 -9.28207 115.958 5.78783 118.323 17.637C121.227 32.1915 87.9728 46.4447 55.184 48.4502C22.3953 50.4556 5.53125 44.5355 4.86451 36.0085C2.47924 26.0962 14.4958 16.3863 48.7547 11.7745'
                stroke='#9327FF'
                strokeWidth='2.16'
              />
            </svg>
          </div>
          We also offer other download options for{' '}
          <span
            onClick={() => {
              downloadWindows(false);
            }}
            className={'highlight ml-1 underline'}
          >
            Windows
          </span>
          ,
          <span
            onClick={() => {
              downloadMacUniversal(false);
            }}
            className={'highlight ml-1 underline'}
          >
            MacOS
          </span>
          , or
          <span
            onClick={() => {
              downloadLinux86Deb(false);
            }}
            className={'highlight ml-1 underline'}
          >
            Linux
          </span>
        </div>
      </div>
    </>
  );
}

export default Downloading;
