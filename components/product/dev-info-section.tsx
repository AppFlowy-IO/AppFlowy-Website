'use client';

import { useAutoPlay } from '@/lib/hooks/use-auto-play';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useMemo } from 'react';
import { TabPanel } from '@/components/shared/tab-panel';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import DeployImage from '@/assets/images/dev-info/deploy-anywhere.webp';
import LocalAIImage from '@/assets/images/dev-info/local-ai.webp';
import ComplianceImage from '@/assets/images/dev-info/compliance.webp';
import ArchitectureImage from '@/assets/images/dev-info/architecture.webp';
import AdminImage from '@/assets/images/dev-info/admin.webp';

import DeployIcon from '@/components/product/deploy-icon';
import LocalAIIcon from '@/components/product/local-ai-icon';
import ComplianceIcon from '@/components/product/compliance-icon';
import ArchitectureIcon from '@/components/product/architecture-icon';
import AdminIcon from '@/components/product/admin-icon';

function TabArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width='32' height='32' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M4.16663 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

function DevInfoSection() {
  const [value, setValue] = React.useState('deploy');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabOptions = useMemo(() => {
    return [
      {
        value: 'deploy',
        label: 'Deploy Anywhere',
        icon: <DeployIcon />,
      },
      {
        value: 'local_ai',
        label: 'On-Prem and Local AI',
        icon: <LocalAIIcon />,
      },
      {
        value: 'compliance',
        label: 'Complete Data Sovereignty',
        icon: <ComplianceIcon />,
      },
      {
        value: 'architecture',
        label: 'Architecture',
        icon: <ArchitectureIcon />,
      },
      {
        value: 'admin',
        label: 'Admin Panel',
        icon: <AdminIcon />,
      },
    ];
  }, []);

  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  const { start, stop } = useAutoPlay({
    options: tabOptions,
    onChange: setValue,
  });

  useEffect(() => {
    if (!inView) {
      stop();
    } else {
      start();
    }
  }, [inView, start, stop]);

  const panels = useMemo(() => {
    return [
      {
        value: 'deploy',
        image: DeployImage,
        title: 'On-prem, cloud, air-gapped',
        desc: 'Run AppFlowy on your hardware, your cloud region, or in a fully air-gapped environment',
      },
      {
        value: 'local_ai',
        image: LocalAIImage,
        title: "AI on your terms, not your vendor's",
        desc: "Your data never touches a model you don't control. Run local models offline or connect a self-hosted LLM — AI on your infrastructure, under your rules.",
      },
      {
        value: 'compliance',
        image: ComplianceImage,
        title: 'Your jurisdiction. Your compliance baseline.',
        desc: 'Deploy in your region, under your retention policies. No vendor access, no shared cloud — sovereignty over where your data lives and who can touch it.',
      },
      {
        value: 'architecture',
        image: ArchitectureImage,
        title: 'Flexible and extensible architecture',
        desc: 'Open plugin system, SSO, SAML, LDAP, and custom auth, public APIs, modular by design. Extend AppFlowy to fit your stack — without waiting on a roadmap.',
      },
      {
        value: 'admin',
        image: AdminImage,
        title: 'Full control, one view',
        desc: 'Manage users, audit workspaces, enforce SSO and permissions across your entire org, built-in deployment tools without leaving the panel.',
      },
    ];
  }, []);

  const activeIndex = tabOptions.findIndex((tab) => tab.value === value);
  const activePanel = panels.find((panel) => panel.value === value);

  const goToIndex = (index: number) => {
    const nextIndex = (index + tabOptions.length) % tabOptions.length;

    setValue(tabOptions[nextIndex].value);
    start();
  };

  return (
    <section className='dev-info-section w-full bg-night-blue px-[80px] py-16 max-xl:px-[4vw] sm:py-20  lg:py-24 xl:py-[120px]'>
      <div className='mx-auto flex w-full max-w-[1440px] flex-col border border-[#5A5A5A] px-[80px] max-xl:px-[4vw] sm:py-20 lg:py-24 xl:py-[120px]'>
        <div className='align-items-start mb-12 flex w-full flex-col'>
          <h1 className='text-style-h1 font-bold text-white'>Built for teams who own their stack</h1>
          <h5 className='text-style-h5 mt-4 text-text-tertiary'>Your team. Your servers. Your rules.</h5>
        </div>
        <div ref={ref}>
          <div className='hidden grid-cols-1 items-stretch gap-8 sm:grid lg:grid-cols-2 lg:gap-20'>
            <MuiTabs
              className='w-full'
              orientation='vertical'
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{ style: { display: 'none' } }}
              sx={{
                '& .MuiTabs-flexContainer': {
                  gap: '12px',
                },
              }}
            >
              {tabOptions.map((tab) => (
                <MuiTab
                  disableRipple
                  onClick={() => start()}
                  key={tab.value}
                  value={tab.value}
                  sx={{
                    width: '100%',
                    maxWidth: '540px',
                    minWidth: 0,
                    padding: 0,
                    textTransform: 'none',
                    alignItems: 'stretch',
                  }}
                  label={
                    <div
                      className={`flex w-full items-center justify-between gap-4 rounded-2xl border px-6 py-7 text-left transition-colors ${
                        value === tab.value
                          ? 'border-[#BEBEBE] bg-[#0F0A1E]'
                          : 'border-[#2D2B3B] bg-[#161325] hover:bg-gray-03'
                      }`}
                    >
                      <div className='flex items-center gap-4'>
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                            value === tab.value ? 'bg-white text-night-blue' : 'bg-gray-10 text-white'
                          }`}
                        >
                          {tab.icon}
                        </div>
                        <span className='text-style-h5 whitespace-nowrap font-mono font-semibold text-white'>
                          {tab.label}
                        </span>
                      </div>
                      {value === tab.value && (
                        <span className='shrink-0 text-white'>
                          <TabArrowIcon />
                        </span>
                      )}
                    </div>
                  }
                />
              ))}
            </MuiTabs>
            <div className='w-full'>
              {panels.map((panel) => (
                <TabPanel key={panel.value} index={panel.value} value={value}>
                  <div className='flex w-full flex-col '>
                    <div className='relative h-[300px] w-full shrink-0 overflow-hidden rounded-2xl max-md:h-[200px]'>
                      <Image
                        loading={'eager'}
                        fill
                        sizes='(max-width: 1024px) 100vw, 50vw'
                        className='object-cover'
                        src={panel.image.src}
                        alt={panel.title}
                      />
                    </div>
                    <div className='mt-8 flex flex-col gap-3'>
                      <h2 className='text-style-h2 font-semibold text-white'>{panel.title}</h2>
                      <p className='text-style-h5 whitespace-pre-wrap text-gray-40'>{panel.desc}</p>
                    </div>
                  </div>
                </TabPanel>
              ))}
            </div>
          </div>
          <div className='flex w-full flex-col sm:hidden'>
            <div className='flex items-center gap-2 text-white'>
              <span className='shrink-0'>{tabOptions[activeIndex]?.icon}</span>
              <span className='text-style-caption font-mono text-white'>{tabOptions[activeIndex]?.label}</span>
            </div>
            {activePanel && (
              <div className='mt-6 flex w-full flex-col'>
                <div className='relative h-[200px] w-full shrink-0 overflow-hidden rounded-2xl'>
                  <Image
                    loading={'eager'}
                    fill
                    sizes='100vw'
                    className='object-cover'
                    src={activePanel.image.src}
                    alt={activePanel.title}
                  />
                </div>
                <div className='mt-8 flex h-[220px] flex-col gap-3'>
                  <h2 className='text-style-h2 font-semibold text-white'>{activePanel.title}</h2>
                  <p className='text-style-h5 whitespace-pre-wrap text-gray-40'>{activePanel.desc}</p>
                </div>
              </div>
            )}
            <div className='mt-10 flex w-full items-center justify-between'>
              <button
                type='button'
                aria-label='Previous'
                onClick={() => goToIndex(activeIndex - 1)}
                className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#2D2B3B] text-white'
              >
                <TabArrowIcon className='h-5 w-5 rotate-180' />
              </button>
              <div className='flex items-center gap-2'>
                {tabOptions.map((tab, index) => (
                  <span
                    key={tab.value}
                    onClick={() => goToIndex(index)}
                    className={`h-2 cursor-pointer rounded-full transition-all ${
                      index === activeIndex ? 'w-10 bg-white' : 'w-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>
              <button
                type='button'
                aria-label='Next'
                onClick={() => goToIndex(activeIndex + 1)}
                className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#2D2B3B] text-white'
              >
                <TabArrowIcon className='h-5 w-5' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DevInfoSection;
