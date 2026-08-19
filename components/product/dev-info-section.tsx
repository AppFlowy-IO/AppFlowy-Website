'use client';

import { useAutoPlay } from '@/lib/hooks/use-auto-play';
import { useInView } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useMemo } from 'react';
import { TabPanel } from '@/components/shared/tab-panel';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import DeployImage from '@/assets/images/dev-info/deploy-anywhere.webp';
import LocalAIImage from '@/assets/images/dev-info/local-ai.webp';
import ComplianceImage from '@/assets/images/dev-info/compliance.webp';
import ArchitectureImage from '@/assets/images/dev-info/architecture.webp';
import AdminImage from '@/assets/images/dev-info/admin.webp';
import AdminMobileImage from '@/assets/images/dev-info/admin-mobile.webp';


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

/**
 * A horizontal rule of the background grid, drawn in the content flow so it can sit at a
 * content-relative position. `-mx-8` cancels the content wrapper's mobile padding so the rule
 * bleeds to the section edges, and the dots land on the vertical rules via `--grid-x`.
 */
function GridRule({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`relative -mx-8 border-t border-[#5a5a5a] ${className ?? ''}`}>
      <span className='absolute left-[var(--grid-x)] top-0 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 bg-[#d9d9d9]' />
      <span className='absolute right-[var(--grid-x)] top-0 h-[5px] w-[5px] -translate-y-1/2 translate-x-1/2 bg-[#d9d9d9]' />
    </div>
  );
}

type Panel = {
  value: string;
  image: StaticImageData;
  /** Alternate crop for the mobile carousel, where the desktop artwork reads poorly. */
  mobileImage?: StaticImageData;
  title1: string;
  title2: string;
  desc: string;
};

/**
 * Panel artwork. Both the desktop grid and the mobile carousel stay mounted at every breakpoint
 * (the inactive one is only `display: none`), and browsers fetch an `<img src>` even when it is
 * hidden. So a panel with a mobile-specific crop renders a `<picture>`: the browser resolves the
 * media query itself and downloads exactly one file per viewport. Images are served unoptimized
 * (`images.unoptimized` in next.config), so dropping `next/image` here costs nothing.
 */
function PanelImage({ panel, sizes }: { panel: Panel; sizes: string }) {
  if (panel.mobileImage) {
    return (
      <picture>
        <source media='(min-width: 900px)' srcSet={panel.image.src} />
        <img
          loading={'eager'}
          className='absolute inset-0 h-full w-full object-cover'
          src={panel.mobileImage.src}
          alt={panel.title1}
        />
      </picture>
    );
  }

  return (
    <Image
      loading={'eager'}
      fill
      sizes={sizes}
      className='object-cover'
      src={panel.image.src}
      alt={panel.title1}
    />
  );
}

