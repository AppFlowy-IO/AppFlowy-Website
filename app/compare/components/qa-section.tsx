'use client';

import React from 'react';
import { FAQAccordion } from './faq-accordion';

const vsNotionFAQs = [
    {
        id: 'vs-notion-1',
        question: 'What is the biggest difference between Notion and AppFlowy?',
        answer:
            "It comes down to where your data lives and who owns the code. Notion is a cloud-first, proprietary service. Your data is stored on Notion’s servers. It requires an internet connection to work seamlessly, and you are tied to their ecosystem.\n\nAppFlowy is a self-hosted, open-core alternative. Your data lives directly on your computer or a server managed by you. It works 100% offline",
    },
    {
        id: 'vs-notion-2',
        question: 'Can I self-host AppFlowy? Can I self-host Notion?',
        answer:
            'AppFlowy can be fully self-hosted via AppFlowy Cloud, which you can run on your own server using Docker. This gives you complete control over your data, backups, and access. AppFlowy can be self-hosted in under 30 minutes. Notion cannot be self-hosted — it is a fully managed SaaS product with no on-premise option, even on Enterprise plans',
    },
    {
        id: 'vs-notion-3',
        question: 'Does AppFlowy have an offline mode like Notion?',
        answer:
            "AppFlowy is built to be 'local-first,' it doesn't need an internet connection to load your workspaces, databases, or pages. You can work completely offline, and it will sync to the cloud later if you choose to use their cloud sync feature. Notion, on the other hand, is primarily a cloud-based service. While it has some offline capabilities, it's not designed to work fully offline and can be unreliable without an internet connection.",
    },
    {
        id: 'vs-notion-4',
        question: 'Can I run AI locally in AppFlowy? Can I run AI locally in Notion?',
        answer: 'Yes, and this is a massive differentiator for privacy enthusiasts. AppFlowy AI allows you to connect to local, open-source large language models (like Mistral 7B or Llama 3) running directly on your own machine. This means you can use AI to summarize, brainstorm, or write without your data ever leaving your hardware. Notion does not support local AI models.',
    },
    {
        id: 'vs-notion-5',
        question: "How do AppFlowy's databases compare to Notion's?",
        answer: "Notion's databases are widely considered more mature — they support linked views, rollups, relations between databases, and a wide range of filter/sort options. AppFlowy supports grid, kanban, calendar, and gallery views and is actively developing its database layer. For most personal and small-team use cases, AppFlowy's databases are sufficient. For complex, cross-linked relational setups (e.g. a CRM or product roadmap with multiple linked tables), Notion is a good choice. AppFlowy is rapidly iterating on its database features and plans to support linked views and rollups in the near future.",
    },
];

export function QASection() {
    return (
        <section className="w-full bg-[#F5F5FA] py-16 sm:py-20 md:py-24 lg:py-28 xl:py-[156px]">
            <div className="w-full max-w-screen-xl mx-auto">
                <div className="w-full max-w-[1100px] mx-auto text-center">
                    {/* Title with padding */}
                    <div className="px-6 sm:px-8 lg:px-12 xl:px-8">
                        <h2 className="text-[#101012] leading-[105%] tracking-[-0.03em] font-medium font-inter text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px]">
                            Questions & <span className="text-[#8427E0]">Answers</span>
                        </h2>
                    </div>

                    {/* FAQ Accordion with padding */}
                    <div className="mt-10 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-[60px] text-left px-6 sm:px-8 lg:px-12 xl:px-8">
                        <FAQAccordion items={vsNotionFAQs} />
                    </div>
                </div>
            </div>
        </section>
    );
}