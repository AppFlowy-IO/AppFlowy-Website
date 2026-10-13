'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import * as Tooltip from '@radix-ui/react-tooltip';
import type { ComparisonFeature, ComparisonFeatureGroup, ComparisonPlan } from '../config/comparison-data';
import { SupportedIcon, NotSupportedIcon, TooltipIcon } from './table-icons';
import { UpgradeDialog } from './upgrade-dialog';
import { useContactDialog } from '@/components/shared/contact-dialog-provider';
import { usePricingState } from './pricing-state-context';

interface MobileComparisonTableProps {
  plans: ComparisonPlan[];
  featureGroups: ComparisonFeatureGroup[];
}

function PlanAction({
  plan,
  onUpgrade,
  onContact,
}: {
  plan: ComparisonPlan;
  onUpgrade: () => void;
  onContact: () => void;
}) {
  if (plan.id === 'free') {
    return <div aria-hidden='true' className='mt-5 h-10' />;
  }

  const className = `flex h-10 w-full items-center justify-center rounded-lg px-4 py-2 font-inter text-base font-medium leading-6 ${
    plan.cta.variant === 'contact'
      ? 'border border-[#854CFF] bg-white text-[#854CFF]'
      : 'bg-[#140F28] text-white'
  }`;

  return (
    <div className='mt-5 h-10 px-1'>
      {plan.cta.variant === 'link' && plan.cta.href ? (
        <Link href={plan.cta.href} className={className}>
          {plan.cta.text}
        </Link>
      ) : (
        <button type='button' onClick={plan.cta.variant === 'contact' ? onContact : onUpgrade} className={className}>
          {plan.cta.text}
        </button>
      )}
    </div>
  );
}

function FeatureName({
  feature,
  isTooltipOpen,
  onTooltipToggle,
  onTooltipClose,
}: {
  feature: ComparisonFeature;
  isTooltipOpen: boolean;
  onTooltipToggle: () => void;
  onTooltipClose: () => void;
}) {
  return (
    <div className='sticky left-0 z-10 flex h-12 min-w-0 items-center border-b border-[#E6E6E6] bg-white px-2 py-3'>
      <span className='whitespace-nowrap font-inter text-sm font-normal leading-5 text-[#21232A]'>{feature.name}</span>
      {feature.tooltip && (
        <Tooltip.Root
          open={isTooltipOpen}
          onOpenChange={(open) => {
            if (!open) onTooltipClose();
          }}
        >
          <Tooltip.Trigger asChild>
            <button
              type='button'
              aria-label={`More information about ${feature.name}`}
              onClick={onTooltipToggle}
              className='inline-flex h-6 w-6 shrink-0 cursor-help items-center justify-center'
            >
              <TooltipIcon />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className='z-50 max-w-xs whitespace-pre-wrap break-words rounded-md bg-gray-900 px-3 py-2 text-sm text-white'
              sideOffset={5}
            >
              {feature.tooltip}
              <Tooltip.Arrow className='fill-gray-900' />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      )}
    </div>
  );
}

function PlanSupport({ feature, plan }: { feature: ComparisonFeature; plan: ComparisonPlan }) {
  const value = feature.support[plan.id];

  return (
    <div className='flex h-12 min-w-0 items-center justify-center border-b border-[#E6E6E6] px-2 py-3 text-center'>
      {typeof value === 'string' ? (
        <span className='whitespace-nowrap font-inter text-sm font-normal leading-6 text-[#21232A]'>{value}</span>
      ) : value ? (
        <SupportedIcon />
      ) : (
        <NotSupportedIcon />
      )}
    </div>
  );
}

