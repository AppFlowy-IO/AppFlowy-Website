'use client';

import React, { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { comparisonPlans, comparisonFeatureGroups } from '../config/comparison-data';
import { SupportedIcon, NotSupportedIcon, TooltipIcon } from './table-icons';
import { UpgradeDialog } from './upgrade-dialog';

export function TabletComparisonTable() {
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);

  const handleUpgradeClick = () => {
    setIsUpgradeDialogOpen(true);
  };

  return (
    <div className="w-full bg-white pt-6">
      <div className="w-full px-4 sm:px-6">
        <div className="relative">
          {/* Fixed First Column */}
          <div className="absolute left-4 sm:left-6 top-0 bg-white z-10 border-r border-gray-200">
            <div className="w-48">
              {/* Header */}
              <div className="h-32 p-4 border-b border-gray-200">
                <div className="text-sm font-medium text-gray-500">Features</div>
              </div>
              
              {/* Feature Groups */}
              {comparisonFeatureGroups.map((group) => (
                <div key={group.id}>
                  {/* Group Title */}
                  <div className="px-4 pt-6 pb-2 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-[#21232A] font-medium text-lg leading-[24px]" style={{ fontFamily: '"SF Pro Text"' }}>
                      {group.title}
                    </h3>
                  </div>
                  
                  {/* Features */}
                  {group.features.map((feature) => (
                    <div key={feature.id} className="h-10 px-4 py-2 border-b border-gray-100 flex items-center">
                      <span className="text-[#21232A] text-left font-normal text-sm leading-5 flex-1" style={{ fontFamily: '"SF Pro Text"' }}>
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
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Scrollable Plans Area */}
          <div className="overflow-x-auto pl-48">
            <div className="flex min-w-max">
              {comparisonPlans.map((plan) => (
                <div key={plan.id} className="w-32 border-r border-gray-200 last:border-r-0">
                  {/* Plan Header */}
                  <div className="h-32 p-3 border-b border-gray-200">
                    <div className="flex flex-col items-center text-center space-y-1">
                      <div className="text-[#21232A] font-bold text-sm leading-[18px]" style={{ fontFamily: '"SF Pro Text"' }}>
                        {plan.name}
                      </div>
                      <div className="text-[#21232A] text-xs">
                        <span className="font-semibold" style={{ fontFamily: '"SF Pro Text"' }}>
                          {plan.price.amount}
                        </span>
                        {plan.price.period && (
                          <div className="font-normal text-xs" style={{ fontFamily: '"SF Pro Text"' }}>
                            / {plan.price.period}
                          </div>
                        )}
                      </div>
                      {plan.billingInfo && (
                        <div className="text-[#6F748C] text-xs" style={{ fontFamily: '"SF Pro Text"' }}>
                          {plan.billingInfo}
                        </div>
                      )}
                      <button 
                        onClick={plan.cta.variant === 'upgrade' ? handleUpgradeClick : undefined}
                        className={`text-xs px-2 py-1 rounded ${
                        plan.cta.variant === 'contact' 
                          ? 'border border-[#9327FF] text-[#9327FF]' 
                          : 'bg-[#9327FF] text-white'
                      } ${plan.id === 'free' ? 'invisible' : ''}`}>
                        {plan.cta.text}
                      </button>
                    </div>
                  </div>
                  
                  {/* Plan Features */}
                  {comparisonFeatureGroups.map((group) => (
                    <div key={group.id}>
                      {/* Group Title Spacer */}
                      <div className="h-12 bg-gray-50 border-b border-gray-200"></div>
                      
                      {/* Feature Support Status */}
                      {group.features.map((feature) => (
                        <div key={feature.id} className="h-10 px-2 py-2 border-b border-gray-100 flex items-center justify-center">
                          {typeof feature.support[plan.id] === 'string' ? (
                            <span className="text-[#21232A] font-normal text-xs text-center" style={{ fontFamily: '"SF Pro Text"' }}>
                              {feature.support[plan.id]}
                            </span>
                          ) : feature.support[plan.id] === true ? (
                            <SupportedIcon />
                          ) : (
                            <NotSupportedIcon />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <UpgradeDialog 
        isOpen={isUpgradeDialogOpen} 
        onClose={() => setIsUpgradeDialogOpen(false)} 
      />
    </div>
  );
}