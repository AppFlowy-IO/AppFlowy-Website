'use client';

import React, { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Select from '@radix-ui/react-select';
import { comparisonPlans, comparisonFeatureGroups, ComparisonPlan } from '../config/comparison-data';
import { SupportedIcon, NotSupportedIcon, TooltipIcon } from './table-icons';
import { UpgradeDialog } from './upgrade-dialog';
import { ContactDialog } from './contact-dialog';

export function MobileComparisonTable() {
  const [selectedPlan, setSelectedPlan] = useState<ComparisonPlan>(comparisonPlans[0]);
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [openTooltips, setOpenTooltips] = useState<Set<string>>(new Set());

  const handlePlanChange = (planId: string) => {
    const plan = comparisonPlans.find((p) => p.id === planId);

    if (plan) {
      setSelectedPlan(plan);
    }
  };

  const handleUpgradeClick = () => {
    setIsUpgradeDialogOpen(true);
  };

  const handleContactClick = () => {
    setIsContactDialogOpen(true);
  };

  const handleTooltipToggle = (featureId: string) => {
    setOpenTooltips((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(featureId)) {
        newSet.delete(featureId);
      } else {
        newSet.add(featureId);
      }

      return newSet;
    });
  };

  return (
    <div className='w-full bg-white px-4 pt-6'>
      {/* Plan Selector */}
      <div className='mb-6'>
        <Select.Root value={selectedPlan.id} onValueChange={handlePlanChange}>
          <Select.Trigger className='flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9327FF]'>
            <Select.Value>
              <span className='font-medium text-[#21232A]' style={{ fontFamily: '"SF Pro Text"' }}>
                {selectedPlan.name} Plan
              </span>
            </Select.Value>
            <Select.Icon className='ml-2'>
              <svg width='12' height='8' viewBox='0 0 12 8' fill='none'>
                <path
                  d='M1 1.5L6 6.5L11 1.5'
                  stroke='#6B7280'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className='z-50 min-w-[200px] rounded-lg border border-gray-200 bg-white shadow-lg'>
              <Select.Viewport className='p-1'>
                {comparisonPlans.map((plan) => (
                  <Select.Item
                    key={plan.id}
                    value={plan.id}
                    className='flex cursor-pointer items-center rounded-md px-3 py-2 text-sm hover:bg-gray-50 focus:bg-[#9327FF] focus:text-white focus:outline-none data-[highlighted]:bg-[#9327FF] data-[highlighted]:text-white'
                  >
                    <Select.ItemText>
                      <div className='flex flex-col'>
                        <span className='font-medium' style={{ fontFamily: '"SF Pro Text"' }}>
                          {plan.name}
                        </span>
                        <span className='text-xs opacity-70' style={{ fontFamily: '"SF Pro Text"' }}>
                          {plan.price.amount}
                          {plan.price.period && ` / ${plan.price.period}`}
                        </span>
                      </div>
                    </Select.ItemText>
                    <Select.ItemIndicator className='ml-auto'>
                      <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                        <path
                          d='M13.5 4.5L6 12L2.5 8.5'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* Selected Plan Details */}
      <div className='mb-6 w-full rounded-lg bg-gray-50 p-4'>
        <div className='w-full text-center'>
          <h3 className='mb-2 text-xl font-bold leading-[24px] text-[#21232A]' style={{ fontFamily: '"SF Pro Text"' }}>
            {selectedPlan.name}
          </h3>

          <div className='mb-2 text-[#21232A]'>
            {selectedPlan.price.period ? (
              <div>
                <span className='text-2xl font-semibold' style={{ fontFamily: '"SF Pro Text"' }}>
                  {selectedPlan.price.amount}
                </span>
                {selectedPlan.price.period && (
                  <span className='ml-1 text-base font-normal' style={{ fontFamily: '"SF Pro Text"' }}>
                    / {selectedPlan.price.period}
                  </span>
                )}
              </div>
            ) : (
              <span className='text-2xl font-normal' style={{ fontFamily: '"SF Pro Text"' }}>
                {selectedPlan.price.amount}
              </span>
            )}
          </div>

          {selectedPlan.billingInfo && (
            <div className='mb-4 text-sm text-[#6F748C]' style={{ fontFamily: '"SF Pro Text"' }}>
              {selectedPlan.billingInfo}
            </div>
          )}

          {selectedPlan.id !== 'free' && (
            <button
              onClick={
                selectedPlan.cta.variant === 'upgrade'
                  ? handleUpgradeClick
                  : selectedPlan.cta.variant === 'contact'
                  ? handleContactClick
                  : undefined
              }
              className={`w-full rounded-lg px-6 py-3 font-medium transition-colors ${
                selectedPlan.cta.variant === 'contact'
                  ? 'border-2 border-[#9327FF] text-[#9327FF] hover:bg-[#9327FF] hover:text-white'
                  : 'bg-[#9327FF] text-white hover:bg-[#7A1FD9]'
              }`}
            >
              {selectedPlan.cta.text}
            </button>
          )}
        </div>
      </div>

      {/* Features by Group */}
      <div className='space-y-6'>
        {comparisonFeatureGroups.map((group) => (
          <div key={group.id} className='overflow-hidden rounded-lg border border-gray-200 bg-white'>
            {/* Group Title */}
            <div className='border-b border-gray-200 bg-gray-50 px-4 py-3'>
              <h4 className='text-lg font-medium leading-[24px] text-[#21232A]' style={{ fontFamily: '"SF Pro Text"' }}>
                {group.title}
              </h4>
            </div>

            {/* Features */}
            <div className='divide-y divide-gray-100'>
              {group.features.map((feature) => (
                <div key={feature.id} className='flex items-center justify-between px-4 py-3'>
                  <div className='flex flex-1 items-center'>
                    <span
                      className='text-sm font-normal leading-5 text-[#21232A]'
                      style={{ fontFamily: '"SF Pro Text"' }}
                    >
                      {feature.name}
                    </span>
                    {feature.tooltip && (
                      <Tooltip.Root
                        open={openTooltips.has(feature.id)}
                        onOpenChange={(open) => {
                          if (!open) {
                            setOpenTooltips((prev) => {
                              const newSet = new Set(prev);

                              newSet.delete(feature.id);

                              return newSet;
                            });
                          }
                        }}
                      >
                        <Tooltip.Trigger asChild>
                          <div
                            className='ml-2 flex-shrink-0 cursor-help'
                            onClick={() => handleTooltipToggle(feature.id)}
                          >
                            <TooltipIcon />
                          </div>
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

                  <div className='ml-4 flex-shrink-0'>
                    {typeof feature.support[selectedPlan.id] === 'string' ? (
                      <span className='text-sm font-medium text-[#21232A]' style={{ fontFamily: '"SF Pro Text"' }}>
                        {feature.support[selectedPlan.id]}
                      </span>
                    ) : feature.support[selectedPlan.id] === true ? (
                      <SupportedIcon />
                    ) : (
                      <NotSupportedIcon />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <UpgradeDialog isOpen={isUpgradeDialogOpen} onClose={() => setIsUpgradeDialogOpen(false)} />

      <ContactDialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen} />
    </div>
  );
}