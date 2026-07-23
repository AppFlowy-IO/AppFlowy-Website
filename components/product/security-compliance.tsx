import Image from 'next/image';
import React from 'react';

const certificateBlockBg = '/images/sections/certificate-block-bg.webp';
const soc2Badge = '/images/sections/soc2-logo.svg';
const gdprBadge = '/images/sections/gdpr-logo.svg';
const hipaaBadge = '/images/sections/hippa-logo.svg';
const isoBadge = '/images/sections/iso.svg';

function ComplianceCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className={'compliance__card'}>
      <div className={'compliance__card-mark'}>
        {children}
      </div>
      <div className={'compliance__card-label'}>{label}</div>
    </div>
  );
}

function SecurityCompliance() {
  return (
    <div className={'af-container compliance-container'}>
      <section className={'af-box compliance'}>
        <div className={'compliance__panel-bg'} aria-hidden={true}>
          <Image
            alt={''}
            className={'object-cover'}
            fill={true}
            priority={false}
            src={certificateBlockBg}
          />
          <div className={'compliance__panel-fade'} />
        </div>
        <div className={'compliance__panel'}>
          <div className={'compliance__copy'}>
            <h2 className={'text-style-h1 font-bold'}>
              Enterprise Privacy
              <br />
              Built on Trust
            </h2>
            <p className={'compliance__desc text-style-h5 font-medium'}>
              Your data belongs to you.
              <br />
              Experience out-of-the-box security backed by industry-leading compliance
            </p>
          </div>

          <div className={'compliance__badges'} aria-label={'Security and compliance certifications'}>
            <ComplianceCard
              label={'SOC2 TYPE II'}
            >
              <div className={'compliance__badge-icon '}>
                <Image alt={'soc 2 badge'} fill={true} src={soc2Badge} />
              </div>
            </ComplianceCard>

            <ComplianceCard
              label={'GDPR'}
            >
              <div className={'compliance__badge-icon '}>
                <Image alt={'gdpr badge'} fill={true} src={gdprBadge} />
              </div>
            </ComplianceCard>

            <ComplianceCard label={'HIPAA'}>
              <div className={'compliance__badge-icon '}>
                <Image alt={'hipaa badge'} fill={true} src={hipaaBadge} />
              </div>
            </ComplianceCard>

            <ComplianceCard
              label={'ISO 27001'}
            >
              <div className={'compliance__badge-icon '}>
                <Image alt={'iso 27001 badge'} fill={true} src={isoBadge} />
              </div>
            </ComplianceCard>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SecurityCompliance;