export function MobileComparisonTable({ plans, featureGroups }: MobileComparisonTableProps) {
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  const [openTooltips, setOpenTooltips] = useState<Set<string>>(new Set());
  const { openContactDialog } = useContactDialog();
  const { deploymentMode } = usePricingState();
  const isCloud = deploymentMode === 'cloud';
  const featureColumnWidth = 240;
  const planColumnWidth = isCloud ? 280 : 180;
  const planHeaderHeight = isCloud ? 156 : 136;
  const columns = `${featureColumnWidth}px repeat(${plans.length}, ${planColumnWidth}px)`;
  const tableWidth = featureColumnWidth + plans.length * planColumnWidth;

  const toggleTooltip = (featureId: string) => {
    setOpenTooltips((current) => {
      const next = new Set(current);

      if (next.has(featureId)) next.delete(featureId);
      else next.add(featureId);

      return next;
    });
  };

  const closeTooltip = (featureId: string) => {
    setOpenTooltips((current) => {
      const next = new Set(current);
      next.delete(featureId);
      return next;
    });
  };

  const handleContactClick = () => {
    openContactDialog({ deploymentMode });
  };

  return (
    <section className='w-full bg-white py-20 pl-4'>
      <div
        role='region'
        aria-label='Plan comparison. Scroll horizontally to compare plans.'
        tabIndex={0}
        className='mobile-comparison-scroll w-full overflow-x-auto overscroll-x-contain'
      >
        {/* Keep the trailing gutter inside the scrollable content. */}
        <div className='box-content w-max pr-4' style={{ width: tableWidth }}>
          <div className='grid' style={{ gridTemplateColumns: columns }}>
            <div aria-hidden='true' className='sticky left-0 z-20 bg-white' />
            {plans.map((plan) => (
              <div
                key={plan.id}
                className='flex flex-col items-center text-center'
                style={{ height: planHeaderHeight }}
              >
                <div
                  className='flex w-full flex-col items-center gap-1 overflow-hidden font-inter text-[#21232A]'
                  style={{ height: planHeaderHeight - 60 }}
                >
                  <h3 className='w-full text-base font-bold leading-6'>{plan.name}</h3>
                  <p className='w-full text-sm leading-5'>
                    <span className='font-bold'>{plan.price.amount}</span>
                    {plan.price.period && <span className='font-normal'> / {plan.price.period}</span>}
                  </p>
                  {plan.billingInfo && (
                    <p className='w-full text-sm leading-5 text-[#AAA]'>{plan.billingInfo}</p>
                  )}
                  {plan.description && <p className='w-full text-sm leading-5 text-[#AAA]'>{plan.description}</p>}
                </div>
                <PlanAction
                  plan={plan}
                  onUpgrade={() => setIsUpgradeDialogOpen(true)}
                  onContact={handleContactClick}
                />
              </div>
            ))}
          </div>

          <div className='mt-10 space-y-10'>
            {featureGroups.map((group, groupIndex) => {
              const categoryHeaderHeight = isCloud && groupIndex === 0 ? 76 : 48;

              return (
                <div key={group.id}>
                  <div className='grid' style={{ gridTemplateColumns: columns }}>
                    <div
                      className={`sticky left-0 z-10 flex border-b border-[#E6E6E6] bg-white px-2 ${
                        categoryHeaderHeight === 76 ? 'items-start pt-[10px]' : 'items-center py-[10px]'
                      }`}
                      style={{ height: categoryHeaderHeight }}
                    >
                      <h3 className='font-inter text-xl font-semibold leading-7 text-[#21232A]'>
                        {group.title}
                      </h3>
                    </div>
                    {plans.map((plan) => (
                      <div
                        key={plan.id}
                        aria-hidden='true'
                        className='border-b border-[#E6E6E6]'
                        style={{ height: categoryHeaderHeight }}
                      />
                    ))}
                  </div>
                  {group.features.map((feature) => (
                    <div key={feature.id} className='grid' style={{ gridTemplateColumns: columns }}>
                      <FeatureName
                        feature={feature}
                        isTooltipOpen={openTooltips.has(feature.id)}
                        onTooltipToggle={() => toggleTooltip(feature.id)}
                        onTooltipClose={() => closeTooltip(feature.id)}
                      />
                      {plans.map((plan) => (
                        <PlanSupport key={plan.id} feature={feature} plan={plan} />
                      ))}
                    </div>
                  ))}
                  </div>
              );
            })}
          </div>
        </div>
      </div>
      <UpgradeDialog isOpen={isUpgradeDialogOpen} onClose={() => setIsUpgradeDialogOpen(false)} />
    </section>
  );
}
