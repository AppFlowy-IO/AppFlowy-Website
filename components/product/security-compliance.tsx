import Image from 'next/image';
import React from 'react';

import CertificateBlockBg from '@/assets/images/sections/certificate-block-bg.webp';
import SOC2Badge from '@/assets/images/sections/soc2-logo.svg';
import GDPRBadge from '@/assets/images/sections/gdpr-logo.svg';
import HIPAABadge from '@/assets/images/sections/hippa-logo.svg';
import ISOBadge from '@/assets/images/sections/iso.svg';

function ComplianceCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className='compliance__card flex h-[220px] w-[160px] shrink-0 flex-col items-center justify-between rounded-[8px] bg-white py-[28px] max-sm:w-[148px]'>
      <div className='relative flex h-[112px] w-[112px] items-center justify-center'>{children}</div>
      <div className='compliance__card-label min-w-full text-center font-mono text-[16px] font-semibold tracking-[-0.04em] text-text-primary'>
        {label}
      </div>
    </div>
  );
}

function SecurityCompliance() {
  return (
    <div className='compliance-container flex w-full justify-center'>
      <section className='compliance w-[1440px] min-w-0 max-w-full px-[80px] py-28 max-xl:px-[4vw]'>
        <div className='compliance__panel relative flex min-h-[560px] w-full items-center justify-between gap-10 overflow-hidden rounded-[16px] px-12 py-16 max-xl:min-h-0 max-xl:flex-col max-xl:items-start max-xl:gap-8 max-xl:px-10 max-xl:py-12 max-md:px-6 max-md:py-8'>
          <div className='pointer-events-none absolute inset-0' aria-hidden={true}>
            <Image alt={'compliance-background'} className={'object-cover'} fill={true} priority={false} src={CertificateBlockBg.src} />
            <div className='compliance__panel-fade absolute inset-0' />
          </div>
          <div className='compliance__copy z-[1] flex w-[480px] shrink-0 flex-col gap-10 text-[#140f28] max-xl:w-full max-xl:max-w-[560px] max-xl:gap-6'>
            <h2 className='compliance__title text-style-h1 font-bold text-text-primary max-w-250px'>
              Enterprise-grade security
            </h2>
            <p className='compliance__desc text-style-h5 max-w-[480px] font-medium text-text-primary max-lg:max-w-[420px]'>
              Designed for teams with
              <br></br>
              stringent security & privacy requirements
            </p>
          </div>

          <div
            className='compliance__badges z-[1] flex flex-wrap items-center justify-center gap-2 max-xl:w-full max-xl:justify-start max-sm:justify-center'
            aria-label={'Security and compliance certifications'}
          >
            <ComplianceCard label={'SOC2 TYPE II'}>
              <div className='relative h-[112px] w-[112px]'>
                <Image alt={'soc 2 badge'} fill={true} src={SOC2Badge} />
              </div>
            </ComplianceCard>

            <ComplianceCard label={'GDPR'}>
              <div className='relative h-[112px] w-[112px]'>
                <Image alt={'gdpr badge'} fill={true} src={GDPRBadge} />
              </div>
            </ComplianceCard>

            <ComplianceCard label={'HIPAA'}>
              <div className='relative h-[112px] w-[112px]'>
                <Image alt={'hipaa badge'} fill={true} src={HIPAABadge} />
              </div>
            </ComplianceCard>

            <ComplianceCard label={'ISO 27001'}>
              <div className='relative h-[112px] w-[112px]'>
                <Image alt={'iso 27001 badge'} fill={true} src={ISOBadge} />
              </div>
            </ComplianceCard>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SecurityCompliance;
