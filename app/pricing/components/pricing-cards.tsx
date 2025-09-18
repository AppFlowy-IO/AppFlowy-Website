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
      className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'clamp(16px, 1.67vw, 24px)' }}>
        {pricingPlans.map((plan) => {
          const pricing = getPlanPricing(plan, billingCycle);
          const isPro = plan.id === 'pro';
          
          return (
            <div
              key={plan.id}
              className={`relative overflow-hidden rounded-[15px] bg-white flex flex-col items-start gap-6 sm:gap-7 md:gap-7 lg:gap-7 xl:gap-[30px] ${
                isPro
                  ? 'border-2 border-[#8427E0]'
                  : 'border border-[rgba(213,215,222,0.60)]'
              }`}
              style={{
                // Responsive padding: 40px at 1440px, scaled down for smaller screens
                padding: 'clamp(24px, 4vw, 40px)'
              }}
            >
              {/* Most Popular Badge - Only for Pro */}
              {isPro && (
                <div className="absolute -right-[0.5px] top-0 bg-[#8427E0] text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2" 
                     style={{ 
                       borderRadius: '0 0 0 15px' // 只有左下圆角，其他都是直角
                     }}>
                  <span className="font-inter font-medium text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm whitespace-nowrap leading-tight">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card Content */}
              <div className="flex flex-col w-full items-start">
                {/* Plan Name */}
                <div className="mb-3 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-[18px] w-full">
                  <h3 className="font-inter font-medium text-[#101012] leading-[120%] tracking-[-0.24px] text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl text-left">
                    {plan.name}
                  </h3>
                </div>

                {/* Plan Subtitle */}
                <div className="mb-6 sm:mb-7 md:mb-7 lg:mb-7 xl:mb-[30px] w-full">
                  <p className="font-inter font-normal text-[#101012] leading-[150%] text-sm sm:text-base md:text-base lg:text-base xl:text-base text-left">
                    {plan.subtitle}
                  </p>
                </div>

                {/* Price Display */}
                <div className="mb-2 sm:mb-2 md:mb-2 lg:mb-2 xl:mb-[10px] w-full">
                  {isPro && billingCycle === 'yearly' && pricing.originalPrice ? (
                    <div className="flex items-center gap-5 text-left">
                      <div className="font-inter font-normal text-[#101012] leading-[110%] tracking-[-1.2px] text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-[40px] opacity-30 line-through">
                        {pricing.originalPrice}
                      </div>
                      <div className="font-inter font-semibold text-[#9327FF] leading-[110%] tracking-[-1.2px] text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-[40px]">
                        {pricing.price}
                      </div>
                    </div>
                  ) : (
                    <div className="font-inter font-semibold text-[#101012] leading-[110%] tracking-[-1.2px] text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-[40px] text-left">
                      {pricing.price}
                    </div>
                  )}
                </div>

                {/* Period and Billing Info */}
                <div className="mb-6 sm:mb-7 md:mb-7 lg:mb-7 xl:mb-[30px] w-full h-[34px] flex flex-col justify-start">
                  <div className="font-inter font-normal text-[#101012] leading-[140%] opacity-50 text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs text-left">
                    {pricing.period}
                  </div>
                  {pricing.billingInfo && (
                    <div className="font-inter font-normal text-[#101012] leading-[140%] opacity-50 text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs text-left">
                      {pricing.billingInfo}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <div className="mb-6 sm:mb-7 md:mb-7 lg:mb-7 xl:mb-[30px] w-full">
                  <a
                    href="/download"
                    className={`w-full h-[60px] flex items-center justify-center gap-2 rounded-[15px] font-inter font-medium leading-[100%] text-base transition-all duration-200 hover:scale-105 active:scale-95 ${
                      plan.cta.variant === 'primary'
                        ? 'bg-[#8427E0] text-white hover:bg-[#7320D0]'
                        : 'border border-[#8427E0] text-[#8427E0] hover:bg-[#8427E0] hover:text-white'
                    }`}
                    style={{ padding: '19px 40px 21px 40px' }}
                  >
                    {plan.cta.text}
                  </a>
                </div>

                {/* Features List */}
                <div className="w-full">
                  <div className="flex flex-col gap-2 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-[10px]">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex gap-2 w-full">
                        {/* Only show CheckIcon if it's not the first item of Pro plan */}
                        {!(index === 0 && plan.id === 'pro') && (
                          <div className="flex-shrink-0 mt-1.5">
                            <CheckIcon />
                          </div>
                        )}
                        <span className={`font-inter text-[#101012] leading-[150%] text-sm sm:text-base md:text-base lg:text-base xl:text-base text-left flex-1 ${
                          index === 0 && plan.id === 'pro' 
                            ? 'font-semibold' 
                            : 'font-normal'
                        }`}>
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