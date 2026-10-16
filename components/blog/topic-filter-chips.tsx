'use client';

import * as Popover from '@radix-ui/react-popover';
import { BLOG_TOPICS } from '@/lib/blog-topics';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const topics = [
  { name: 'All', href: '/blog' },
  ...BLOG_TOPICS.map((topic) => ({ name: topic.name, href: `/blog/${topic.slug}` })),
];
const chipClassName =
  'inline-flex shrink-0 items-center whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium leading-5';
const inactiveClassName =
  'border-[#E6E6E6] bg-white text-[#140F28] transition-colors hover:border-[#B9A1EB] hover:text-[#854CFF]';
const focusClassName =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF] focus-visible:ring-offset-2';

const moreClassName = 'inline-flex h-9 w-14 shrink-0 items-center justify-center rounded-full border transition-colors';

function MoreIcon() {
  return (
    <span
      aria-hidden='true'
      className='block h-6 w-6 bg-current'
      style={{
        mask: 'url(/images/blog/icons/topic-more.svg) center / 24px 24px no-repeat',
        WebkitMask: 'url(/images/blog/icons/topic-more.svg) center / 24px 24px no-repeat',
      }}
    />
  );
}

export default function TopicFilterChips() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/blog' ? pathname === '/blog' || /^\/blog\/page\//.test(pathname) : pathname === href;
  const containerRef = useRef<HTMLElement>(null);
  const measurementRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const measurement = measurementRef.current;
    if (!container || !measurement) return;
    const mobileQuery = window.matchMedia('(max-width: 767px)');

    const measure = () => {
      if (mobileQuery.matches) {
        setVisibleCount(topics.length);
        setOpen(false);
        return;
      }
      const widths = Array.from(measurement.children, (item) => item.getBoundingClientRect().width);
      const moreWidth = widths.pop() ?? 0;
      const availableWidth = container.getBoundingClientRect().width;
      const gap = 8;
      const allWidth = widths.reduce((sum, width) => sum + width, 0) + gap * (widths.length - 1);
      let count = widths.length;

      if (allWidth > availableWidth) {
        let usedWidth = moreWidth;
        count = 0;
        for (const width of widths) {
          if (usedWidth + gap + width > availableWidth) break;
          usedWidth += gap + width;
          count += 1;
        }
      }
      setVisibleCount(count);
      if (count === topics.length) setOpen(false);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(measurement);
    mobileQuery.addEventListener('change', measure);
    measure();
    return () => {
      observer.disconnect();
      mobileQuery.removeEventListener('change', measure);
    };
  }, []);

  return (
    <nav
      aria-label='Browse articles by topic'
      className='relative min-w-0 flex-1 max-md:order-2 max-md:w-full max-md:flex-auto'
      ref={containerRef}
    >
      {/* Measure every chip independently of the visible subset, including font changes. */}
      <div aria-hidden='true' className='pointer-events-none invisible absolute inset-0 overflow-hidden'>
        <div className='flex w-max gap-2' ref={measurementRef}>
          {topics.map((topic) => (
            <span
              className={`${chipClassName} ${topic.href === '/blog' ? 'max-md:w-20 max-md:justify-center' : ''}`}
              key={topic.href}
            >
              {topic.name}
            </span>
          ))}
          <span className={moreClassName}>
            <MoreIcon />
          </span>
        </div>
      </div>
      <div className='flex min-w-0 items-center gap-2 max-md:flex-wrap'>
        {topics.slice(0, visibleCount).map((topic) => (
          <Link
            aria-current={isActive(topic.href) ? 'page' : undefined}
            className={`${chipClassName} ${focusClassName} ${
              topic.href === '/blog' ? 'max-md:w-20 max-md:justify-center' : ''
            } ${isActive(topic.href) ? 'border-[#854CFF] bg-[rgba(133,76,255,0.1)] text-[#854CFF]' : inactiveClassName}`}
            href={topic.href}
            key={topic.href}
          >
            {topic.name}
          </Link>
        ))}
        {visibleCount < topics.length ? (
          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
              <button
                aria-label='More article topics'
                className={`${moreClassName} ${focusClassName} ${
                  open ? 'border-[#854CFF] bg-[rgba(133,76,255,0.1)] text-[#854CFF]' : inactiveClassName
                }`}
                type='button'
              >
                <MoreIcon />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                aria-label='More article topics'
                align='end'
                className='z-50 max-h-[var(--radix-popover-content-available-height)] w-[320px] max-w-[calc(100vw-32px)] overflow-y-auto rounded-2xl bg-white p-3 shadow-[0_0_6px_rgba(0,0,0,0.12)]'
                collisionPadding={16}
                sideOffset={8}
              >
                {topics.slice(visibleCount).map((topic) => (
                  <Link
                    aria-current={isActive(topic.href) ? 'page' : undefined}
                    className={`flex items-center gap-4 rounded-lg px-4 py-3 text-base font-medium leading-6 text-[#140F28] hover:bg-[rgba(20,15,40,0.04)] ${
                      isActive(topic.href) ? 'bg-[rgba(20,15,40,0.04)]' : ''
                    } ${focusClassName}`}
                    href={topic.href}
                    key={topic.href}
                    onClick={() => setOpen(false)}
                  >
                    <span className='min-w-0 flex-1'>{topic.name}</span>
                    {isActive(topic.href) ? (
                      <img
                        alt=''
                        aria-hidden='true'
                        className='shrink-0'
                        src='/images/blog/icons/topic-check.svg'
                        width={24}
                        height={24}
                      />
                    ) : null}
                  </Link>
                ))}
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        ) : null}
      </div>
    </nav>
  );
}
