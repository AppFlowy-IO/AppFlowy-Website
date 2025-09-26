'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BillingCycle } from './billing-switch';
import { pricingPlans, getPlanPricing } from '../config/pricing-plans';
import { CheckIcon } from './check-icon';

interface PricingCardsProps {
  billingCycle: BillingCycle;
  show: boolean;
}

export function PricingCards({ billingCycle, show }: PricingCardsProps) {
  if (!show) {
    return null;
  }

  return (
    <motion.div
      className='mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className='mx-auto w-full max-w-[1100px]'>
        <div className='grid grid-cols-1 md:grid-cols-2' style={{ gap: 'clamp(16px, 1.67vw, 24px)' }}>
          {pricingPlans.map((plan) => {
            const pricing = getPlanPricing(plan, billingCycle);
            const isPro = plan.id === 'pro';

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col items-start gap-6 overflow-hidden rounded-[15px] bg-white sm:gap-7 md:gap-7 lg:gap-7 xl:gap-[30px] ${
                  isPro ? 'border-2 border-[#8427E0]' : 'border border-[rgba(213,215,222,0.60)]'
                }`}
                style={{
                  // Responsive padding: 40px at 1440px, scaled down for smaller screens
                  padding: 'clamp(24px, 4vw, 40px)',
                }}
              >
                {/* Most Popular Badge - Only for Pro */}
                {isPro && (
                  <div
                    className='absolute -right-[0.5px] top-0 bg-[#8427E0] px-3 py-1.5 text-white sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2'
                    style={{
                      borderRadius: '0 0 0 15px', // 只有左下圆角，其他都是直角
                    }}
                  >
                    <span className='whitespace-nowrap font-inter text-xs font-medium leading-tight sm:text-sm md:text-sm lg:text-sm xl:text-sm'>
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Card Content */}
                <div className='flex w-full flex-col items-start'>
                  {/* Plan Name */}
                  <div className='mb-3 w-full sm:mb-3 md:mb-4 lg:mb-4 xl:mb-[18px]'>
                    <h3 className='text-left font-inter text-lg font-medium leading-[120%] tracking-[-0.24px] text-[#101012] sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl'>
                      {plan.name}
                    </h3>
                  </div>

                  {/* Plan Subtitle */}
                  <div className='mb-6 w-full sm:mb-7 md:mb-7 lg:mb-7 xl:mb-[30px]'>
                    <p className='text-left font-inter text-sm font-normal leading-[150%] text-[#101012] sm:text-base md:text-base lg:text-base xl:text-base'>
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price Display */}
                  <div className='mb-2 w-full sm:mb-2 md:mb-2 lg:mb-2 xl:mb-[10px]'>
                    {isPro && billingCycle === 'yearly' && pricing.originalPrice ? (
                      <div className='flex items-center gap-5 text-left'>
                        <div className='font-inter text-2xl font-normal leading-[110%] tracking-[-1.2px] text-[#101012] line-through opacity-30 sm:text-3xl md:text-4xl lg:text-4xl xl:text-[40px]'>
                          {pricing.originalPrice}
                        </div>
                        <div className='font-inter text-2xl font-semibold leading-[110%] tracking-[-1.2px] text-[#9327FF] sm:text-3xl md:text-4xl lg:text-4xl xl:text-[40px]'>
                          {pricing.price}
                        </div>
                      </div>
                    ) : (
                      <div className='text-left font-inter text-2xl font-semibold leading-[110%] tracking-[-1.2px] text-[#101012] sm:text-3xl md:text-4xl lg:text-4xl xl:text-[40px]'>
                        {pricing.price}
                      </div>
                    )}
                  </div>

                  {/* Period and Billing Info */}
                  <div className='mb-6 flex h-[34px] w-full flex-col justify-start sm:mb-7 md:mb-7 lg:mb-7 xl:mb-[30px]'>
                    <div className='text-left font-inter text-xs font-normal leading-[140%] text-[#101012] opacity-50 sm:text-xs md:text-xs lg:text-xs xl:text-xs'>
                      {pricing.period}
                    </div>
                    {pricing.billingInfo && (
                      <div className='text-left font-inter text-xs font-normal leading-[140%] text-[#101012] opacity-50 sm:text-xs md:text-xs lg:text-xs xl:text-xs'>
                        {pricing.billingInfo}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className='mb-6 w-full sm:mb-7 md:mb-7 lg:mb-7 xl:mb-[30px]'>
                    <a
                      href='/download'
                      className={`flex h-[60px] w-full items-center justify-center gap-2 rounded-[15px] font-inter text-base font-medium leading-[100%] transition-all duration-200 hover:scale-105 active:scale-95 select-none touch-manipulation ${
                        plan.cta.variant === 'primary'
                          ? 'bg-[#8427E0] text-white hover:bg-[#7320D0]'
                          : 'border border-[#8427E0] text-[#8427E0] hover:bg-[#8427E0] hover:text-white'
                      }`}
                      style={{ padding: '19px 40px 21px 40px', WebkitTapHighlightColor: 'transparent' }}
                    >
                      {plan.cta.text}
                    </a>
                  </div>

                  {/* Features List */}
                  <div className='w-full'>
                    <div className='flex flex-col gap-2 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-[10px]'>
                      {plan.features.map((feature, index) => (
                        <div key={index} className='flex w-full gap-2'>
                          {/* Only show CheckIcon if it's not the first item of Pro plan */}
                          {!(index === 0 && plan.id === 'pro') && (
                            <div className='mt-1.5 flex-shrink-0'>
                              <CheckIcon />
                            </div>
                          )}
                          <span
                            className={`flex-1 text-left font-inter text-sm leading-[150%] text-[#101012] sm:text-base md:text-base lg:text-base xl:text-base ${
                              index === 0 && plan.id === 'pro' ? 'font-semibold' : 'font-normal'
                            }`}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}