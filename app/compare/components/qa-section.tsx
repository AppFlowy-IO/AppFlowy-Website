'use client';

import React from 'react';
import { FAQAccordion } from './faq-accordion';
import { FAQAccordionProps } from '@/lib/faq';

export function QASection({ items }: FAQAccordionProps) {
    return (
        <section className="w-full bg-[linear-gradient(0deg,rgba(246,246,255,0.00)_0%,#F6F6FF_50%)] py-16 sm:py-20 md:py-24 lg:py-28 xl:py-[156px]">
            <div className="w-full max-w-screen-xl mx-auto">
                <div className="w-full max-w-[1100px] mx-auto text-center">
                    {/* Title with padding */}
                    <div className="px-6 sm:px-8 lg:px-12 xl:px-8">
                        <h2 className="text-style-h1 font-bold">
                            Questions & Answers
                        </h2>
                    </div>

                    {/* FAQ Accordion with padding */}
                    <div className="mt-10 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-[60px] text-left px-6 sm:px-8 lg:px-12 xl:px-8">
                        <FAQAccordion items={items} />
                    </div>
                </div>
            </div>
        </section >
    );
}