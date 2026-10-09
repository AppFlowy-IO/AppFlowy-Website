'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import * as Tooltip from '@radix-ui/react-tooltip';
import type { ComparisonFeatureGroup, ComparisonPlan } from '../config/comparison-data';
import { SupportedIcon, NotSupportedIcon, TooltipIcon } from './table-icons';
import { UpgradeDialog } from './upgrade-dialog';
import { useContactDialog } from '@/components/shared/contact-dialog-provider';
import { usePricingState } from './pricing-state-context';

interface DesktopComparisonTableProps {
  plans: ComparisonPlan[];
  featureGroups: ComparisonFeatureGroup[];
}

export function DesktopComparisonTable({ plans, featureGroups }: DesktopComparisonTableProps) {
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  const { openContactDialog } = useContactDialog();
  const { deploymentMode } = usePricingState();
  const isCloud = deploymentMode === 'cloud';
  const featureColumnWidth = isCloud ? 360 : 240;
  const headerHeight = isCloud ? 156 : 136;
  const ctaWidthClassName = 'mx-auto w-[calc(100%_-_8px)]';

  const handleUpgradeClick = () => {
    setIsUpgradeDialogOpen(true);
  };

  const handleContactClick = () => {
    openContactDialog({ deploymentMode });
  };

  return (
    <div className='w-full bg-white pb-[120px] pt-[80px]'>
      <div className='w-full px-4 sm:px-6 lg:px-8'>
        <div className='custom-scrollbar mx-auto w-full max-w-[960px] overflow-x-auto'>
          <table className='w-full table-fixed border-collapse font-inter' style={{ minWidth: '960px' }}>
            <colgroup>
              <col style={{ width: `${featureColumnWidth}px` }} />
              {plans.map((plan) => (
                <col key={plan.id} />
              ))}
            </colgroup>

            {/* Table Header - Plans */}
            <thead>
              <tr style={{ height: `${headerHeight}px` }}>
                {/* Empty cell for feature column */}
                <th className='p-0 text-left'></th>

                {/* Plan columns */}
                {plans.map((plan) => (
                  <th key={plan.id} className='px-2 py-0 text-center align-top'>
                    <div className='flex w-full flex-col items-center gap-1'>
                      {/* Plan Name */}
                      <div className='text-center text-base font-bold leading-6 text-[#21232A]'>{plan.name}</div>

                      {/* Price */}
                      <div className='text-center leading-5 text-[#21232A]'>
                        {plan.price.period ? (
                          <div>
                            <span className='text-sm font-bold leading-5'>{plan.price.amount}</span>
                            {plan.price.period && (
                              <span className='ml-1 text-sm font-normal leading-5'>/ {plan.price.period}</span>
                            )}
                          </div>
                        ) : (
                          <span className='text-sm font-normal leading-5'>{plan.price.amount}</span>
                        )}
                      </div>

                      {/* Billing Info */}
                      <div
                        className={`text-center text-sm font-normal leading-5 text-[#AAA] ${
                          !plan.billingInfo ? 'invisible' : ''
                        }`}
                      >
                        {plan.billingInfo || 'placeholder'}
                      </div>

                      {plan.description && (
                        <div className='text-center text-sm font-normal leading-5 text-[#AAA]'>{plan.description}</div>
                      )}

                      {/* CTA Button */}
                      <div className={`mt-4 ${ctaWidthClassName}`}>
                        {plan.cta.variant === 'link' && plan.cta.href ? (
                          <Link
                            href={plan.cta.href}
                            className='flex h-10 w-full min-w-[76px] items-center justify-center self-stretch rounded-lg bg-[#140F28] px-4 py-2 font-medium text-white transition-colors hover:bg-[#29213D]'
                          >
                            {plan.cta.text}
                          </Link>
                        ) : (
                          <button
                            onClick={
                              plan.cta.variant === 'upgrade'
                                ? handleUpgradeClick
                                : plan.cta.variant === 'contact'
                                ? handleContactClick
                                : undefined
                            }
                            className={`flex h-10 w-full min-w-[76px] items-center justify-center self-stretch rounded-lg font-medium transition-colors ${
                              plan.cta.variant === 'contact'
                                ? 'border border-[#854CFF] text-[#854CFF] hover:bg-[#854CFF] hover:text-white'
                                : 'bg-[#140F28] text-white hover:bg-[#29213D]'
                            } ${plan.id === 'free' ? 'invisible' : ''}`}
                            style={{ padding: '8px 16px' }}
                          >
                            {plan.cta.text}
                          </button>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body - Feature Groups */}
            <tbody>
              <tr aria-hidden='true'>
                <td colSpan={plans.length + 1} className='h-10 border-0 p-0' />
              </tr>
              {featureGroups.map((group) => (
                <React.Fragment key={group.id}>
                  {/* Group Title Row */}
                  <tr className='h-12'>
                    <td className='border-b border-[#E6E6E6] px-2 py-2 text-left'>
                      <h3 className='text-xl font-semibold leading-7 text-[#21232A]'>{group.title}</h3>
                    </td>
                    {/* Empty cells for plan columns */}
                    {plans.map((plan) => (
                      <td key={plan.id} className='border-b border-[#E6E6E6]'></td>
                    ))}
                  </tr>

                  {/* Group Features */}
                  {group.features.map((feature) => {
                    return (
                      <tr key={feature.id} className='h-12'>
                        {/* Feature Name */}
                        <td className='border-b border-[#E6E6E6] px-2 py-3'>
                          <div className='flex h-full items-center justify-start self-stretch'>
                            <span className='text-left text-sm font-normal leading-5 text-[#21232A]'>
                              {feature.name}
                            </span>
                            {feature.tooltip && (
                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <div className='ml-2 flex-shrink-0 cursor-help'>
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
                        </td>

                        {/* Support Status for each plan */}
                        {plans.map((plan) => (
                          <td key={plan.id} className='border-b border-[#E6E6E6] px-2 py-3 text-center'>
                            <div className='flex h-full items-center justify-center self-stretch'>
                              {typeof feature.support[plan.id] === 'string' ? (
                                <span className='text-sm font-normal leading-6 text-[#21232A]'>
                                  {feature.support[plan.id]}
                                </span>
                              ) : feature.support[plan.id] === true ? (
                                <SupportedIcon />
                              ) : (
                                <NotSupportedIcon />
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                  {group.id !== featureGroups[featureGroups.length - 1]?.id && (
                    <tr aria-hidden='true'>
                      <td colSpan={plans.length + 1} className='h-10 border-0 p-0' />
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UpgradeDialog isOpen={isUpgradeDialogOpen} onClose={() => setIsUpgradeDialogOpen(false)} />
    </div>
  );
}
