'use client';

import React, { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { comparisonPlans, comparisonFeatureGroups } from '../config/comparison-data';
import { SupportedIcon, NotSupportedIcon, TooltipIcon } from './table-icons';
import { UpgradeDialog } from './upgrade-dialog';
import { ContactDialog } from './contact-dialog';

export function DesktopComparisonTable() {
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  const handleUpgradeClick = () => {
    setIsUpgradeDialogOpen(true);
  };

  const handleContactClick = () => {
    setIsContactDialogOpen(true);
  };

  return (
    <div className='w-full bg-white pt-6'>
      <div className='w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[170px]'>
        <div className='custom-scrollbar mx-auto w-full max-w-[1100px] overflow-x-auto'>
          <table className='w-full min-w-[800px]'>
            {/* Table Header - Plans */}
            <thead>
              <tr>
                {/* Empty cell for feature column */}
                <th className='p-4 text-left'></th>

                {/* Plan columns */}
                {comparisonPlans.map((plan) => (
                  <th key={plan.id} className='min-w-[148px] px-2 py-4 text-center'>
                    <div className='flex w-full flex-col items-center'>
                      {/* Plan Name */}
                      <div
                        className='text-center text-base font-bold leading-[22px] text-[#21232A]'
                        style={{ fontFamily: '"SF Pro Text"' }}
                      >
                        {plan.name}
                      </div>

                      {/* Price */}
                      <div className='text-center text-[#21232A]'>
                        {plan.price.period ? (
                          <div>
                            <span
                              className='text-base font-semibold leading-[22px]'
                              style={{ fontFamily: '"SF Pro Text"' }}
                            >
                              {plan.price.amount}
                            </span>
                            {plan.price.period && (
                              <span
                                className='ml-1 text-sm font-normal leading-[20px]'
                                style={{ fontFamily: '"SF Pro Text"' }}
                              >
                                / {plan.price.period}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className='text-base font-normal leading-[22px]' style={{ fontFamily: '"SF Pro Text"' }}>
                            {plan.price.amount}
                          </span>
                        )}
                      </div>

                      {/* Billing Info */}
                      <div
                        className={`text-center text-xs font-normal leading-[18px] tracking-[0.1px] text-[#6F748C] ${
                          !plan.billingInfo ? 'invisible' : ''
                        }`}
                        style={{ fontFamily: '"SF Pro Text"' }}
                      >
                        {plan.billingInfo || 'placeholder'}
                      </div>

                      {/* CTA Button */}
                      <div className='mt-4 w-full'>
                        <button
                          onClick={
                            plan.cta.variant === 'upgrade'
                              ? handleUpgradeClick
                              : plan.cta.variant === 'contact'
                              ? handleContactClick
                              : undefined
                          }
                          className={`flex w-full min-w-[76px] items-center justify-center self-stretch rounded-[8px] font-normal transition-colors ${
                            plan.cta.variant === 'contact'
                              ? 'border border-[#9327FF] text-[#9327FF] hover:bg-[#9327FF] hover:text-white'
                              : 'bg-[#9327FF] text-white hover:bg-[#7A1FD9]'
                          } ${plan.id === 'free' ? 'invisible' : ''}`}
                          style={{ padding: '6px 12px' }}
                        >
                          {plan.cta.text}
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body - Feature Groups */}
            <tbody>
              {comparisonFeatureGroups.map((group) => (
                <React.Fragment key={group.id}>
                  {/* Group Title Row */}
                  <tr>
                    <td className='px-4 pb-2 pt-6 text-left'>
                      <h3
                        className='text-xl font-medium leading-[28px] text-[#21232A]'
                        style={{ fontFamily: '"SF Pro Text"' }}
                      >
                        {group.title}
                      </h3>
                    </td>
                    {/* Empty cells for plan columns */}
                    {comparisonPlans.map((plan) => (
                      <td key={plan.id} className='px-2 pb-2 pt-6'></td>
                    ))}
                  </tr>

                  {/* Group Features */}
                  {group.features.map((feature) => {
                    return (
                      <tr key={feature.id} className='h-8'>
                        {/* Feature Name */}
                        <td className='min-w-[270px] p-2'>
                          <div className='flex h-full items-center justify-start self-stretch px-2'>
                            <span
                              className='text-left text-sm font-normal leading-5 text-[#21232A]'
                              style={{ fontFamily: '"SF Pro Text"' }}
                            >
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
                        {comparisonPlans.map((plan) => (
                          <td key={plan.id} className='px-2 py-2 text-center'>
                            <div className='flex h-full items-center justify-center self-stretch'>
                              {typeof feature.support[plan.id] === 'string' ? (
                                <span
                                  className='text-sm font-normal leading-5 text-[#21232A]'
                                  style={{ fontFamily: '"SF Pro Text"' }}
                                >
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
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UpgradeDialog isOpen={isUpgradeDialogOpen} onClose={() => setIsUpgradeDialogOpen(false)} />

      <ContactDialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen} />
    </div>
  );
}