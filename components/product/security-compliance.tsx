import Image from 'next/image';
import React from 'react';

const certificateBlockBg = 'https://www.figma.com/api/mcp/asset/780d5c1f-28ec-47d1-af69-02cab1be5214';
const soc2Badge = 'https://www.figma.com/api/mcp/asset/46dd394e-0281-4543-b964-9b0cdb4bab12';
const gdprBadge = 'https://www.figma.com/api/mcp/asset/37e6eea0-c0a0-40ce-b616-df5ed9f8df23';
const hippaBadge = 'https://www.figma.com/api/mcp/asset/84d5d688-cc1e-4246-895c-8960b24f7a60';
const isoBadge = 'https://www.figma.com/api/mcp/asset/380c8f55-f405-4adf-a817-611d2e705a36';
const isoBackdrop = 'https://www.figma.com/api/mcp/asset/0377c199-e5b6-4303-bf18-974ceeb75220';

function ComplianceCard({
  label,
  children,
  markContent,
}: {
  label: string;
  children: React.ReactNode;
  markContent?: React.ReactNode;
}) {
  return (
    <div className={'security-compliance__card'}>
      <div className={'security-compliance__card-mark'}>
        {children}
        {markContent ? <div className={'security-compliance__card-mark-text'}>{markContent}</div> : null}
      </div>
      <div className={'security-compliance__card-label'}>{label}</div>
    </div>
  );
}

function SecurityCompliance() {
  return (
    <div className={'af-container security-compliance-container'}>
      <section className={'af-box security-compliance'}>
        <div className={'security-compliance__panel'}>
          <div className={'security-compliance__panel-bg'} aria-hidden={true}>
            <Image
              alt={''}
              className={'object-cover'}
              fill={true}
              priority={false}
              src={certificateBlockBg}
            />
            <div className={'security-compliance__panel-fade'} />
          </div>

          <div className={'security-compliance__copy'}>
            <h2 className={'security-compliance__title text-style-h1 font-bold'}>
              Enterprise Privacy
              <br />
              Built on Trust
            </h2>
            <p className={'security-compliance__desc text-style-h5 font-medium'}>
              Your data belongs to you.
              <br />
              Experience out-of-the-box security backed by industry-leading compliance
            </p>
          </div>

          <div className={'security-compliance__badges'} aria-label={'Security and compliance certifications'}>
            <ComplianceCard
              label={'SOC2 TYPE II'}
              markContent={
                <div className={'security-compliance__mark-copy security-compliance__mark-copy--soc2'}>
                  <div className={'text-[14px] font-extralight leading-[16px]'}>AICPA</div>
                  <div className={'text-[20px] font-bold leading-[20px]'}>SOC2</div>
                </div>
              }
            >
              <div className={'security-compliance__badge-icon security-compliance__badge-icon--soc2'}>
                <Image alt={''} fill={true} src={soc2Badge} />
              </div>
            </ComplianceCard>

            <ComplianceCard
              label={'GDPR'}
              markContent={
                <div className={'security-compliance__mark-copy security-compliance__mark-copy--gdpr'}>
                  <div className={'text-[16px] font-bold leading-[20px]'}>GDPR</div>
                  <div className={'text-[4px] font-semibold leading-[6px] text-text-secondary'}>
                    GENERAL DATA
                    <br />
                    PROTECTION REGULATION
                  </div>
                </div>
              }
            >
              <div className={'security-compliance__badge-icon security-compliance__badge-icon--gdpr'}>
                <Image alt={''} fill={true} src={gdprBadge} />
              </div>
            </ComplianceCard>

            <ComplianceCard label={'HIPPA'}>
              <div className={'security-compliance__badge-icon security-compliance__badge-icon--hippa'}>
                <Image alt={''} fill={true} src={hippaBadge} />
              </div>
            </ComplianceCard>

            <ComplianceCard
              label={'ISO 27001'}
              markContent={
                <div className={'security-compliance__mark-copy security-compliance__mark-copy--iso'}>
                  <div className={'text-[28px] font-bold leading-[32px] whitespace-nowrap'}>ISO</div>
                  <div className={'text-[10px] font-semibold leading-[14px] whitespace-nowrap'}>27001</div>
                </div>
              }
            >
              <div className={'security-compliance__badge-icon security-compliance__badge-icon--iso'}>
                <Image alt={''} className={'security-compliance__badge-icon-backdrop'} fill={true} src={isoBackdrop} />
                <Image alt={''} fill={true} src={isoBadge} />
              </div>
            </ComplianceCard>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SecurityCompliance;
