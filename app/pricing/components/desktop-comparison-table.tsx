'use client';

import React, { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { comparisonPlans, comparisonFeatureGroups } from '../config/comparison-data';
import { SupportedIcon, NotSupportedIcon, TooltipIcon } from './table-icons';
import { UpgradeDialog } from './upgrade-dialog';

export function DesktopComparisonTable() {
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);

  const handleUpgradeClick = () => {
    setIsUpgradeDialogOpen(true);
  };

  return (
    <div className="w-full bg-white pt-6">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[170px]">
        <div className="w-full max-w-[1100px] mx-auto overflow-x-auto">
          <table className="w-full">
            {/* Table Header - Plans */}
            <thead>
              <tr>
                {/* Empty cell for feature column */}
                <th className="p-4 text-left"></th>
                
                {/* Plan columns */}
                {comparisonPlans.map((plan) => (
                  <th key={plan.id} className="px-2 py-4 text-center min-w-[128px]">
                    <div className="flex flex-col w-full items-center">
                      {/* Plan Name */}
                      <div className="text-[#21232A] text-center font-bold text-base leading-[22px]" style={{ fontFamily: '"SF Pro Text"' }}>
                        {plan.name}
                      </div>
                      
                      {/* Price */}
                      <div className="text-[#21232A] text-center">
                        {plan.price.period ? (
                          <div>
                            <span className="font-semibold text-base leading-[22px]" style={{ fontFamily: '"SF Pro Text"' }}>
                              {plan.price.amount}
                            </span>
                            {plan.price.period && (
                              <span className="font-normal text-sm leading-[20px] ml-1" style={{ fontFamily: '"SF Pro Text"' }}>
                                / {plan.price.period}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="font-normal text-base leading-[22px]" style={{ fontFamily: '"SF Pro Text"' }}>
                            {plan.price.amount}
                          </span>
                        )}
                      </div>
                      
                      {/* Billing Info */}
                      <div className={`text-[#6F748C] text-center text-xs leading-[18px] font-normal tracking-[0.1px] ${
                        !plan.billingInfo ? 'invisible' : ''
                      }`} style={{ fontFamily: '"SF Pro Text"' }}>
                        {plan.billingInfo || 'placeholder'}
                      </div>
                      
                      {/* CTA Button */}
                      <div className="mt-4 w-full">
                        <button 
                          onClick={plan.cta.variant === 'upgrade' ? handleUpgradeClick : undefined}
                          className={`flex min-w-[76px] w-full justify-center items-center self-stretch rounded-[8px] transition-colors font-normal ${
                          plan.cta.variant === 'contact' 
                            ? 'border border-[#9327FF] text-[#9327FF] hover:bg-[#9327FF] hover:text-white' 
                            : 'bg-[#9327FF] text-white hover:bg-[#7A1FD9]'
                        } ${plan.id === 'free' ? 'invisible' : ''}`}
                        style={{ padding: '6px 12px' }}>
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
                    <td className="px-4 pt-6 pb-2 text-left">
                      <h3 className="text-[#21232A] font-medium text-xl leading-[28px]" style={{ fontFamily: '"SF Pro Text"' }}>
                        {group.title}
                      </h3>
                    </td>
                    {/* Empty cells for plan columns */}
                    {comparisonPlans.map((plan) => (
                      <td key={plan.id} className="px-2 pt-6 pb-2"></td>
                    ))}
                  </tr>
                  
                  {/* Group Features */}
                  {group.features.map((feature, featureIndex) => {
                    return (
                      <tr key={feature.id} className="h-8">
                        {/* Feature Name */}
                        <td className="p-2">
                          <div className="flex items-center px-2 justify-start self-stretch h-full">
                            <span className="text-[#21232A] text-left font-normal text-sm leading-5" style={{ fontFamily: '"SF Pro Text"' }}>
                              {feature.name}
                            </span>
                            {feature.tooltip && (
                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <div className="ml-2 flex-shrink-0 cursor-help">
                                    <TooltipIcon />
                                  </div>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Content
                                    className="bg-gray-900 max-w-xs whitespace-pre-wrap break-words text-white px-3 py-2 rounded-md text-sm z-50"
                                    sideOffset={5}
                                  >
                                    {feature.tooltip}
                                    <Tooltip.Arrow className="fill-gray-900" />
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            )}
                          </div>
                        </td>
                        
                        {/* Support Status for each plan */}
                        {comparisonPlans.map((plan) => (
                          <td key={plan.id} className="px-2 py-2 text-center">
                            <div className="flex items-center justify-center self-stretch h-full">
                              {typeof feature.support[plan.id] === 'string' ? (
                                <span className="text-[#21232A] font-normal text-sm leading-5" style={{ fontFamily: '"SF Pro Text"' }}>
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
      
      <UpgradeDialog 
        isOpen={isUpgradeDialogOpen} 
        onClose={() => setIsUpgradeDialogOpen(false)} 
      />
    </div>
  );
}