import Image from 'next/image';
import React from 'react';

import CertificateBlockBg from '@/assets/images/sections/certificate-block-bg.webp';
import SOC2Badge from '@/assets/images/sections/soc2-logo.svg';
import GDPRBadge from '@/assets/images/sections/gdpr-logo.svg';
import HIPAABadge from '@/assets/images/sections/hipaa-logo.svg';
import ISOBadge from '@/assets/images/sections/iso.svg';
import Check from '@/components/icons/check';

const FEATURE_GROUPS = [
  {
    title: 'Data control & governance',
    items: [
      'Built-in identity and access management',
      'Granular permissions and admin controls',
      'Fine-grained control over AI access and usage',
    ],
  },
  {
    title: 'Flexible administration',
    items: ['SCIM  provisioning and LDAP integration', 'Centralized user, workspace, and instance administration'],
  },
  {
    title: 'Scalable infrastructure',
    items: [
      'Built to support deployments with hundreds of thousands of users',
      'Scale horizontally across multiple nodes as demand grows',
      'Deploy and scale individual services independently',
    ],
  },
];

const BADGES = [
  { label: 'SOC 2 Type II', src: SOC2Badge, alt: 'soc 2 badge' },
  { label: 'GDPR', src: GDPRBadge, alt: 'gdpr badge' },
  { label: 'HIPAA', src: HIPAABadge, alt: 'hipaa badge' },
  { label: 'ISO/IEC 27001', src: ISOBadge, alt: 'iso 27001 badge' },
];

function ComplianceCard({ label, alt, src }: { label: string; alt: string; src: string }) {
  return (
    <div className='compliance__card flex h-[250px] w-[220px] min-w-0 shrink-0 flex-col items-center justify-center gap-7 rounded-[12px] max-xl:h-[220px] max-xl:w-full max-xl:shrink max-xl:gap-5 max-sm:h-[200px] max-sm:gap-4'>
      <div className='relative h-[112px] w-[112px] max-xl:h-[88px] max-xl:w-[88px]'>
        <Image alt={alt} fill={true} src={src} />
      </div>
      <p className='compliance__card-label min-w-full text-center font-mono text-[20px] font-semibold tracking-[-0.04em] text-text-primary max-xl:text-[16px] max-sm:text-[14px]'>
        {label}
      </p>
    </div>
  );
}

function SecurityCompliance() {
  return (
    <div className='compliance-container flex w-full justify-center'>
      <section className='compliance w-full max-w-[1280px] py-20 sm:py-[120px] max-xl:px-6 max-sm:px-4'>
        <div className='compliance__panel relative flex min-h-[676px] w-full p-2 items-center justify-between gap-10 overflow-hidden rounded-[16px] max-xl:min-h-0 max-xl:flex-col max-xl:items-start max-xl:gap-10 sm:p-20'>
          <div className='pointer-events-none absolute inset-0' aria-hidden={true}>
            <Image
              alt={'compliance-background'}
              className={'object-cover'}
              fill={true}
              priority={false}
              src={CertificateBlockBg.src}
            />
            <div className='compliance__panel-fade absolute inset-0' />
          </div>

          <div className='compliance__copy z-[1] flex w-[620px] shrink-0 flex-col gap-10 p-3 max-xl:w-full max-xl:max-w-[620px] max-xl:gap-8 sm:p-0'>
            <h2 className='compliance__title text-style-h1 max-w-[520px] font-bold text-text-primary'>
              Enterprise-grade
              <br />
              security and control
            </h2>

            <div className='compliance__features flex flex-col gap-6'>
              {FEATURE_GROUPS.map((group) => (
                <div key={group.title} className='flex flex-col gap-2'>
                  <h3 className='compliance__feature-title text-style-h5 font-bold text-text-primary'>
                    {group.title}
                  </h3>
                  <ul className='flex flex-col gap-2'>
                    {group.items.map((item) => (
                      <li key={item} className='flex items-start gap-1'>
                        <span className='mt-[4px] flex h-[16px] w-[16px] shrink-0 items-center justify-center text-royal-purple'>
                          <Check />
                        </span>
                        <span className='compliance__feature-item text-style-body-standard font-normal text-text-secondary'>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div
            className='compliance__badges z-[1] grid grid-cols-2 gap-[14px] max-xl:w-full max-xl:grid-cols-4 max-xl:justify-items-stretch max-md:grid-cols-2 max-sm:gap-4'
            aria-label={'Security and compliance certifications'}
          >
            {BADGES.map((badge) => (
              <ComplianceCard key={badge.label} alt={badge.alt} label={badge.label} src={badge.src} />
            ))}
          </div>
        </div >
      </section >
    </div >
  );
}

export default SecurityCompliance;