function DevInfoSection() {
  const [value, setValue] = React.useState('deploy');
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabOptions = useMemo(() => {
    return [
      {
        value: 'deploy',
        label: 'Deploy anywhere',
        icon: <DeployIcon />,
      },
      {
        value: 'local_ai',
        label: 'On-prem and local AI',
        icon: <LocalAIIcon />,
      },
      {
        value: 'compliance',
        label: 'Complete data sovereignty',
        icon: <ComplianceIcon />,
      },
      {
        value: 'architecture',
        label: 'Integrations & architecture',
        icon: <ArchitectureIcon />,
      },
      {
        value: 'admin',
        label: 'Centralised admin panel',
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

  const panels: Panel[] = useMemo(() => {
    return [
      {
        value: 'deploy',
        image: DeployImage,
        title1: 'On-prem, cloud,',
        title2: 'air-gapped',
        desc: 'Run AppFlowy on your infrastructure, in your cloud, or in a fully air-gapped environment.',
      },
      {
        value: 'local_ai',
        image: LocalAIImage,
        title1: "AI on your terms,",
        title2: "not your vendor's",
        desc: "Keep AI processing and data inside your environment. Power AppFlowy AI with self-hosted LLMs and embedding models.",
      },
      {
        value: 'compliance',
        image: ComplianceImage,
        title1: 'Your jurisdiction,',
        title2: 'Your data residency',
        desc: 'Control where your data is stored and processed to meet residency, security, and regulatory requirements. No vendor access to your self-hosted instance.',
      },
      {
        value: 'architecture',
        image: ArchitectureImage,
        title1: 'Fits into your existing',
        title2: 'stack',
        desc: 'SAML & OIDC SSO, SCIM, LDAP, MCP, and public APIs. Extend AppFlowy to fit your stack not the other way around.',
      },
      {
        value: 'admin',
        image: AdminImage,
        mobileImage: AdminMobileImage,
        title1: 'Full control, one view',
        title2: '',
        desc: 'Manage users, workspaces, and instance settings, enforce SSO and permissions, and access server management tools from the admin panel.',
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
    <section className='dev-info-section relative w-full overflow-hidden bg-[#0D091C] py-0 [--grid-x:16px] [--grid-y:80px] sm:[--grid-x:24px] sm:py-20 lg:[--grid-x:40px] xl:[--grid-x:80px]'>
      {/*
        Grid background. The vertical rules span the whole section at every breakpoint, tracking the
        content padding via `--grid-x`. The horizontal rules are inset from the section edges once
        the two-column layout kicks in at 900px; below that the carousel brackets itself with
        in-flow <GridRule /> instead.
      */}
      <div aria-hidden className='pointer-events-none absolute inset-0'>
        <div className='absolute inset-x-0 top-[var(--grid-y)] hidden border-t border-[#5a5a5a] min-[900px]:block' />
        <div className='absolute inset-x-0 bottom-[var(--grid-y)] hidden border-t border-[#5a5a5a] min-[900px]:block' />
        <div className='absolute inset-y-0 left-[var(--grid-x)] border-l border-[#5a5a5a]' />
        <div className='absolute inset-y-0 right-[var(--grid-x)] border-r border-[#5a5a5a]' />

        <span className='absolute left-[var(--grid-x)] top-[var(--grid-y)] hidden h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 bg-[#d9d9d9] min-[900px]:block' />
        <span className='absolute right-[var(--grid-x)] top-[var(--grid-y)] hidden h-[5px] w-[5px] -translate-y-1/2 translate-x-1/2 bg-[#d9d9d9] min-[900px]:block' />
        <span className='absolute bottom-[var(--grid-y)] left-[var(--grid-x)] hidden h-[5px] w-[5px] -translate-x-1/2 translate-y-1/2 bg-[#d9d9d9] min-[900px]:block' />
        <span className='absolute bottom-[var(--grid-y)] right-[var(--grid-x)] hidden h-[5px] w-[5px] translate-x-1/2 translate-y-1/2 bg-[#d9d9d9] min-[900px]:block' />
      </div>

      <div className='relative mx-auto flex w-full max-w-[1440px] flex-col px-8 py-20 sm:px-10 lg:px-12 xl:px-20'>
        <div className='align-items-start mb-8 flex w-full flex-col lg:mb-10 xl:mb-12'>
          <h1 className='text-style-h1 font-bold text-white'>Built for teams who own their stack</h1>
          <h5 className='text-style-h5 mt-2 text-text-tertiary font-normal'>Your infrastructure. Your data. Your rules.</h5>
        </div>
        <GridRule className='mb-12 min-[900px]:hidden' />
        <div ref={ref}>
          <div className='hidden grid-cols-2 items-stretch gap-6 min-[900px]:grid lg:gap-10 xl:gap-20'>
            <MuiTabs
              className='w-full'
              orientation='vertical'
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{ style: { display: 'none' } }}
              sx={{
                '& .MuiTabs-flexContainer': {
                  gap: '8px',
                  '@media (min-width: 1280px)': {
                    gap: '12px',
                  },
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
                    maxWidth: '520px',
                    minWidth: 0,
                    padding: 0,
                    textTransform: 'none',
                    alignItems: 'stretch',
                  }}
                  label={
                    <div
                      className={`flex w-full items-center justify-between gap-2 rounded-[12px] border-2 px-3 py-3 text-left transition-colors lg:gap-3 lg:px-5 lg:py-5 xl:gap-4 xl:px-8 xl:py-7 ${value === tab.value
                        ? 'border-[#BEBEBE] bg-[#0F0A1E]'
                        : 'border-[#2D2B3B] bg-[#161325] hover:bg-gray-03'
                        }`}
                    >
                      <div className='flex min-w-0 items-center gap-2.5 lg:gap-3 xl:gap-4'>
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] transition-colors lg:h-10 lg:w-10 xl:h-12 xl:w-12 ${value === tab.value ? 'bg-white text-night-blue' : 'bg-gray-10 text-white'
                            }`}
                        >
                          {tab.icon}
                        </div>
                        <span className='text-style-body-standard truncate font-mono font-semibold text-white xl:text-style-h5'>
                          {tab.label}
                        </span>
                      </div>
                      {value === tab.value && (
                        <span className='shrink-0 text-white'>
                          <TabArrowIcon className='h-5 w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8' />
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
                  <div className='flex w-full flex-col items-end'>
                    <div className='relative h-[220px] max-w-[450px] w-full shrink-0 overflow-hidden rounded-[12px] lg:h-[270px] xl:h-[320px]'>
                      <PanelImage panel={panel} sizes='(max-width: 900px) 100vw, 50vw' />
                    </div>
                    <div className='mt-5 flex flex-col gap-3 max-w-[450px] lg:mt-6 lg:gap-4 xl:mt-8 xl:gap-5'>
                      <div className='text-style-h2 font-semibold text-white'>
                        <h2>{panel.title1}</h2>
                        <h2>{panel.title2}</h2>
                      </div>
                      <p className='text-style-h5 whitespace-pre-wrap text-gray-40'>{panel.desc}</p>
                    </div>
                  </div>
                </TabPanel>
              ))}
            </div>
          </div>
          <div className='flex w-full flex-col min-[900px]:hidden'>
            <div className='flex items-center gap-2 text-white'>
              <span className='shrink-0'>{tabOptions[activeIndex]?.icon}</span>
              <span className='text-sm font-mono text-white'>{tabOptions[activeIndex]?.label}</span>
            </div>
            {activePanel && (
              <div className='mt-6 flex w-full flex-col'>
                <div className='relative h-[328px] w-full shrink-0 overflow-hidden rounded-[12px] sm:h-[380px]'>
                  <PanelImage panel={activePanel} sizes='100vw' />
                </div>
                <div className='mt-8 flex min-h-[172px] flex-col gap-3'>
                  <div className='text-style-h2 font-semibold text-white'>
                    <h2>{activePanel.title1}</h2>
                    <h2>{activePanel.title2}</h2>
                  </div>
                  <p className='text-base whitespace-pre-wrap text-text-tertiary'>{activePanel.desc}</p>
                </div>
              </div>
            )}
            <GridRule className='mt-10' />
            <div className='mt-10 flex w-full items-center justify-between'>
              <button
                type='button'
                aria-label='Previous'
                onClick={() => goToIndex(activeIndex - 1)}
                className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#2D2B3B] text-white'
              >
                <TabArrowIcon className='h-5 w-5 rotate-180' />
              </button>
              <div className='flex items-center gap-2'>
                {tabOptions.map((tab, index) => (
                  <span
                    key={tab.value}
                    onClick={() => goToIndex(index)}
                    className={`h-2 cursor-pointer rounded-full transition-all ${index === activeIndex ? 'w-10 bg-white' : 'w-2 bg-white/40'
                      }`}
                  />
                ))}
              </div>
              <button
                type='button'
                aria-label='Next'
                onClick={() => goToIndex(activeIndex + 1)}
                className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#2D2B3B] text-white'
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
